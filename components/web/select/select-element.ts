/**
 * DS0 Select Web Component.
 * Framework-agnostic custom element for select/dropdown behavior.
 *
 * @example
 * ```html
 * <ds0-select placeholder="Choose an option">
 *   <ds0-select-option value="1">Option 1</ds0-select-option>
 *   <ds0-select-option value="2">Option 2</ds0-select-option>
 * </ds0-select>
 * ```
 */
class DS0Select extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['placeholder', 'value', 'disabled', 'name'];
    }

    private _placeholder: string = 'Select...';
    private _value: string = '';
    private _disabled: boolean = false;
    private _name: string = '';
    private _open: boolean = false;

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
            case 'placeholder':
                this._placeholder = newValue || 'Select...';
                break;
            case 'value':
                this._value = newValue || '';
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                break;
            case 'name':
                this._name = newValue || '';
                break;
        }
        this.render();
    }

    get value(): string {
        return this._value;
    }

    set value(val: string) {
        this._value = val;
        this.setAttribute('value', val);
        this.render();
    }

    private addEventListeners(): void {
        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('click', this.handleDocClick);
    }

    private removeEventListeners(): void {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('click', this.handleDocClick);
    }

    private handleClick = (event: Event): void => {
        if (this._disabled) return;

        const target = event.target as HTMLElement;
        const option = target.closest('ds0-select-option');
        if (option) {
            this._value = option.getAttribute('value') || '';
            this._open = false;
            this.render();
            this.dispatchEvent(new CustomEvent('ds0-change', { detail: { value: this._value } }));
        } else {
            this._open = !this._open;
            this.render();
        }
    };

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (this._disabled) return;
        if (event.key === 'Escape') {
            this._open = false;
            this.render();
        } else if (event.key === 'Enter' || event.key === ' ') {
            if (!this._open) {
                event.preventDefault();
                this._open = true;
                this.render();
            }
        }
    };

    private handleDocClick = (event: Event): void => {
        if (this._open && !this.contains(event.target as Node)) {
            this._open = false;
            this.render();
        }
    };

    private getSelectedLabel(): string {
        if (!this._value) return this._placeholder;
        const options = this.querySelectorAll('ds0-select-option');
        for (const opt of options) {
            if (opt.getAttribute('value') === this._value) {
                return opt.textContent?.trim() || this._value;
            }
        }
        return this._value;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const label = this.getSelectedLabel();
        const isPlaceholder = !this._value;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                    min-width: 180px;
                }
                .trigger {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid var(--ds0-color-border, #e5e7eb);
                    border-radius: var(--ds0-radius-md, 6px);
                    background: var(--ds0-color-background, #fff);
                    font-size: var(--ds0-font-size-sm, 14px);
                    cursor: pointer;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .trigger:focus-visible {
                    border-color: var(--ds0-color-primary, #6366f1);
                    box-shadow: 0 0 0 2px var(--ds0-color-ring, rgba(99, 102, 241, 0.3));
                }
                :host([disabled]) .trigger {
                    opacity: 0.5;
                    pointer-events: none;
                }
                .placeholder { color: var(--ds0-color-muted-foreground, #9ca3af); }
                .chevron { font-size: 10px; margin-left: 8px; }
                .dropdown {
                    display: ${this._open ? 'block' : 'none'};
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    z-index: 50;
                    margin-top: 4px;
                    border: 1px solid var(--ds0-color-border, #e5e7eb);
                    border-radius: var(--ds0-radius-md, 6px);
                    background: var(--ds0-color-background, #fff);
                    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
                    max-height: 240px;
                    overflow-y: auto;
                }
            </style>
            <div class="trigger" role="combobox"
                 aria-expanded="${this._open}"
                 aria-haspopup="listbox"
                 tabindex="${this._disabled ? '-1' : '0'}"
                 ${this._name ? `aria-label="${this._name}"` : ''}
            >
                <span class="${isPlaceholder ? 'placeholder' : ''}">${label}</span>
                <span class="chevron" aria-hidden="true">▼</span>
            </div>
            <div class="dropdown" role="listbox">
                <slot></slot>
            </div>
        `;

        if (this._disabled) {
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.removeAttribute('aria-disabled');
        }
    }
}

/**
 * DS0 Select Option Web Component.
 */
class DS0SelectOption extends HTMLElement {
    connectedCallback(): void {
        this.setAttribute('role', 'option');
        this.style.cssText = `
            display: block;
            padding: 8px 12px;
            cursor: pointer;
            font-size: var(--ds0-font-size-sm, 14px);
            transition: background-color 0.15s;
        `;
        this.addEventListener('mouseenter', () => {
            this.style.backgroundColor = 'var(--ds0-color-accent, #f3f4f6)';
        });
        this.addEventListener('mouseleave', () => {
            this.style.backgroundColor = '';
        });
    }
}

customElements.define('ds0-select', DS0Select);
customElements.define('ds0-select-option', DS0SelectOption);

export { DS0Select, DS0SelectOption };
