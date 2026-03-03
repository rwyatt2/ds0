class DS0Pagination extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['total-pages', 'current-page'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
    }

    attributeChangedCallback(): void {
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; }
                nav { display: flex; align-items: center; gap: 4px; }
            </style>
            <slot></slot>
        `;
        this.setAttribute('role', 'navigation');
        this.setAttribute('aria-label', 'Pagination');
    }
}

customElements.define('ds0-pagination', DS0Pagination);

export { DS0Pagination };
