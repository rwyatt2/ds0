class DS0Text extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['size', 'weight', 'color', 'align'];
    }

    private _size = 'base';
    private _weight = 'regular';
    private _color = 'default';
    private _align = 'left';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
    }

    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
        switch (name) {
            case 'size': this._size = newValue ?? 'base'; break;
            case 'weight': this._weight = newValue ?? 'regular'; break;
            case 'color': this._color = newValue ?? 'default'; break;
            case 'align': this._align = newValue ?? 'left'; break;
        }
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const sizeMap: Record<string, string> = {
            xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem',
        };
        const weightMap: Record<string, string> = {
            regular: '400', medium: '500', semibold: '600', bold: '700',
        };
        const colorMap: Record<string, string> = {
            default: 'inherit',
            muted: 'var(--ds0-color-muted-foreground, #64748b)',
            primary: 'var(--ds0-color-primary, #2563eb)',
            destructive: 'var(--ds0-color-destructive, #dc2626)',
            success: 'var(--ds0-color-success, #16a34a)',
        };

        this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .text {
          font-size: ${sizeMap[this._size] ?? '1rem'};
          font-weight: ${weightMap[this._weight] ?? '400'};
          color: ${colorMap[this._color] ?? 'inherit'};
          text-align: ${this._align};
          font-family: inherit;
          margin: 0;
        }
      </style>
      <p class="text" part="text"><slot></slot></p>
    `;
    }
}

customElements.define('ds0-text', DS0Text);
export { DS0Text };
