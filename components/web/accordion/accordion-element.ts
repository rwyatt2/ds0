class DS0Accordion extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['type', 'collapsible', 'disabled'];
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
            <style>:host { display: block; }</style>
            <slot></slot>
        `;
    }
}

customElements.define('ds0-accordion', DS0Accordion);
export { DS0Accordion };
