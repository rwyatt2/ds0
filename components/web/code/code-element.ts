class DS0Code extends HTMLElement {
    static get observedAttributes(): string[] { return ['variant']; }
    private _variant = 'inline';
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _: string | null, newValue: string | null): void {
        if (name === 'variant') this._variant = newValue ?? 'inline';
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        const isBlock = this._variant === 'block';
        this.shadowRoot.innerHTML = `
      <style>
        :host { display: ${isBlock ? 'block' : 'inline'}; }
        .code { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          background: var(--ds0-color-muted, #f1f5f9); font-size: 0.875rem; }
        .inline { border-radius: 0.25rem; padding: 0.2rem 0.3rem; }
        .block { border-radius: 0.5rem; padding: 1rem; overflow-x: auto; display: block; white-space: pre; }
      </style>
      ${isBlock ? '<pre class="code block" part="code"><code><slot></slot></code></pre>' : '<code class="code inline" part="code"><slot></slot></code>'}`;
    }
}
customElements.define('ds0-code', DS0Code);
export { DS0Code };
