class DS0Tour extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML='<style>:host{display:block}</style><slot></slot>'; this.setAttribute('role','dialog'); } }
customElements.define('ds0-tour', DS0Tour); export { DS0Tour };
