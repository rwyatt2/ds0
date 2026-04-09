/**
 * DS0 Banner Web Component.
 * Framework-agnostic custom element wrapping the Banner primitive behavior.
 *
 * @example
 * ```html
 * <ds0-banner variant="info" dismissible>
 *   New version available!
 * </ds0-banner>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/banner | Documentation}
 */
class DS0Banner extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'size', 'dismissible'];
    }

    private _variant: string = 'info';
    private _size: string = 'md';
    private _dismissible: boolean = false;
    private _dismissed: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
        this.addEventListener('keydown', this.handleKeyDown);
    }

    disconnectedCallback(): void {
        this.removeEventListener('keydown', this.handleKeyDown);
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        switch (name) {
            case 'variant':
                this._variant = newValue;
                break;
            case 'size':
                this._size = newValue;
                break;
            case 'dismissible':
                this._dismissible = newValue !== null;
                break;
        }
        this.render();
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape' && this._dismissible) {
            this.dismiss();
        }
    };

    private dismiss(): void {
        this._dismissed = true;
        this.dispatchEvent(new CustomEvent('ds0-dismiss', { bubbles: true }));
        this.render();
    }

    private getVariantStyles(): string {
        const styles: Record<string, string> = {
            info: 'background-color: var(--ds0-color-info, #2563eb); color: white;',
            warning: 'background-color: var(--ds0-color-warning, #f59e0b); color: white;',
            error: 'background-color: var(--ds0-color-destructive, #ef4444); color: white;',
            success: 'background-color: var(--ds0-color-success, #059669); color: white;',
            promotional: 'background: linear-gradient(to right, #7c3aed, #4f46e5); color: white;',
        };
        return styles[this._variant] || styles.info;
    }

    private getSizeStyles(): string {
        const styles: Record<string, string> = {
            sm: 'padding: 8px 16px; font-size: 12px;',
            md: 'padding: 12px 16px; font-size: 14px;',
            lg: 'padding: 16px 16px; font-size: 16px;',
        };
        return styles[this._size] || styles.md;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        if (this._dismissed) {
            this.shadowRoot.innerHTML = '';
            this.style.display = 'none';
            return;
        }

        const isUrgent = this._variant === 'error' || this._variant === 'warning';

        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; width: 100%; }
                .banner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    ${this.getVariantStyles()}
                    ${this.getSizeStyles()}
                    position: relative;
                    font-family: inherit;
                }
                .dismiss {
                    position: absolute;
                    right: 12px;
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    opacity: 0.7;
                    padding: 4px;
                    border-radius: 2px;
                }
                .dismiss:hover { opacity: 1; }
                .dismiss:focus { outline: 2px solid rgba(255,255,255,0.5); }
            </style>
            <div class="banner">
                <slot></slot>
                ${this._dismissible ? '<button class="dismiss" aria-label="Dismiss banner">✕</button>' : ''}
            </div>
        `;

        this.setAttribute('role', isUrgent ? 'alert' : 'banner');

        if (this._dismissible) {
            this.shadowRoot.querySelector('.dismiss')?.addEventListener('click', () => this.dismiss());
        }
    }
}

customElements.define('ds0-banner', DS0Banner);

export { DS0Banner };
