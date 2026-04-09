/**
 * DS0 EmptyState Web Component.
 * Framework-agnostic custom element for displaying empty state placeholders.
 *
 * @example
 * ```html
 * <ds0-empty-state title="No items" description="Add your first item."></ds0-empty-state>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/empty-state | Documentation}
 */
class DS0EmptyState extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['variant', 'size', 'title', 'description'];
  }

  private _variant: string = 'default';
  private _size: string = 'md';
  private _title: string = '';
  private _description: string = '';

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
      case 'title':
        this._title = newValue;
        break;
      case 'description':
        this._description = newValue;
        break;
    }
    this.render();
  }

  private getSizeStyles(): { icon: string; title: string; desc: string; gap: string } {
    switch (this._size) {
      case 'sm':
        return { icon: '2rem', title: '0.875rem', desc: '0.75rem', gap: '0.5rem' };
      case 'lg':
        return { icon: '4rem', title: '1.125rem', desc: '1rem', gap: '1.5rem' };
      default:
        return { icon: '3rem', title: '1rem', desc: '0.875rem', gap: '1rem' };
    }
  }

  private getVariantStyles(): string {
    switch (this._variant) {
      case 'compact':
        return 'padding: 1.5rem 1rem;';
      case 'card':
        return `
          padding: 3rem 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid var(--ds0-color-border, #e5e7eb);
          background: var(--ds0-color-card, #fff);
        `;
      default:
        return 'padding: 3rem 1.5rem;';
    }
  }

  private render(): void {
    if (!this.shadowRoot) return;

    const sizes = this.getSizeStyles();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: ${sizes.gap};
          ${this.getVariantStyles()}
        }
        .icon {
          width: ${sizes.icon};
          height: ${sizes.icon};
          color: var(--ds0-color-muted-foreground, #6b7280);
        }
        .title {
          font-size: ${sizes.title};
          font-weight: 600;
          color: var(--ds0-color-foreground, #171717);
        }
        .description {
          font-size: ${sizes.desc};
          color: var(--ds0-color-muted-foreground, #6b7280);
          max-width: 24rem;
        }
        .action {
          margin-top: 0.5rem;
        }
      </style>
      <div class="icon" aria-hidden="true">
        <slot name="icon"></slot>
      </div>
      <div class="title">${this._title}</div>
      ${this._description ? `<p class="description">${this._description}</p>` : ''}
      <div class="action">
        <slot name="action"></slot>
      </div>
      <slot></slot>
    `;

    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
  }
}

customElements.define('ds0-empty-state', DS0EmptyState);

export { DS0EmptyState };
