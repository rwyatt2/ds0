/**
 * DS0 BackToTop Web Component.
 * Framework-agnostic custom element that scrolls to the top of the page.
 *
 * @example
 * ```html
 * <ds0-back-to-top threshold="300" position="bottom-right"></ds0-back-to-top>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/back-to-top | Documentation}
 */
class DS0BackToTop extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['variant', 'size', 'position', 'threshold', 'disabled'];
  }

  private _variant: string = 'default';
  private _size: string = 'md';
  private _position: string = 'bottom-right';
  private _threshold: number = 300;
  private _disabled: boolean = false;
  private _visible: boolean = false;
  private _scrollHandler: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    this.addEventListeners();
    this.startScrollTracking();
  }

  disconnectedCallback(): void {
    this.removeEventListeners();
    this.stopScrollTracking();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'variant':
        this._variant = newValue;
        break;
      case 'size':
        this._size = newValue;
        break;
      case 'position':
        this._position = newValue;
        break;
      case 'threshold':
        this._threshold = parseInt(newValue, 10) || 300;
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        break;
    }
    this.render();
  }

  private startScrollTracking(): void {
    this._scrollHandler = () => {
      const shouldBeVisible = window.scrollY > this._threshold;
      if (shouldBeVisible !== this._visible) {
        this._visible = shouldBeVisible;
        this.render();
      }
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
    this._scrollHandler();
  }

  private stopScrollTracking(): void {
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
      this._scrollHandler = null;
    }
  }

  private addEventListeners(): void {
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  private removeEventListeners(): void {
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleClick = (): void => {
    if (this._disabled) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this._disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  private getSizeStyles(): string {
    switch (this._size) {
      case 'sm': return 'width: 2rem; height: 2rem;';
      case 'lg': return 'width: 3rem; height: 3rem;';
      default: return 'width: 2.5rem; height: 2.5rem;';
    }
  }

  private getPositionStyles(): string {
    switch (this._position) {
      case 'bottom-left': return 'bottom: 1.5rem; left: 1.5rem;';
      case 'bottom-center': return 'bottom: 1.5rem; left: 50%; transform: translateX(-50%);';
      default: return 'bottom: 1.5rem; right: 1.5rem;';
    }
  }

  private getVariantStyles(): string {
    switch (this._variant) {
      case 'outline':
        return `
          background: var(--ds0-color-background, #fff);
          color: var(--ds0-color-foreground, #000);
          border: 1px solid var(--ds0-color-border, #e5e7eb);
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--ds0-color-foreground, #000);
          border: none;
        `;
      default:
        return `
          background: var(--ds0-color-primary, #171717);
          color: var(--ds0-color-primary-foreground, #fff);
          border: none;
        `;
    }
  }

  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          ${this.getPositionStyles()}
          ${this.getSizeStyles()}
          z-index: 50;
          display: ${this._visible ? 'inline-flex' : 'none'};
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          cursor: pointer;
          ${this.getVariantStyles()}
          box-shadow: var(--ds0-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));
          transition: opacity 0.3s, transform 0.3s;
          opacity: ${this._disabled ? '0.5' : '1'};
          pointer-events: ${this._disabled ? 'none' : 'auto'};
        }
        :host(:hover) {
          opacity: 0.9;
        }
        :host(:focus-visible) {
          outline: 2px solid var(--ds0-color-ring, #2563eb);
          outline-offset: 2px;
        }
        svg {
          width: 1rem;
          height: 1rem;
        }
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    `;

    this.setAttribute('role', 'button');
    this.setAttribute('aria-label', 'Back to top');
    this.setAttribute('tabindex', this._visible && !this._disabled ? '0' : '-1');
    if (this._disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
    if (!this._visible) {
      this.setAttribute('aria-hidden', 'true');
    } else {
      this.removeAttribute('aria-hidden');
    }
  }
}

customElements.define('ds0-back-to-top', DS0BackToTop);

export { DS0BackToTop };
