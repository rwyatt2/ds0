class DS0Switch extends HTMLElement {
  static get observedAttributes(): string[] { return ['label', 'checked', 'disabled', 'size']; }
  private _label = ''; private _checked = false; private _disabled = false; private _size = 'md';

  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void { this.render(); this.addEventListeners(); }
  disconnectedCallback(): void { this.removeEventListeners(); }

  attributeChangedCallback(name: string, _old: string | null, val: string | null): void {
    switch (name) {
      case 'label': this._label = val ?? ''; break;
      case 'checked': this._checked = val !== null; break;
      case 'disabled': this._disabled = val !== null; break;
      case 'size': this._size = val ?? 'md'; break;
    }
    this.render();
  }

  private addEventListeners(): void { this.shadowRoot?.addEventListener('click', this.handleClick); this.shadowRoot?.addEventListener('keydown', this.handleKeyDown as EventListener); }
  private removeEventListeners(): void { this.shadowRoot?.removeEventListener('click', this.handleClick); this.shadowRoot?.removeEventListener('keydown', this.handleKeyDown as EventListener); }
  private handleClick = (): void => { if (this._disabled) return; this._checked = !this._checked; this.render(); this.dispatchEvent(new CustomEvent('ds0-change', { detail: { checked: this._checked }, bubbles: true, composed: true })); };
  private handleKeyDown = (event: KeyboardEvent): void => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); this.handleClick(); } };

  private getSizeStyles(): { track: string; thumb: string; translate: string } {
    const sizes: Record<string, { track: string; thumb: string; translate: string }> = {
      sm: { track: 'width: 2.25rem; height: 1.25rem;', thumb: 'width: 1rem; height: 1rem;', translate: 'translateX(1rem)' },
      md: { track: 'width: 2.75rem; height: 1.5rem;', thumb: 'width: 1.25rem; height: 1.25rem;', translate: 'translateX(1.25rem)' },
      lg: { track: 'width: 3.25rem; height: 1.75rem;', thumb: 'width: 1.5rem; height: 1.5rem;', translate: 'translateX(1.5rem)' },
    };
    return sizes[this._size] ?? sizes['md']!;
  }

  private render(): void {
    if (!this.shadowRoot) return;
    const s = this.getSizeStyles();
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .track { ${s.track} border-radius: 9999px; position: relative; cursor: pointer; transition: background-color 150ms; background: ${this._checked ? 'var(--ds0-color-primary, #2563eb)' : 'var(--ds0-color-input, #e2e8f0)'}; }
        .track:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--ds0-color-background, #fff), 0 0 0 4px var(--ds0-color-ring, #3b82f6); }
        .thumb { ${s.thumb} border-radius: 9999px; background: var(--ds0-color-background, #fff); box-shadow: 0 1px 3px rgba(0,0,0,0.2); position: absolute; top: 50%; transform: translateY(-50%) ${this._checked ? s.translate : 'translateX(0)'}; transition: transform 150ms; }
        :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
        .label { font-size: 0.875rem; font-weight: 500; font-family: inherit; }
      </style>
      <span class="label">${this._label}</span>
      <div class="track" role="switch" aria-checked="${this._checked}" ${this._disabled ? 'aria-disabled="true" tabindex="-1"' : 'tabindex="0"'} part="track">
        <span class="thumb"></span>
      </div>`;
  }
}
customElements.define('ds0-switch', DS0Switch);
export { DS0Switch };
