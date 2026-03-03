class DS0Alert extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'dismissible'];
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
            <div role="alert"><slot></slot></div>
        `;
    }
}

customElements.define('ds0-alert', DS0Alert);
export { DS0Alert };
