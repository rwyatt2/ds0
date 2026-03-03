class DS0Avatar extends HTMLElement {
    static get observedAttributes(): string[] { return ['src', 'alt', 'fallback', 'size', 'shape']; }
    private _src = ''; private _alt = ''; private _fallback = ''; private _size = 'md'; private _shape = 'circle';
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _old: string | null, val: string | null): void {
        switch (name) { case 'src': this._src = val ?? ''; break; case 'alt': this._alt = val ?? ''; break; case 'fallback': this._fallback = val ?? ''; break; case 'size': this._size = val ?? 'md'; break; case 'shape': this._shape = val ?? 'circle'; break; }
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        const sizeMap: Record<string, string> = { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '4rem' };
        const sz = sizeMap[this._size] ?? '2.5rem';
        const radius = this._shape === 'circle' ? '50%' : '0.375rem';
        const initials = (this._fallback || this._alt).slice(0, 2).toUpperCase();
        const content = this._src ? `<img src="${this._src}" alt="${this._alt}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span style="display:none;width:100%;height:100%;align-items:center;justify-content:center">${initials}</span>` : `<span style="display:flex;width:100%;height:100%;align-items:center;justify-content:center">${initials}</span>`;
        this.shadowRoot.innerHTML = `<style>:host{display:inline-flex;width:${sz};height:${sz};border-radius:${radius};overflow:hidden;background:var(--ds0-color-muted,#f1f5f9);font-size:0.875rem;font-weight:500;font-family:inherit;align-items:center;justify-content:center;}</style>${content}`;
    }
}
customElements.define('ds0-avatar', DS0Avatar);
export { DS0Avatar };
