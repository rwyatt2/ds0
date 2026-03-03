class DS0Drawer extends HTMLElement {
    static get observedAttributes(): string[] { return ['open', 'side']; }
    private _open = false; private _side = 'right';
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _old: string, val: string): void {
        if (name === 'open') this._open = val !== null;
        if (name === 'side') this._side = val || 'right';
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        const pos = { left: 'left:0;top:0;bottom:0;', right: 'right:0;top:0;bottom:0;', top: 'top:0;left:0;right:0;', bottom: 'bottom:0;left:0;right:0;' }[this._side] ?? 'right:0;top:0;bottom:0;';
        this.shadowRoot.innerHTML = this._open ? `<style>:host{display:contents}.overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:50}.panel{position:fixed;${pos}z-index:50;background:var(--ds0-color-background,white);padding:24px;box-shadow:0 25px 50px -12px rgba(0,0,0,.25)}</style><div class="overlay"></div><div class="panel" role="dialog" aria-modal="true"><slot></slot></div>` : '';
    }
}
customElements.define('ds0-drawer', DS0Drawer);
export { DS0Drawer };
