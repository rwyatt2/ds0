/**
 * DS0 TextField Web Component.
 * Framework-agnostic custom element for text input fields.
 *
 * @example
 * ```html
 * <ds0-text-field label="Email" type="email" placeholder="you@example.com"></ds0-text-field>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/text-field | Documentation}
 */
class DS0TextField extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['label', 'type', 'placeholder', 'value', 'disabled', 'required', 'readonly', 'invalid', 'helper-text', 'error-message', 'size'];
    }

    private _label = '';
    private _type = 'text';
    private _placeholder = '';
    private _value = '';
    private _disabled = false;
    private _required = false;
    private _readonly = false;
    private _invalid = false;
    private _helperText = '';
    private _errorMessage = '';
    private _size = 'md';

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
            case 'label':
                this._label = newValue ?? '';
                break;
            case 'type':
                this._type = newValue ?? 'text';
                break;
            case 'placeholder':
                this._placeholder = newValue ?? '';
                break;
            case 'value':
                this._value = newValue ?? '';
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                break;
            case 'required':
                this._required = newValue !== null;
                break;
            case 'readonly':
                this._readonly = newValue !== null;
                break;
            case 'invalid':
                this._invalid = newValue !== null;
                break;
            case 'helper-text':
                this._helperText = newValue ?? '';
                break;
            case 'error-message':
                this._errorMessage = newValue ?? '';
                break;
            case 'size':
                this._size = newValue ?? 'md';
                break;
        }
        this.render();
    }

    private addEventListeners(): void {
        this.shadowRoot?.addEventListener('input', this.handleInput);
    }

    private removeEventListeners(): void {
        this.shadowRoot?.removeEventListener('input', this.handleInput);
    }

    private handleInput = (event: Event): void => {
        const target = event.target as HTMLInputElement;
        this._value = target.value;
        this.dispatchEvent(
            new CustomEvent('ds0-change', {
                detail: { value: this._value },
                bubbles: true,
                composed: true,
            }),
        );
    };

    private getSizeStyles(): string {
        const sizes: Record<string, string> = {
            sm: 'height: 2rem; padding: 0 0.75rem; font-size: 0.75rem;',
            md: 'height: 2.5rem; padding: 0 0.75rem; font-size: 0.875rem;',
            lg: 'height: 3rem; padding: 0 1rem; font-size: 1rem;',
        };
        return sizes[this._size] ?? sizes['md']!;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const fieldId = `ds0-tf-${this._label.toLowerCase().replace(/\s+/g, '-')}`;
        const helperId = `${fieldId}-helper`;
        const errorId = `${fieldId}-error`;

        const requiredHtml = this._required ? '<span class="required" aria-hidden="true"> *</span>' : '';

        const messageHtml = this._invalid && this._errorMessage
            ? `<p class="message error" id="${errorId}" role="alert">${this._errorMessage}</p>`
            : this._helperText
                ? `<p class="message helper" id="${helperId}">${this._helperText}</p>`
                : '';

        const describedBy = this._invalid ? errorId : helperId;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        label {
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1;
          font-family: inherit;
        }

        .required {
          color: var(--ds0-color-destructive, #dc2626);
        }

        input {
          display: flex;
          width: 100%;
          border-radius: var(--ds0-radius-md, 0.375rem);
          border: 1px solid var(--ds0-color-border, #e2e8f0);
          background-color: var(--ds0-color-background, #ffffff);
          color: var(--ds0-color-foreground, #0f172a);
          font-family: inherit;
          transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
          ${this.getSizeStyles()}
          box-sizing: border-box;
        }

        input::placeholder {
          color: var(--ds0-color-muted-foreground, #94a3b8);
        }

        input:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--ds0-color-background, #fff), 0 0 0 4px var(--ds0-color-ring, #3b82f6);
        }

        input[aria-invalid="true"] {
          border-color: var(--ds0-color-destructive, #dc2626);
        }

        input[aria-invalid="true"]:focus-visible {
          box-shadow: 0 0 0 2px var(--ds0-color-background, #fff), 0 0 0 4px var(--ds0-color-destructive, #dc2626);
        }

        input[aria-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .message {
          font-size: 0.875rem;
          margin: 0;
          font-family: inherit;
        }

        .helper {
          color: var(--ds0-color-muted-foreground, #94a3b8);
        }

        .error {
          color: var(--ds0-color-destructive, #dc2626);
        }
      </style>
      <div class="field" part="field">
        <label for="${fieldId}">${this._label}${requiredHtml}</label>
        <input
          id="${fieldId}"
          type="${this._type}"
          placeholder="${this._placeholder}"
          value="${this._value}"
          ${this._readonly ? 'readonly' : ''}
          ${this._invalid ? 'aria-invalid="true"' : ''}
          ${this._required ? 'aria-required="true"' : ''}
          ${this._disabled ? 'aria-disabled="true" tabindex="-1"' : ''}
          aria-describedby="${describedBy}"
        />
        ${messageHtml}
      </div>
    `;
    }
}

customElements.define('ds0-text-field', DS0TextField);

export { DS0TextField };
