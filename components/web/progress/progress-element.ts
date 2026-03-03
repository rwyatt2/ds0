/**
 * DS0 Progress Web Component.
 * Framework-agnostic custom element wrapping the Progress primitive behavior.
 *
 * @example
 * ```html
 * <ds0-progress value="42" max="100" label="Loading"></ds0-progress>
 * ```
 */
class DS0Progress extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['value', 'max', 'size', 'variant', 'indeterminate'];
    }

    private _value: number = 0;
    private _max: number = 100;
    private _size: string = 'md';
    private _variant: string = 'default';
    private _indeterminate: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        switch (name) {
            case 'value':
                this._value = Number(newValue) || 0;
                break;
            case 'max':
                this._max = Number(newValue) || 100;
                break;
            case 'size':
                this._size = newValue || 'md';
                break;
            case 'variant':
                this._variant = newValue || 'default';
                break;
            case 'indeterminate':
                this._indeterminate = newValue !== null;
                break;
        }
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;
        const percentage = this._indeterminate ? 0 : Math.min(Math.max((this._value / this._max) * 100, 0), 100);

        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; width: 100%; }
                .track {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    border-radius: 9999px;
                    background: var(--ds0-color-secondary, #e5e7eb);
                    height: ${this._size === 'sm' ? '4px' : this._size === 'lg' ? '16px' : '8px'};
                }
                .indicator {
                    height: 100%;
                    border-radius: 9999px;
                    background: var(--ds0-color-primary, #3b82f6);
                    transition: width 0.5s ease-in-out;
                    width: ${this._indeterminate ? '33%' : `${percentage}%`};
                }
            </style>
            <div class="track">
                <div class="indicator"></div>
            </div>
        `;

        this.setAttribute('role', 'progressbar');
        if (!this._indeterminate) {
            this.setAttribute('aria-valuenow', String(this._value));
        } else {
            this.removeAttribute('aria-valuenow');
        }
        this.setAttribute('aria-valuemin', '0');
        this.setAttribute('aria-valuemax', String(this._max));
        this.setAttribute('aria-valuetext', this._indeterminate ? 'Loading' : `${Math.round(percentage)} percent`);
    }
}

customElements.define('ds0-progress', DS0Progress);

export { DS0Progress };
