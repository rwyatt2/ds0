/**
 * DS0 Tooltip Web Component.
 * Framework-agnostic custom element for tooltip behavior.
 *
 * @example
 * ```html
 * <ds0-tooltip content="More info">
 *   <button>Hover me</button>
 * </ds0-tooltip>
 * ```
 */
class DS0Tooltip extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['content', 'placement', 'delay'];
    }

    private _content: string = '';
    private _placement: string = 'top';
    private _delay: number = 300;
    private _tooltipEl: HTMLDivElement | null = null;
    private _showTimeout: ReturnType<typeof setTimeout> | null = null;

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
        this.hideTooltip();
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        switch (name) {
            case 'content':
                this._content = newValue || '';
                break;
            case 'placement':
                this._placement = newValue || 'top';
                break;
            case 'delay':
                this._delay = parseInt(newValue, 10) || 300;
                break;
        }
    }

    private addEventListeners(): void {
        this.addEventListener('mouseenter', this.handleMouseEnter);
        this.addEventListener('mouseleave', this.handleMouseLeave);
        this.addEventListener('focusin', this.handleFocusIn);
        this.addEventListener('focusout', this.handleFocusOut);
        this.addEventListener('keydown', this.handleKeyDown);
    }

    private removeEventListeners(): void {
        this.removeEventListener('mouseenter', this.handleMouseEnter);
        this.removeEventListener('mouseleave', this.handleMouseLeave);
        this.removeEventListener('focusin', this.handleFocusIn);
        this.removeEventListener('focusout', this.handleFocusOut);
        this.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleMouseEnter = (): void => {
        this._showTimeout = setTimeout(() => this.showTooltip(), this._delay);
    };

    private handleMouseLeave = (): void => {
        if (this._showTimeout) clearTimeout(this._showTimeout);
        this.hideTooltip();
    };

    private handleFocusIn = (): void => {
        this.showTooltip();
    };

    private handleFocusOut = (): void => {
        this.hideTooltip();
    };

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            this.hideTooltip();
        }
    };

    private showTooltip(): void {
        if (this._tooltipEl || !this._content) return;

        this._tooltipEl = document.createElement('div');
        this._tooltipEl.setAttribute('role', 'tooltip');
        this._tooltipEl.textContent = this._content;
        this._tooltipEl.style.cssText = `
            position: fixed;
            z-index: 9999;
            padding: 6px 12px;
            border-radius: var(--ds0-radius-sm, 4px);
            background: var(--ds0-color-foreground, #1a1a1a);
            color: var(--ds0-color-background, #fff);
            font-size: var(--ds0-font-size-xs, 12px);
            pointer-events: none;
            white-space: nowrap;
        `;

        document.body.appendChild(this._tooltipEl);

        const rect = this.getBoundingClientRect();
        const tipRect = this._tooltipEl.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (this._placement) {
            case 'top':
                top = rect.top - tipRect.height - 8;
                left = rect.left + (rect.width - tipRect.width) / 2;
                break;
            case 'bottom':
                top = rect.bottom + 8;
                left = rect.left + (rect.width - tipRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - tipRect.height) / 2;
                left = rect.left - tipRect.width - 8;
                break;
            case 'right':
                top = rect.top + (rect.height - tipRect.height) / 2;
                left = rect.right + 8;
                break;
        }

        this._tooltipEl.style.top = `${top}px`;
        this._tooltipEl.style.left = `${left}px`;

        const id = `ds0-tooltip-${Date.now()}`;
        this._tooltipEl.id = id;
        this.setAttribute('aria-describedby', id);
    }

    private hideTooltip(): void {
        if (this._tooltipEl) {
            this._tooltipEl.remove();
            this._tooltipEl = null;
            this.removeAttribute('aria-describedby');
        }
    }

    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('ds0-tooltip', DS0Tooltip);

export { DS0Tooltip };
