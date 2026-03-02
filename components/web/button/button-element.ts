/**
 * DS0 Button Web Component.
 * Framework-agnostic custom element wrapping the Button primitive behavior.
 *
 * @example
 * ```html
 * <ds0-button variant="primary" size="md">
 *   Click me
 * </ds0-button>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/button | Documentation}
 */
class DS0Button extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'size', 'disabled', 'loading'];
    }

    private _variant = 'primary';
    private _size = 'md';
    private _disabled = false;
    private _loading = false;

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
                this._variant = newValue ?? 'primary';
                break;
            case 'size':
                this._size = newValue ?? 'md';
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                break;
            case 'loading':
                this._loading = newValue !== null;
                break;
        }
        this.render();
    }

    private get isInteractionDisabled(): boolean {
        return this._disabled || this._loading;
    }

    private addEventListeners(): void {
        this.addEventListener('keydown', this.handleKeyDown);
        this.addEventListener('keyup', this.handleKeyUp);
        this.addEventListener('click', this.handleClick);
    }

    private removeEventListeners(): void {
        this.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('keyup', this.handleKeyUp);
        this.removeEventListener('click', this.handleClick);
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (this.isInteractionDisabled) {
            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
            }
            return;
        }

        // Prevent Space from scrolling
        if (event.key === ' ') {
            event.preventDefault();
        }
    };

    private handleKeyUp = (event: KeyboardEvent): void => {
        if (this.isInteractionDisabled) return;

        if (event.key === ' ') {
            this.click();
            this.dispatchEvent(
                new CustomEvent('ds0-click', { bubbles: true, composed: true }),
            );
        }
    };

    private handleClick = (event: MouseEvent): void => {
        if (this.isInteractionDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        this.dispatchEvent(
            new CustomEvent('ds0-click', { bubbles: true, composed: true }),
        );
    };

    private getVariantStyles(): string {
        const variants: Record<string, string> = {
            primary: `
        background-color: var(--ds0-color-primary, #2563eb);
        color: var(--ds0-color-primary-foreground, #ffffff);
      `,
            secondary: `
        background-color: var(--ds0-color-secondary, #f1f5f9);
        color: var(--ds0-color-secondary-foreground, #0f172a);
      `,
            destructive: `
        background-color: var(--ds0-color-destructive, #dc2626);
        color: var(--ds0-color-destructive-foreground, #ffffff);
      `,
            ghost: `
        background-color: transparent;
        color: inherit;
      `,
            outline: `
        background-color: var(--ds0-color-background, #ffffff);
        color: inherit;
        border: 1px solid var(--ds0-color-border, #e2e8f0);
      `,
        };

        return variants[this._variant] ?? variants['primary']!;
    }

    private getSizeStyles(): string {
        const sizes: Record<string, string> = {
            sm: `
        height: 2rem;
        padding: 0 0.75rem;
        font-size: 0.75rem;
        gap: 0.375rem;
      `,
            md: `
        height: 2.5rem;
        padding: 0 1rem;
        font-size: 0.875rem;
        gap: 0.5rem;
      `,
            lg: `
        height: 3rem;
        padding: 0 1.5rem;
        font-size: 1rem;
        gap: 0.5rem;
      `,
        };

        return sizes[this._size] ?? sizes['md']!;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const spinnerHtml = this._loading
            ? `<svg class="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>`
            : '';

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--ds0-radius-md, 0.375rem);
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          border: none;
          transition: background-color 150ms ease-in-out, opacity 150ms ease-in-out;
          ${this.getVariantStyles()}
          ${this.getSizeStyles()}
        }

        .button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px var(--ds0-color-background, #fff), 0 0 0 4px var(--ds0-color-ring, #3b82f6);
        }

        .button:hover:not([aria-disabled="true"]) {
          opacity: 0.9;
        }

        .button[aria-disabled="true"] {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .button[aria-busy="true"]:not([aria-disabled="true"]) {
          opacity: 0.8;
          cursor: wait;
        }

        .spinner {
          width: 1rem;
          height: 1rem;
          animation: spin 1s linear infinite;
        }

        .spinner-track {
          opacity: 0.25;
        }

        .spinner-head {
          opacity: 0.75;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      </style>
      <button class="button" part="button">
        ${spinnerHtml}
        <slot></slot>
      </button>
    `;

        const button = this.shadowRoot.querySelector('.button');
        if (!button) return;

        // Set ARIA attributes
        button.setAttribute(
            'tabindex',
            this._disabled ? '-1' : '0',
        );

        if (this.isInteractionDisabled) {
            button.setAttribute('aria-disabled', 'true');
        } else {
            button.removeAttribute('aria-disabled');
        }

        if (this._loading) {
            button.setAttribute('aria-busy', 'true');
        } else {
            button.removeAttribute('aria-busy');
        }
    }
}

customElements.define('ds0-button', DS0Button);

export { DS0Button };
