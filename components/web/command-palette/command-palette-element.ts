class DS0CommandPalette extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML='<style>:host{display:block}</style><slot></slot>'; this.setAttribute('role','dialog'); } }
customElements.define('ds0-command-palette', DS0CommandPalette);
export { DS0CommandPalette };
