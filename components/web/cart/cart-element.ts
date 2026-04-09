class DS0Cart extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML='<style>:host{display:block}</style><slot></slot>'; this.setAttribute('role','region'); } }
customElements.define('ds0-cart', DS0Cart); export { DS0Cart };
