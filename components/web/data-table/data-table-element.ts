/**
 * DS0 DataTable Web Component.
 * Framework-agnostic custom element for displaying tabular data with sorting.
 *
 * @example
 * ```html
 * <ds0-data-table variant="default" size="md">
 *   <!-- Content managed via JavaScript API -->
 * </ds0-data-table>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/data-table | Documentation}
 */
class DS0DataTable extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'size', 'sortable', 'selectable'];
    }

    private _variant: string = 'default';
    private _size: string = 'md';
    private _sortable: boolean = true;
    private _selectable: boolean = false;

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
            case 'sortable':
                this._sortable = newValue !== 'false';
                break;
            case 'selectable':
                this._selectable = newValue !== null && newValue !== 'false';
                break;
        }
        this.render();
    }

    private getSizeStyles(): string {
        const sizes: Record<string, string> = {
            sm: 'padding: 6px 12px; font-size: 0.75rem;',
            md: 'padding: 8px 16px; font-size: 0.875rem;',
            lg: 'padding: 12px 16px; font-size: 1rem;',
        };
        return sizes[this._size] || sizes.md;
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const cellStyles = this.getSizeStyles();
        const stripedStyle = this._variant === 'striped'
            ? 'tbody tr:nth-child(even) { background: var(--ds0-color-muted, #f5f5f5); }'
            : '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    overflow: auto;
                    border: 1px solid var(--ds0-color-border, #e5e5e5);
                    border-radius: var(--ds0-radius-md, 6px);
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }
                th, td {
                    ${cellStyles}
                    border-bottom: 1px solid var(--ds0-color-border, #e5e5e5);
                }
                th {
                    font-weight: 500;
                    color: var(--ds0-color-muted-foreground, #737373);
                }
                td {
                    color: var(--ds0-color-foreground, #171717);
                }
                tr:hover td {
                    background: var(--ds0-color-muted, #f5f5f5);
                }
                ${stripedStyle}
            </style>
            <slot></slot>
        `;

        this.setAttribute('role', 'grid');
    }
}

customElements.define('ds0-data-table', DS0DataTable);

export { DS0DataTable };
