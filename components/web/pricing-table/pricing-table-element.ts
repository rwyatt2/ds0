class DS0PricingTable extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML = '<style>:host{display:block}</style><slot></slot>'; this.setAttribute('role','region'); this.setAttribute('aria-label','Pricing table'); } }
customElements.define('ds0-pricing-table', DS0PricingTable);
export { DS0PricingTable };
