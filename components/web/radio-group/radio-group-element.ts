/**
 * DS0 RadioGroup Web Component.
 * Framework-agnostic custom element wrapping the RadioGroup behavior.
 *
 * @example
 * ```html
 * <ds0-radio-group label="Plan" value="free">
 *   <ds0-radio-item value="free" label="Free"></ds0-radio-item>
 *   <ds0-radio-item value="pro" label="Pro"></ds0-radio-item>
 * </ds0-radio-group>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/radio-group | Documentation}
 */
class DS0RadioGroup extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['value', 'orientation', 'disabled', 'label'];
    }

    private _value: string = '';
    private _orientation: string = 'vertical';
    private _disabled: boolean = false;
    private _label: string = '';

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
            case 'value':
                this._value = newValue;
                break;
            case 'orientation':
                this._orientation = newValue;
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                break;
            case 'label':
                this._label = newValue;
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
        if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
            event.preventDefault();
        }
    };

    private handleClick = (_event: MouseEvent): void => {
        if (this._disabled) return;
    };

    private render(): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: var(--ds0-spacing-2, 8px);
                }
                .label {
                    font-size: var(--ds0-font-size-sm, 0.875rem);
                    font-weight: 500;
                }
                .items {
                    display: flex;
                    flex-direction: ${this._orientation === 'horizontal' ? 'row' : 'column'};
                    gap: var(--ds0-spacing-2, 8px);
                }
            </style>
            <span class="label">${this._label}</span>
            <div class="items">
                <slot></slot>
            </div>
        `;

        this.setAttribute('role', 'radiogroup');
        this.setAttribute('aria-orientation', this._orientation);
        if (this._label) {
            this.setAttribute('aria-label', this._label);
        }
        if (this._disabled) {
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.removeAttribute('aria-disabled');
        }
    }
}

customElements.define('ds0-radio-group', DS0RadioGroup);

export { DS0RadioGroup };
