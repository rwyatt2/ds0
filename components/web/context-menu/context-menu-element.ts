class DS0ContextMenu extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); this.addEventListener('contextmenu', this.handleContextMenu); }
    disconnectedCallback(): void { this.removeEventListener('contextmenu', this.handleContextMenu); }
    private handleContextMenu = (e: Event): void => { e.preventDefault(); this.setAttribute('open', ''); };
    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `<style>:host{display:block;}.content{position:fixed;z-index:50;min-width:8rem;padding:4px;bg:var(--ds0-color-popover,#fff);border:1px solid var(--ds0-color-border,#e2e8f0);border-radius:6px;box-shadow:0 4px 6px -1px rgb(0 0 0/0.1);display:none;}:host([open]) .content{display:block;}</style><slot name="trigger"></slot><div class="content" role="menu" part="content"><slot name="content"></slot></div>`;
    }
}
customElements.define('ds0-context-menu', DS0ContextMenu);
export { DS0ContextMenu };
