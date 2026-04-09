/**
 * DS0 Rating Web Component.
 * Framework-agnostic custom element wrapping the Rating primitive behavior.
 *
 * @example
 * ```html
 * <ds0-rating value="3" max-value="5"></ds0-rating>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/rating | Documentation}
 */
class DS0Rating extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['value', 'max-value', 'size', 'disabled', 'readonly'];
    }

    private _value: number = 0;
    private _maxValue: number = 5;
    private _size: string = 'md';
    private _disabled: boolean = false;
    private _readonly: boolean = false;
    private _hoverValue: number = -1;

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
                this._value = parseFloat(newValue) || 0;
                break;
            case 'max-value':
                this._maxValue = parseInt(newValue) || 5;
                break;
            case 'size':
                this._size = newValue;
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                break;
            case 'readonly':
                this._readonly = newValue !== null;
                break;
        }
        this.render();
    }

    private addEventListeners(): void {
        this.addEventListener('keydown', this.handleKeyDown);
    }

    private removeEventListeners(): void {
        this.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (this._disabled || this._readonly) return;

        let newValue = this._value;
        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                event.preventDefault();
                newValue = Math.min(this._value + 1, this._maxValue);
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                event.preventDefault();
                newValue = Math.max(this._value - 1, 0);
                break;
            case 'Home':
                event.preventDefault();
                newValue = 1;
                break;
            case 'End':
                event.preventDefault();
                newValue = this._maxValue;
                break;
            default:
                return;
        }

        if (newValue !== this._value) {
            this._value = newValue;
            this.setAttribute('value', String(newValue));
            this.dispatchEvent(new CustomEvent('ds0-change', { detail: { value: newValue }, bubbles: true }));
            this.render();
        }
    };

    private getSizePx(): string {
        const sizeMap: Record<string, string> = { sm: '16px', md: '20px', lg: '24px' };
        return sizeMap[this._size] || sizeMap.md;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const sizePx = this.getSizePx();
        const isInteractive = !this._disabled && !this._readonly;

        let starsHtml = '';
        for (let i = 0; i < this._maxValue; i++) {
            const isFilled = this._value >= i + 1;
            starsHtml += `<span
                class="star ${isFilled ? 'filled' : 'empty'}"
                role="radio"
                aria-checked="${isFilled}"
                aria-label="${i + 1} star${i + 1 !== 1 ? 's' : ''}"
                data-index="${i}"
                style="cursor: ${isInteractive ? 'pointer' : 'default'}"
            >
                <svg width="${sizePx}" height="${sizePx}" viewBox="0 0 24 24" fill="${isFilled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
            </span>`;
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host { display: inline-flex; align-items: center; gap: 2px; }
                :host([disabled]) { opacity: 0.5; pointer-events: none; }
                .star { display: inline-flex; transition: color 0.15s; }
                .filled { color: var(--ds0-color-warning, #f59e0b); }
                .empty { color: var(--ds0-color-muted, #9ca3af); opacity: 0.3; }
            </style>
            ${starsHtml}
        `;

        this.setAttribute('role', 'radiogroup');
        this.setAttribute('aria-label', `Rating: ${this._value} out of ${this._maxValue} stars`);
        this.setAttribute('tabindex', this._disabled ? '-1' : '0');
        if (this._disabled) {
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.removeAttribute('aria-disabled');
        }

        if (isInteractive) {
            this.shadowRoot.querySelectorAll('.star').forEach((star) => {
                star.addEventListener('click', (e) => {
                    const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
                    this._value = index + 1;
                    this.setAttribute('value', String(this._value));
                    this.dispatchEvent(new CustomEvent('ds0-change', { detail: { value: this._value }, bubbles: true }));
                    this.render();
                });
            });
        }
    }
}

customElements.define('ds0-rating', DS0Rating);

export { DS0Rating };
