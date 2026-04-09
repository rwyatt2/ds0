class DS0Changelog extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML='<style>:host{display:block}</style><slot></slot>'; this.setAttribute('role','feed'); } }
customElements.define('ds0-changelog', DS0Changelog); export { DS0Changelog };
