/**
 * DS0 Sticky Web Component.
 * Framework-agnostic custom element using position:sticky with stuck detection.
 *
 * @example
 * ```html
 * <ds0-sticky variant="top" shadow>
 *   <nav>Navigation</nav>
 * </ds0-sticky>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/sticky | Documentation}
 */
class DS0Sticky extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['variant', 'offset', 'shadow'];
  }

  private _variant: string = 'top';
  private _offset: number = 0;
  private _shadow: boolean = true;
  private _stuck: boolean = false;
  private _observer: IntersectionObserver | null = null;
  private _sentinel: HTMLElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    this.setupObserver();
  }

  disconnectedCallback(): void {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'variant':
        this._variant = newValue;
        break;
      case 'offset':
        this._offset = parseInt(newValue, 10) || 0;
        break;
      case 'shadow':
        this._shadow = newValue !== 'false';
        break;
    }
    this.render();
    this.setupObserver();
  }

  private setupObserver(): void {
    if (this._observer) {
      this._observer.disconnect();
    }

    this._sentinel = this.shadowRoot?.querySelector('.sentinel') as HTMLElement;
    if (!this._sentinel) return;

    const rootMargin = this._variant === 'top'
      ? `-${this._offset + 1}px 0px 0px 0px`
      : `0px 0px -${this._offset + 1}px 0px`;

    this._observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        this._stuck = !entry.isIntersecting;
        this.updateStuckState();
      },
      { threshold: 0, rootMargin },
    );

    this._observer.observe(this._sentinel);
  }

  private updateStuckState(): void {
    const container = this.shadowRoot?.querySelector('.container') as HTMLElement;
    if (!container) return;

    if (this._stuck) {
      container.setAttribute('data-stuck', 'true');
      if (this._shadow) {
        container.style.boxShadow = 'var(--ds0-shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1))';
      }
    } else {
      container.removeAttribute('data-stuck');
      container.style.boxShadow = 'none';
    }
  }

  private render(): void {
    if (!this.shadowRoot) return;

    const positionProp = this._variant === 'top' ? 'top' : 'bottom';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .sentinel {
          height: 0;
          width: 100%;
          visibility: hidden;
        }
        .container {
          position: sticky;
          ${positionProp}: ${this._offset}px;
          z-index: 40;
          transition: box-shadow 0.2s;
          background: var(--ds0-color-background, #fff);
        }
      </style>
      <div class="sentinel" aria-hidden="true"></div>
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ds0-sticky', DS0Sticky);

export { DS0Sticky };
