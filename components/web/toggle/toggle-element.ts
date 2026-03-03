/**
 * DS0 Toggle Web Component.
 * Framework-agnostic custom element wrapping the Toggle behavior.
 *
 * @example
 * ```html
 * <ds0-toggle aria-label="Toggle bold">
 *   <strong>B</strong>
 * </ds0-toggle>
 * ```
 */
class DS0Toggle extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'size', 'disabled', 'pressed'];
    }

    private _variant: string = 'default';
    private _size: string = 'md';
    private _disabled: boolean = false;
    private _pressed: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
        this.addEventListeners();
    }

    disconnectedCallback(): void {
        this.removeEventListeners();
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        switch (name) {
            case 'variant':
                this._variant = newValue || 'default';
                break;
            case 'size':
                this._size = newValue || 'md';
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                break;
            case 'pressed':
                this._pressed = newValue !== null && newValue !== 'false';
                break;
        }
        this.render();
    }

    private addEventListeners(): void {
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('click', this.handleClick);
    }

    private removeEventListeners(): void {
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('click', this.handleClick);
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (this._disabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._pressed = !this._pressed;
            this.render();
            this.dispatchEvent(new CustomEvent('ds0-pressed-change', { detail: { pressed: this._pressed } }));
        }
    };

    private handleClick = (): void => {
        if (this._disabled) return;
        this._pressed = !this._pressed;
        this.render();
        this.dispatchEvent(new CustomEvent('ds0-pressed-change', { detail: { pressed: this._pressed } }));
    };

    private render(): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--ds0-radius-md, 6px);
                    font-size: var(--ds0-font-size-sm, 14px);
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.2s, color 0.2s;
                }
                :host([disabled]) {
                    opacity: 0.5;
                    pointer-events: none;
                }
            </style>
            <slot></slot>
        `;

        this.setAttribute('role', 'button');
        this.setAttribute('aria-pressed', String(this._pressed));
        this.setAttribute('data-state', this._pressed ? 'on' : 'off');
        this.setAttribute('tabindex', this._disabled ? '-1' : '0');
        if (this._disabled) {
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.removeAttribute('aria-disabled');
        }
    }
}

customElements.define('ds0-toggle', DS0Toggle);

export { DS0Toggle };
