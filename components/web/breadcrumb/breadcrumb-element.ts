class DS0Breadcrumb extends HTMLElement {
    static get observedAttributes(): string[] {
        return [];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; }
                ::slotted(ol) { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; list-style: none; padding: 0; margin: 0; font-size: 14px; }
            </style>
            <slot></slot>
        `;
        this.setAttribute('role', 'navigation');
        this.setAttribute('aria-label', this.getAttribute('aria-label') || 'Breadcrumb');
    }
}

customElements.define('ds0-breadcrumb', DS0Breadcrumb);

export { DS0Breadcrumb };
