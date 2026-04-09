class DS0AppShell extends HTMLElement {
  static get observedAttributes(): string[] { return ['variant']; }
  private _variant = 'default';
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void { this.render(); }
  attributeChangedCallback(name: string, _old: string, val: string): void {
    if (name === 'variant') this._variant = val;
    this.render();
  }
  private render(): void {
    if (!this.shadowRoot) return;
    const headerSticky = this._variant === 'fixed-header' ? 'position: sticky; top: 0; z-index: 50;' : '';
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; min-height: 100vh; background: var(--ds0-color-background, #fff); }
        .header { ${headerSticky} border-bottom: 1px solid var(--ds0-color-border, #e5e7eb); }
        .body { display: flex; flex: 1; min-height: 0; }
        .main { flex: 1; min-width: 0; overflow: auto; padding: 1.5rem; }
        .footer { border-top: 1px solid var(--ds0-color-border, #e5e7eb); }
      </style>
      <div class="header"><slot name="header"></slot></div>
      <div class="body"><slot name="sidebar"></slot><main class="main"><slot></slot></main></div>
      <div class="footer"><slot name="footer"></slot></div>
    `;
  }
}
customElements.define('ds0-app-shell', DS0AppShell);
export { DS0AppShell };
