class DS0Container extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML = '<style>:host{display:block;width:100%;max-width:1024px;margin:0 auto;padding:0 1rem;}</style><slot></slot>'; } }
customElements.define('ds0-container', DS0Container); export { DS0Container };
