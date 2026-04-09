class DS0VirtualizedList extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void {
    this.shadowRoot!.innerHTML = `<style>:host { display: block; overflow: auto; position: relative; } .inner { position: relative; } ::slotted(*) { position: absolute; left: 0; right: 0; }</style><div class="inner"><slot></slot></div>`;
    this.setAttribute('role', 'list');
  }
}
customElements.define('ds0-virtualized-list', DS0VirtualizedList);
export { DS0VirtualizedList };
