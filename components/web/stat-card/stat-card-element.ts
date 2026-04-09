class DS0StatCard extends HTMLElement {
    static get observedAttributes(): string[] { return ['label', 'value', 'trend', 'trend-label', 'variant', 'size']; }
    private _label = ''; private _value = ''; private _trend: number | null = null; private _trendLabel = ''; private _variant = 'default'; private _size = 'md';
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(n: string, _: string, v: string): void {
        if (n === 'label') this._label = v; else if (n === 'value') this._value = v;
        else if (n === 'trend') this._trend = parseFloat(v); else if (n === 'trend-label') this._trendLabel = v;
        else if (n === 'variant') this._variant = v; else if (n === 'size') this._size = v;
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        const dir = this._trend === null || this._trend === 0 ? 'neutral' : this._trend > 0 ? 'up' : 'down';
        const trendColor = dir === 'up' ? '#059669' : dir === 'down' ? '#dc2626' : '#6b7280';
        const pad: Record<string, string> = { sm: '12px', md: '16px', lg: '24px' };
        const border = this._variant === 'outlined' ? 'border: 2px solid var(--ds0-color-border, #e5e7eb);' : 'border: 1px solid var(--ds0-color-border, #e5e7eb); box-shadow: 0 1px 2px rgba(0,0,0,0.05);';
        this.shadowRoot.innerHTML = `<style>:host{display:block}.c{${border}border-radius:12px;padding:${pad[this._size]||pad.md};font-family:inherit;background:var(--ds0-color-card,white)}.l{font-size:14px;color:var(--ds0-color-muted,#6b7280)}.v{font-size:24px;font-weight:700;margin-top:8px}.t{font-size:12px;color:${trendColor};margin-top:4px}.tl{font-size:12px;color:var(--ds0-color-muted,#6b7280);margin-top:2px}</style><div class="c"><div class="l">${this._label}</div><div class="v">${this._value}</div>${this._trend !== null ? `<div class="t">${dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'} ${Math.abs(this._trend)}%</div>` : ''}${this._trendLabel ? `<div class="tl">${this._trendLabel}</div>` : ''}</div>`;
        this.setAttribute('role', 'group');
        this.setAttribute('aria-label', `${this._label}: ${this._value}`);
    }
}
customElements.define('ds0-stat-card', DS0StatCard);
export { DS0StatCard };
