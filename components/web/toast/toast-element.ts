class DS0Toast extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
    }

    static get observedAttributes(): string[] {
        return ['variant'];
    }

    attributeChangedCallback(): void {
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px;
                    border-radius: 8px;
                    border: 1px solid var(--ds0-color-border, #e5e7eb);
                    background: var(--ds0-color-background, #fff);
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 384px;
                }
            </style>
            <slot></slot>
        `;
        this.setAttribute('role', 'status');
        this.setAttribute('aria-live', 'polite');
        this.setAttribute('aria-atomic', 'true');
    }
}

customElements.define('ds0-toast', DS0Toast);

export { DS0Toast };
