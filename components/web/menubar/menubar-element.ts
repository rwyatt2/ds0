class DS0Menubar extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { if (!this.shadowRoot) return; this.shadowRoot.innerHTML = `<style>:host{display:flex;align-items:center;gap:4px;height:40px;border-radius:6px;border:1px solid var(--ds0-color-border,#e2e8f0);padding:4px;background:var(--ds0-color-background,#fff);}</style><div role="menubar" part="menubar"><slot></slot></div>`; } }
customElements.define('ds0-menubar', DS0Menubar);
export { DS0Menubar };
