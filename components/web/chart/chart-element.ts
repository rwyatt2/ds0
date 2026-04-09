class DS0Chart extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML = '<style>:host{display:block}</style><slot></slot>'; this.setAttribute('role', 'img'); this.setAttribute('aria-label', 'Chart'); } }
customElements.define('ds0-chart', DS0Chart);
export { DS0Chart };
