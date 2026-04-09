class DS0Checkbox extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['label', 'checked', 'disabled', 'required', 'invalid', 'indeterminate', 'description', 'size'];
  }
  private _label = ''; private _checked = false; private _disabled = false; private _required = false;
  private _invalid = false; private _indeterminate = false; private _description = ''; private _size = 'md';

  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void { this.render(); this.addEventListeners(); }
  disconnectedCallback(): void { this.removeEventListeners(); }

  attributeChangedCallback(name: string, _old: string | null, val: string | null): void {
    switch (name) {
      case 'label': this._label = val ?? ''; break;
      case 'checked': this._checked = val !== null; break;
      case 'disabled': this._disabled = val !== null; break;
      case 'required': this._required = val !== null; break;
      case 'invalid': this._invalid = val !== null; break;
      case 'indeterminate': this._indeterminate = val !== null; break;
      case 'description': this._description = val ?? ''; break;
      case 'size': this._size = val ?? 'md'; break;
    }
    this.render();
  }

  private addEventListeners(): void { this.shadowRoot?.addEventListener('click', this.handleClick); this.shadowRoot?.addEventListener('keydown', this.handleKeyDown as EventListener); }
  private removeEventListeners(): void { this.shadowRoot?.removeEventListener('click', this.handleClick); this.shadowRoot?.removeEventListener('keydown', this.handleKeyDown as EventListener); }

  private handleClick = (): void => {
    if (this._disabled) return;
    this._checked = !this._checked;
    this._indeterminate = false;
    this.render();
    this.dispatchEvent(new CustomEvent('ds0-change', { detail: { checked: this._checked }, bubbles: true, composed: true }));
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === ' ') { event.preventDefault(); this.handleClick(); }
  };

  private getSizeStyles(): string {
    const sizes: Record<string, string> = { sm: 'width: 1rem; height: 1rem;', md: 'width: 1.25rem; height: 1.25rem;', lg: 'width: 1.5rem; height: 1.5rem;' };
    return sizes[this._size] ?? sizes['md']!;
  }

  private render(): void {
    if (!this.shadowRoot) return;
    const ariaChecked = this._indeterminate ? 'mixed' : String(this._checked);
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: flex-start; gap: 0.75rem; cursor: pointer; }
        .indicator { ${this.getSizeStyles()} border: 1px solid var(--ds0-color-border, #e2e8f0); border-radius: 0.25rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 150ms; }
        :host([checked]) .indicator, :host([indeterminate]) .indicator { background-color: var(--ds0-color-primary, #2563eb); border-color: var(--ds0-color-primary, #2563eb); color: white; }
        :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
        .label { font-size: 0.875rem; font-weight: 500; font-family: inherit; }
        .description { font-size: 0.875rem; color: var(--ds0-color-muted-foreground, #94a3b8); font-family: inherit; }
        svg { width: 75%; height: 75%; }
      </style>
      <div class="indicator" role="checkbox" aria-checked="${ariaChecked}" ${this._disabled ? 'aria-disabled="true"' : ''} tabindex="${this._disabled ? '-1' : '0'}">
        ${this._checked && !this._indeterminate ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        ${this._indeterminate ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>' : ''}
      </div>
      <div>
        <span class="label">${this._label}</span>
        ${this._description ? `<p class="description">${this._description}</p>` : ''}
      </div>`;
  }
}
customElements.define('ds0-checkbox', DS0Checkbox);
export { DS0Checkbox };
