/**
 * DS0 Popover Web Component.
 * Framework-agnostic custom element for popover behavior.
 *
 * @example
 * ```html
 * <ds0-popover>
 *   <button slot="trigger">Open Menu</button>
 *   <div slot="content">
 *     <p>Popover content here</p>
 *   </div>
 * </ds0-popover>
 * ```
 */
class DS0Popover extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['placement', 'open'];
    }

    private _placement: string = 'bottom';
    private _open: boolean = false;
    private _contentEl: HTMLDivElement | null = null;

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
        this.close();
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        switch (name) {
            case 'placement':
                this._placement = newValue || 'bottom';
                break;
            case 'open':
                if (newValue !== null && newValue !== 'false') {
                    this.openPopover();
                } else {
                    this.close();
                }
                break;
        }
    }

    private addEventListeners(): void {
        const trigger = this.querySelector('[slot="trigger"]');
        if (trigger) {
            trigger.addEventListener('click', this.handleTriggerClick);
        }
        document.addEventListener('keydown', this.handleDocKeyDown);
        document.addEventListener('click', this.handleDocClick);
    }

    private removeEventListeners(): void {
        const trigger = this.querySelector('[slot="trigger"]');
        if (trigger) {
            trigger.removeEventListener('click', this.handleTriggerClick);
        }
        document.removeEventListener('keydown', this.handleDocKeyDown);
        document.removeEventListener('click', this.handleDocClick);
    }

    private handleTriggerClick = (event: Event): void => {
        event.stopPropagation();
        if (this._open) {
            this.close();
        } else {
            this.openPopover();
        }
    };

    private handleDocKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape' && this._open) {
            this.close();
            const trigger = this.querySelector('[slot="trigger"]') as HTMLElement;
            trigger?.focus();
        }
    };

    private handleDocClick = (event: Event): void => {
        if (this._open && !this.contains(event.target as Node)) {
            this.close();
        }
    };

    private openPopover(): void {
        this._open = true;
        this.updateContentVisibility();
        this.dispatchEvent(new CustomEvent('ds0-open-change', { detail: { open: true } }));
    }

    private close(): void {
        this._open = false;
        this.updateContentVisibility();
        this.dispatchEvent(new CustomEvent('ds0-open-change', { detail: { open: false } }));
    }

    private updateContentVisibility(): void {
        if (!this.shadowRoot) return;
        const content = this.shadowRoot.querySelector('.popover-content') as HTMLElement;
        if (content) {
            content.style.display = this._open ? 'block' : 'none';
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
                .popover-content {
                    display: none;
                    position: absolute;
                    z-index: 50;
                    min-width: 200px;
                    padding: var(--ds0-spacing-4, 16px);
                    border-radius: var(--ds0-radius-md, 6px);
                    background: var(--ds0-color-background, #fff);
                    border: 1px solid var(--ds0-color-border, #e5e7eb);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
                    animation: ds0-popover-in 0.15s ease-out;
                }
                @keyframes ds0-popover-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to   { opacity: 1; transform: scale(1); }
                }
            </style>
            <slot name="trigger"></slot>
            <div class="popover-content" role="dialog" aria-modal="false">
                <slot name="content"></slot>
            </div>
        `;
    }
}

customElements.define('ds0-popover', DS0Popover);

export { DS0Popover };
