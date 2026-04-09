/**
 * DS0 StatusDot Web Component.
 * Framework-agnostic custom element wrapping the StatusDot primitive behavior.
 *
 * @example
 * ```html
 * <ds0-status-dot variant="online" pulse label="Online"></ds0-status-dot>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/status-dot | Documentation}
 */
class DS0StatusDot extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'size', 'pulse', 'label'];
    }

    private _variant: string = 'neutral';
    private _size: string = 'md';
    private _pulse: boolean = false;
    private _label: string = '';

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
            case 'size':
                this._size = newValue;
                break;
            case 'pulse':
                this._pulse = newValue !== null;
                break;
            case 'label':
                this._label = newValue;
                break;
        }
        this.render();
    }

    private getColorVar(): string {
        const colorMap: Record<string, string> = {
            online: 'var(--ds0-color-success, #10b981)',
            offline: 'var(--ds0-color-muted, #9ca3af)',
            busy: 'var(--ds0-color-destructive, #ef4444)',
            away: 'var(--ds0-color-warning, #f59e0b)',
            error: 'var(--ds0-color-destructive, #ef4444)',
            warning: 'var(--ds0-color-warning, #f59e0b)',
            neutral: 'var(--ds0-color-muted, #6b7280)',
        };
        return colorMap[this._variant] || colorMap.neutral;
    }

    private getSizePx(): string {
        const sizeMap: Record<string, string> = {
            sm: '8px',
            md: '12px',
            lg: '16px',
        };
        return sizeMap[this._size] || sizeMap.md;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const color = this.getColorVar();
        const sizePx = this.getSizePx();

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    position: relative;
                    align-items: center;
                    justify-content: center;
                }
                .dot {
                    width: ${sizePx};
                    height: ${sizePx};
                    border-radius: 50%;
                    background-color: ${color};
                }
                .pulse {
                    position: absolute;
                    inset: 0;
                    width: ${sizePx};
                    height: ${sizePx};
                    border-radius: 50%;
                    background-color: ${color};
                    opacity: 0.75;
                    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                @keyframes ping {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            </style>
            <span class="dot" aria-hidden="true"></span>
            ${this._pulse ? '<span class="pulse" aria-hidden="true"></span>' : ''}
        `;

        this.setAttribute('role', 'status');
        this.setAttribute('aria-label', this._label || this._variant);
    }
}

customElements.define('ds0-status-dot', DS0StatusDot);

export { DS0StatusDot };
