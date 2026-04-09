class DS0NavigationMenu extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { if (!this.shadowRoot) return; this.shadowRoot.innerHTML = `<style>:host{display:flex;align-items:center;}</style><nav part="nav"><slot></slot></nav>`; } }
customElements.define('ds0-navigation-menu', DS0NavigationMenu);
export { DS0NavigationMenu };
