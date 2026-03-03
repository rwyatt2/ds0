/**
 * DS0 Card Web Component.
 *
 * @example
 * ```html
 * <ds0-card variant="default">
 *   Card content
 * </ds0-card>
 * ```
 */
class DS0Card extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'padding'];
    }

    private _variant: string = 'default';
    private _padding: string = 'none';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        switch (name) {
            case 'variant':
                this._variant = newValue;
                break;
            case 'padding':
                this._padding = newValue;
                break;
        }
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; border-radius: 0.5rem; }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('ds0-card', DS0Card);

export { DS0Card };
