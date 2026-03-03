/**
 * DS0 Heading Web Component.
 * Framework-agnostic custom element wrapping the Heading primitive behavior.
 *
 * @example
 * ```html
 * <ds0-heading level="1" size="4xl">
 *   Page Title
 * </ds0-heading>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/heading | Documentation}
 */
class DS0Heading extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['level', 'size', 'weight', 'tracking'];
    }

    private _level = '2';
    private _size = '';
    private _weight = 'bold';
    private _tracking = 'tight';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
    }

    attributeChangedCallback(
        name: string,
        _oldValue: string | null,
        newValue: string | null,
    ): void {
        switch (name) {
            case 'level':
                this._level = newValue ?? '2';
                break;
            case 'size':
                this._size = newValue ?? '';
                break;
            case 'weight':
                this._weight = newValue ?? 'bold';
                break;
            case 'tracking':
                this._tracking = newValue ?? 'tight';
                break;
        }
        this.render();
    }

    private getLevelSizeMap(): Record<string, string> {
        return {
            '1': '2.25rem',
            '2': '1.875rem',
            '3': '1.5rem',
            '4': '1.25rem',
            '5': '1.125rem',
            '6': '1rem',
        };
    }

    private getSizeValue(): string {
        const sizeMap: Record<string, string> = {
            xs: '0.75rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
        };

        if (this._size && sizeMap[this._size]) {
            return sizeMap[this._size]!;
        }

        return this.getLevelSizeMap()[this._level] ?? '1.25rem';
    }

    private getWeightValue(): string {
        const weightMap: Record<string, string> = {
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        };
        return weightMap[this._weight] ?? '700';
    }

    private getTrackingValue(): string {
        const trackingMap: Record<string, string> = {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0',
        };
        return trackingMap[this._tracking] ?? '-0.025em';
    }

    private render(): void {
        if (!this.shadowRoot) return;

        const tag = `h${this._level}`;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .heading {
          scroll-margin-top: 5rem;
          font-size: ${this.getSizeValue()};
          font-weight: ${this.getWeightValue()};
          letter-spacing: ${this.getTrackingValue()};
          line-height: 1.2;
          margin: 0;
          font-family: inherit;
          color: inherit;
        }
      </style>
      <${tag} class="heading" part="heading">
        <slot></slot>
      </${tag}>
    `;
    }
}

customElements.define('ds0-heading', DS0Heading);

export { DS0Heading };
