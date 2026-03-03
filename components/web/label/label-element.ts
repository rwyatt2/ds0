class DS0Label extends HTMLElement {
    static get observedAttributes(): string[] { return ['for', 'required', 'disabled', 'size']; }
    private _for = ''; private _required = false; private _disabled = false; private _size = 'md';
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _: string | null, newValue: string | null): void {
        switch (name) {
            case 'for': this._for = newValue ?? ''; break;
            case 'required': this._required = newValue !== null; break;
            case 'disabled': this._disabled = newValue !== null; break;
            case 'size': this._size = newValue ?? 'md'; break;
        }
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        const fontSize = this._size === 'sm' ? '0.75rem' : '0.875rem';
        this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        label { font-size: ${fontSize}; font-weight: 500; line-height: 1; font-family: inherit; color: inherit;
          ${this._disabled ? 'cursor: not-allowed; opacity: 0.7;' : 'cursor: pointer;'} }
        .required { color: var(--ds0-color-destructive, #dc2626); margin-left: 0.125rem; }
      </style>
      <label for="${this._for}" part="label">
        <slot></slot>${this._required ? '<span class="required" aria-hidden="true"> *</span>' : ''}
      </label>`;
    }
}
customElements.define('ds0-label', DS0Label);
export { DS0Label };
