class DS0Link extends HTMLElement {
    static get observedAttributes(): string[] { return ['href', 'variant', 'size', 'external', 'disabled']; }
    private _href = ''; private _variant = 'default'; private _size = 'md'; private _external = false; private _disabled = false;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _old: string | null, val: string | null): void {
        switch (name) { case 'href': this._href = val ?? ''; break; case 'variant': this._variant = val ?? 'default'; break; case 'size': this._size = val ?? 'md'; break; case 'external': this._external = val !== null; break; case 'disabled': this._disabled = val !== null; break; }
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        const sizeMap: Record<string, string> = { sm: 'font-size: 0.875rem;', md: 'font-size: 1rem;', lg: 'font-size: 1.125rem;' };
        this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline; }
        a { color: var(--ds0-color-primary, #2563eb); text-decoration: none; text-underline-offset: 4px; transition: color 150ms; ${sizeMap[this._size] ?? sizeMap['md']!} font-family: inherit; }
        a:hover { text-decoration: underline; }
        :host([disabled]) a { opacity: 0.5; pointer-events: none; }
      </style>
      <a href="${this._disabled ? '' : this._href}" ${this._external ? 'target="_blank" rel="noopener noreferrer"' : ''} ${this._disabled ? 'aria-disabled="true" tabindex="-1"' : ''}><slot></slot></a>`;
    }
}
customElements.define('ds0-link', DS0Link);
export { DS0Link };
