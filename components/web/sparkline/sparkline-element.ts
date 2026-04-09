class DS0Sparkline extends HTMLElement {
    static get observedAttributes() { return ['data', 'color', 'width', 'height']; }
    private _data: number[] = []; private _color = '#10b981'; private _w = 120; private _h = 32;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { this.render(); }
    attributeChangedCallback(n: string, _: string, v: string) {
        if (n === 'data') try { this._data = JSON.parse(v); } catch { this._data = []; }
        else if (n === 'color') this._color = v;
        else if (n === 'width') this._w = parseInt(v) || 120;
        else if (n === 'height') this._h = parseInt(v) || 32;
        this.render();
    }
    private render() {
        if (!this.shadowRoot || !this._data.length) { this.shadowRoot!.innerHTML = ''; return; }
        const min = Math.min(...this._data); const max = Math.max(...this._data); const range = max - min || 1;
        const pts = this._data.map((v, i) => ({ x: (i / (this._data.length - 1 || 1)) * this._w, y: (1 - (v - min) / range) * this._h }));
        const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('');
        this.shadowRoot!.innerHTML = `<svg width="${this._w}" height="${this._h}" viewBox="0 0 ${this._w} ${this._h}" role="img" aria-label="Sparkline"><path d="${d}" fill="none" stroke="${this._color}" stroke-width="1.5" stroke-linecap="round"/></svg>`;
    }
}
customElements.define('ds0-sparkline', DS0Sparkline);
export { DS0Sparkline };
