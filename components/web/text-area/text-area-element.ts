/**
 * DS0 TextArea Web Component.
 * Framework-agnostic custom element for multi-line text input.
 *
 * @example
 * ```html
 * <ds0-text-area label="Description" rows="4" placeholder="Enter description..."></ds0-text-area>
 * ```
 */
class DS0TextArea extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['label', 'placeholder', 'value', 'rows', 'disabled', 'required', 'readonly', 'invalid', 'helper-text', 'error-message', 'size', 'resize', 'maxlength', 'show-count'];
    }

    private _label = '';
    private _placeholder = '';
    private _value = '';
    private _rows = 3;
    private _disabled = false;
    private _required = false;
    private _readonly = false;
    private _invalid = false;
    private _helperText = '';
    private _errorMessage = '';
    private _size = 'md';
    private _resize = 'vertical';
    private _maxlength = 0;
    private _showCount = false;

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

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
        switch (name) {
            case 'label': this._label = newValue ?? ''; break;
            case 'placeholder': this._placeholder = newValue ?? ''; break;
            case 'value': this._value = newValue ?? ''; break;
            case 'rows': this._rows = Number.parseInt(newValue ?? '3', 10); break;
            case 'disabled': this._disabled = newValue !== null; break;
            case 'required': this._required = newValue !== null; break;
            case 'readonly': this._readonly = newValue !== null; break;
            case 'invalid': this._invalid = newValue !== null; break;
            case 'helper-text': this._helperText = newValue ?? ''; break;
            case 'error-message': this._errorMessage = newValue ?? ''; break;
            case 'size': this._size = newValue ?? 'md'; break;
            case 'resize': this._resize = newValue ?? 'vertical'; break;
            case 'maxlength': this._maxlength = Number.parseInt(newValue ?? '0', 10); break;
            case 'show-count': this._showCount = newValue !== null; break;
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
        const target = event.target as HTMLTextAreaElement;
        this._value = target.value;
        this.dispatchEvent(new CustomEvent('ds0-change', { detail: { value: this._value }, bubbles: true, composed: true }));
    };

    private getSizeStyles(): string {
        const sizes: Record<string, string> = {
            sm: 'padding: 0.5rem 0.75rem; font-size: 0.75rem;',
            md: 'padding: 0.5rem 0.75rem; font-size: 0.875rem;',
            lg: 'padding: 0.75rem 1rem; font-size: 1rem;',
        };
        return sizes[this._size] ?? sizes['md']!;
    }

    private getResizeStyle(): string {
        const resizeMap: Record<string, string> = {
            none: 'resize: none;',
            vertical: 'resize: vertical;',
            horizontal: 'resize: horizontal;',
            both: 'resize: both;',
        };
        return resizeMap[this._resize] ?? resizeMap['vertical']!;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const fieldId = `ds0-ta-${this._label.toLowerCase().replace(/\s+/g, '-')}`;
        const requiredHtml = this._required ? '<span class="required" aria-hidden="true"> *</span>' : '';
        const messageHtml = this._invalid && this._errorMessage
            ? `<p class="message error" id="${fieldId}-error" role="alert">${this._errorMessage}</p>`
            : this._helperText
                ? `<p class="message helper" id="${fieldId}-helper">${this._helperText}</p>`
                : '';
        const countHtml = this._showCount && this._maxlength
            ? `<span class="count" aria-live="polite">${this._value.length}/${this._maxlength}</span>`
            : '';

        this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .field { display: flex; flex-direction: column; gap: 0.375rem; }
        label { font-size: 0.875rem; font-weight: 500; font-family: inherit; }
        .required { color: var(--ds0-color-destructive, #dc2626); }
        textarea {
          display: flex; width: 100%; border-radius: var(--ds0-radius-md, 0.375rem);
          border: 1px solid var(--ds0-color-border, #e2e8f0);
          background-color: var(--ds0-color-background, #ffffff);
          color: var(--ds0-color-foreground, #0f172a);
          font-family: inherit;
          transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
          box-sizing: border-box;
          ${this.getSizeStyles()}
          ${this.getResizeStyle()}
        }
        textarea::placeholder { color: var(--ds0-color-muted-foreground, #94a3b8); }
        textarea:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--ds0-color-background, #fff), 0 0 0 4px var(--ds0-color-ring, #3b82f6);
        }
        textarea[aria-invalid="true"] { border-color: var(--ds0-color-destructive, #dc2626); }
        textarea[aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
        .footer { display: flex; justify-content: space-between; }
        .message { font-size: 0.875rem; margin: 0; font-family: inherit; }
        .helper { color: var(--ds0-color-muted-foreground, #94a3b8); }
        .error { color: var(--ds0-color-destructive, #dc2626); }
        .count { font-size: 0.875rem; color: var(--ds0-color-muted-foreground, #94a3b8); }
      </style>
      <div class="field" part="field">
        <label for="${fieldId}">${this._label}${requiredHtml}</label>
        <textarea id="${fieldId}" rows="${this._rows}" placeholder="${this._placeholder}"
          ${this._maxlength ? `maxlength="${this._maxlength}"` : ''}
          ${this._readonly ? 'readonly' : ''}
          ${this._invalid ? 'aria-invalid="true"' : ''}
          ${this._required ? 'aria-required="true"' : ''}
          ${this._disabled ? 'aria-disabled="true" tabindex="-1"' : ''}
          aria-describedby="${this._invalid ? `${fieldId}-error` : `${fieldId}-helper`}"
        >${this._value}</textarea>
        <div class="footer">${messageHtml}${countHtml}</div>
      </div>`;
    }
}

customElements.define('ds0-text-area', DS0TextArea);

export { DS0TextArea };
