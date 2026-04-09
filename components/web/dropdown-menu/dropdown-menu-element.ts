class DS0DropdownMenu extends HTMLElement {
    static get observedAttributes(): string[] { return ['open']; }
    private _open = false;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); this.addEventListener('click', this.handleTriggerClick); }
    disconnectedCallback(): void { this.removeEventListener('click', this.handleTriggerClick); }
    attributeChangedCallback(name: string, _old: string | null, val: string | null): void {
        if (name === 'open') { this._open = val !== null; this.render(); }
    }
    private handleTriggerClick = (e: Event): void => {
        const target = e.target as HTMLElement;
        if (target.closest('[slot="trigger"]')) { this._open = !this._open; this.render(); }
    };
    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `<style>:host{display:inline-block;position:relative;}.content{position:absolute;top:100%;left:0;z-index:50;min-width:8rem;padding:4px;background:var(--ds0-color-popover,#fff);border:1px solid var(--ds0-color-border,#e2e8f0);border-radius:var(--ds0-radius-md,6px);box-shadow:var(--ds0-shadow-md,0 4px 6px -1px rgb(0 0 0/0.1));display:${this._open ? 'block' : 'none'};}</style><slot name="trigger"></slot><div class="content" role="menu" part="content"><slot name="content"></slot></div>`;
    }
}
customElements.define('ds0-dropdown-menu', DS0DropdownMenu);
export { DS0DropdownMenu };
