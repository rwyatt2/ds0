class DS0MasonryGrid extends HTMLElement {
  static get observedAttributes(): string[] { return ['columns', 'gap']; }
  private _columns = 3; private _gap = 16;
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void { this.render(); }
  attributeChangedCallback(n: string, _o: string, v: string): void {
    if (n === 'columns') this._columns = parseInt(v, 10) || 3;
    if (n === 'gap') this._gap = parseInt(v, 10) || 16;
    this.render();
  }
  private render(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `<style>:host { display: block; column-count: ${this._columns}; column-gap: ${this._gap}px; } ::slotted(*) { break-inside: avoid; margin-bottom: ${this._gap}px; }</style><slot></slot>`;
    this.setAttribute('role', 'list');
  }
}
customElements.define('ds0-masonry-grid', DS0MasonryGrid);
export { DS0MasonryGrid };
