/**
 * DS0 Input Web Component.
 * Framework-agnostic custom element wrapping the Input primitive behavior.
 *
 * @example
 * ```html
 * <ds0-input variant="default" size="md" placeholder="Enter text..."></ds0-input>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/input | Documentation}
 */
class DS0Input extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'size', 'disabled', 'readonly', 'invalid', 'placeholder', 'type', 'value'];
    }

    private _variant = 'default';
    private _size = 'md';
    private _disabled = false;
    private _readonly = false;
    private _invalid = false;
    private _placeholder = '';
    private _type = 'text';
    private _value = '';

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

    attributeChangedCallback(
        name: string,
        _oldValue: string | null,
        newValue: string | null,
    ): void {
        switch (name) {
            case 'variant':
                this._variant = newValue ?? 'default';
                break;
            case 'size':
                this._size = newValue ?? 'md';
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                break;
            case 'readonly':
                this._readonly = newValue !== null;
                break;
            case 'invalid':
                this._invalid = newValue !== null;
                break;
            case 'placeholder':
                this._placeholder = newValue ?? '';
                break;
            case 'type':
                this._type = newValue ?? 'text';
                break;
            case 'value':
                this._value = newValue ?? '';
                break;
        }
        this.render();
    }

    private addEventListeners(): void {
        this.addEventListener('input', this.handleInput);
    }

    private removeEventListeners(): void {
        this.removeEventListener('input', this.handleInput);
    }

    private handleInput = (event: Event): void => {
        if (this._disabled || this._readonly) {
            event.preventDefault();
            return;
        }
        const input = this.shadowRoot?.querySelector('input');
        if (input) {
            this._value = input.value;
            this.dispatchEvent(
                new CustomEvent('ds0-change', {
                    bubbles: true,
                    composed: true,
                    detail: { value: this._value },
                }),
            );
        }
    };

    private getVariantStyles(): string {
        const variants: Record<string, string> = {
            default: `border: 1px solid var(--ds0-color-input, #e2e8f0);`,
            ghost: `border: 1px solid transparent; background-color: transparent;`,
        };
        return variants[this._variant] ?? variants['default']!;
    }

    private getSizeStyles(): string {
        const sizes: Record<string, string> = {
            sm: `height: 2rem; padding: 0 0.75rem; font-size: 0.75rem;`,
            md: `height: 2.5rem; padding: 0 1rem; font-size: 0.875rem;`,
            lg: `height: 3rem; padding: 0 1.5rem; font-size: 1rem;`,
        };
        return sizes[this._size] ?? sizes['md']!;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          width: 100%;
        }

        .input {
          display: flex;
          width: 100%;
          border-radius: var(--ds0-radius-md, 0.375rem);
          background-color: var(--ds0-color-background, #ffffff);
          color: var(--ds0-color-foreground, #0f172a);
          font-family: inherit;
          transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
          outline: none;
          ${this.getVariantStyles()}
          ${this.getSizeStyles()}
        }

        .input::placeholder {
          color: var(--ds0-color-muted-foreground, #94a3b8);
        }

        .input:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--ds0-color-background, #fff), 0 0 0 4px var(--ds0-color-ring, #3b82f6);
        }

        .input[aria-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .input[aria-invalid="true"] {
          border-color: var(--ds0-color-destructive, #dc2626);
        }

        .input[aria-invalid="true"]:focus-visible {
          box-shadow: 0 0 0 2px var(--ds0-color-background, #fff), 0 0 0 4px var(--ds0-color-destructive, #dc2626);
        }
      </style>
      <input
        class="input"
        part="input"
        type="${this._type}"
        placeholder="${this._placeholder}"
        value="${this._value}"
      />
    `;

        const input = this.shadowRoot.querySelector('input');
        if (!input) return;

        input.tabIndex = this._disabled ? -1 : 0;

        if (this._disabled) {
            input.setAttribute('aria-disabled', 'true');
        } else {
            input.removeAttribute('aria-disabled');
        }

        if (this._readonly) {
            input.setAttribute('aria-readonly', 'true');
            input.readOnly = true;
        } else {
            input.removeAttribute('aria-readonly');
            input.readOnly = false;
        }

        if (this._invalid) {
            input.setAttribute('aria-invalid', 'true');
        } else {
            input.removeAttribute('aria-invalid');
        }
    }
}

customElements.define('ds0-input', DS0Input);

export { DS0Input };
