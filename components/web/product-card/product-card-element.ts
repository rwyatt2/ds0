class DS0ProductCard extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML='<style>:host{display:block;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}</style><slot></slot>'; this.setAttribute('role','article'); } }
customElements.define('ds0-product-card', DS0ProductCard); export { DS0ProductCard };
