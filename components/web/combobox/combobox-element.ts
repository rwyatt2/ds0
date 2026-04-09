class DS0Combobox extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { if (!this.shadowRoot) return; this.shadowRoot.innerHTML = `<style>:host{display:block;position:relative;}input{width:100%;height:40px;padding:0 12px;border:1px solid var(--ds0-color-border,#e2e8f0);border-radius:6px;background:var(--ds0-color-background,#fff);font-size:14px;}</style><input type="text" role="combobox" aria-expanded="false" part="input" /><slot></slot>`; } }
customElements.define('ds0-combobox', DS0Combobox);
export { DS0Combobox };
