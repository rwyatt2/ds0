class DS0Form extends HTMLElement {
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
                ::slotted(*) { margin-bottom: 16px; }
            </style>
            <form novalidate>
                <slot></slot>
            </form>
        `;
    }
}

customElements.define('ds0-form', DS0Form);

export { DS0Form };
