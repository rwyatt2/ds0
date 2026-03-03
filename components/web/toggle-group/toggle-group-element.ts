class DS0ToggleGroup extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['type', 'orientation', 'variant', 'size', 'disabled'];
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
            <style>:host { display: inline-flex; }</style>
            <div role="group"><slot></slot></div>
        `;
    }
}

customElements.define('ds0-toggle-group', DS0ToggleGroup);
export { DS0ToggleGroup };
