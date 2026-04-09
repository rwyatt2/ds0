class DS0Notification extends HTMLElement {
    static get observedAttributes(): string[] { return ['variant', 'size', 'dismissible', 'title']; }
    private _variant = 'info'; private _size = 'md'; private _dismissible = false; private _title = ''; private _dismissed = false;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _: string, v: string): void {
        if (name === 'variant') this._variant = v; else if (name === 'size') this._size = v;
        else if (name === 'dismissible') this._dismissible = v !== null; else if (name === 'title') this._title = v;
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot || this._dismissed) { if (this.shadowRoot) this.shadowRoot.innerHTML = ''; return; }
        const colors: Record<string, string> = { info: '#2563eb', success: '#059669', warning: '#d97706', error: '#dc2626' };
        const c = colors[this._variant] || colors.info;
        const pad: Record<string, string> = { sm: '12px', md: '16px', lg: '20px' };
        this.shadowRoot.innerHTML = `<style>:host{display:block}.n{border:1px solid ${c}20;background:${c}08;color:${c};border-radius:8px;padding:${pad[this._size]||pad.md};position:relative;font-family:inherit}.t{font-weight:600;margin-bottom:4px}.d{font-size:14px;opacity:0.9}.x{position:absolute;right:8px;top:8px;background:none;border:none;color:inherit;cursor:pointer;padding:4px;opacity:0.7}.x:hover{opacity:1}</style><div class="n">${this._title?`<div class="t">${this._title}</div>`:''}<div class="d"><slot></slot></div>${this._dismissible?'<button class="x" aria-label="Dismiss notification">✕</button>':''}</div>`;
        this.setAttribute('role', this._variant==='error'||this._variant==='warning'?'alert':'status');
        this.shadowRoot.querySelector('.x')?.addEventListener('click', () => { this._dismissed = true; this.render(); this.dispatchEvent(new CustomEvent('ds0-dismiss', { bubbles: true })); });
    }
}
customElements.define('ds0-notification', DS0Notification);
export { DS0Notification };
