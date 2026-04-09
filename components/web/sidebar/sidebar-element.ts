/**
 * DS0 Sidebar Web Component.
 *
 * @example
 * ```html
 * <ds0-sidebar collapsible>
 *   <a href="/dashboard">Dashboard</a>
 * </ds0-sidebar>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/sidebar | Documentation}
 */
class DS0Sidebar extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['variant', 'size', 'collapsed', 'side', 'collapsible'];
  }

  private _variant = 'default';
  private _size = 'md';
  private _collapsed = false;
  private _side = 'left';
  private _collapsible = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    this.shadowRoot?.querySelector('.toggle')?.addEventListener('click', () => {
      if (!this._collapsible) return;
      this._collapsed = !this._collapsed;
      this.render();
      this.dispatchEvent(new CustomEvent('ds0-collapse', { detail: { collapsed: this._collapsed } }));
    });
  }

  attributeChangedCallback(name: string, _old: string, val: string): void {
    switch (name) {
      case 'variant': this._variant = val; break;
      case 'size': this._size = val; break;
      case 'collapsed': this._collapsed = val !== null && val !== 'false'; break;
      case 'side': this._side = val; break;
      case 'collapsible': this._collapsible = val !== 'false'; break;
    }
    this.render();
  }

  private getWidth(): string {
    const widths: Record<string, [string, string]> = {
      sm: ['200px', '48px'], md: ['256px', '64px'], lg: ['320px', '80px'],
    };
    const pair = widths[this._size] ?? widths.md!;
    const expanded = pair![0];
    const collapsed = pair![1];
    return this._collapsed ? collapsed : expanded;
  }

  private render(): void {
    if (!this.shadowRoot) return;
    const borderSide = this._side === 'right' ? 'border-left' : 'border-right';
    const shadow = this._variant === 'floating' ? 'box-shadow: var(--ds0-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));' : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: ${this.getWidth()};
          height: 100%;
          ${borderSide}: 1px solid var(--ds0-color-border, #e5e7eb);
          background: var(--ds0-color-background, #fff);
          transition: width 0.3s ease;
          overflow: hidden;
          ${shadow}
        }
        .content { flex: 1; overflow-y: auto; padding: 0.5rem; }
        .toggle { display: flex; align-items: center; justify-content: center; width: 100%; height: 2rem; border: none; background: transparent; cursor: pointer; color: var(--ds0-color-muted-foreground, #6b7280); }
        .toggle:hover { background: var(--ds0-color-accent, #f4f4f5); }
        .footer { padding: 0.5rem; border-top: 1px solid var(--ds0-color-border, #e5e7eb); }
      </style>
      <slot name="header"></slot>
      <div class="content"><slot></slot></div>
      <div class="footer">
        <slot name="footer"></slot>
        ${this._collapsible ? '<button class="toggle" aria-label="' + (this._collapsed ? 'Expand' : 'Collapse') + ' sidebar">◀</button>' : ''}
      </div>
    `;
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Sidebar');
  }
}

customElements.define('ds0-sidebar', DS0Sidebar);
export { DS0Sidebar };
