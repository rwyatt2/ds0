class DS0ScrollArea extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `<style>:host{display:block;position:relative;overflow:hidden;}.viewport{overflow:auto;height:100%;width:100%;scrollbar-width:thin;scrollbar-color:var(--ds0-color-border,#e2e8f0) transparent;}.viewport::-webkit-scrollbar{width:8px;height:8px;}.viewport::-webkit-scrollbar-track{background:transparent;}.viewport::-webkit-scrollbar-thumb{background:var(--ds0-color-border,#e2e8f0);border-radius:9999px;}</style><div class="viewport" part="viewport"><slot></slot></div>`;
    }
}
customElements.define('ds0-scroll-area', DS0ScrollArea);
export { DS0ScrollArea };
