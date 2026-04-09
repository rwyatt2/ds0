class DS0TreeView extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback(): void { this.render(); } private render(): void { if (!this.shadowRoot) return; this.shadowRoot.innerHTML = `<style>:host{display:block}</style><slot></slot>`; this.setAttribute('role', 'tree'); } }
customElements.define('ds0-tree-view', DS0TreeView);
export { DS0TreeView };
