class DS0Dialog extends HTMLElement {
    static get observedAttributes(): string[] { return ['open']; }
    private _open = false;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _old: string, val: string): void {
        if (name === 'open') this._open = val !== null;
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = this._open ? `
            <style>
                :host { display: contents; }
                .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 50; }
                .content { position: fixed; left: 50%; top: 50%; transform: translate(-50%,-50%); z-index: 50; background: var(--ds0-color-background, white); border-radius: 8px; padding: 24px; max-width: 32rem; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,.25); }
            </style>
            <div class="overlay" part="overlay"></div>
            <div class="content" role="dialog" aria-modal="true" part="content"><slot></slot></div>
        ` : '';
    }
}
customElements.define('ds0-dialog', DS0Dialog);
export { DS0Dialog };
