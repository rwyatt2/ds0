class DS0Table extends HTMLElement {
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
                :host { display: block; overflow-x: auto; }
                ::slotted(table) { width: 100%; }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('ds0-table', DS0Table);
export { DS0Table };
