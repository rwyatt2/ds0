class DS0CountdownTimer extends HTMLElement {
    static get observedAttributes(): string[] { return ['target-date', 'size']; }
    private _targetDate = 0; private _size = 'md'; private _interval: ReturnType<typeof setInterval> | null = null;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this._interval = setInterval(() => this.render(), 1000); this.render(); }
    disconnectedCallback(): void { if (this._interval) clearInterval(this._interval); }
    attributeChangedCallback(n: string, _: string, v: string): void { if (n === 'target-date') this._targetDate = new Date(v).getTime(); else if (n === 'size') this._size = v; this.render(); }
    private render(): void {
        if (!this.shadowRoot) return;
        const t = Math.max(0, this._targetDate - Date.now()); const d = Math.floor(t/864e5); const h = Math.floor((t/36e5)%24); const m = Math.floor((t/6e4)%60); const s = Math.floor((t/1e3)%60);
        const fs: Record<string,string> = { sm: '18px', md: '24px', lg: '36px' };
        this.shadowRoot.innerHTML = `<style>:host{display:inline-flex;align-items:center;gap:8px;font-family:monospace;font-size:${fs[this._size]||fs.md}}.s{background:var(--ds0-color-muted,#f1f5f9);border-radius:6px;padding:4px 8px;font-weight:700}.l{font-size:10px;text-transform:uppercase;color:var(--ds0-color-muted-foreground,#64748b);text-align:center;margin-top:2px}.sep{color:var(--ds0-color-muted-foreground,#64748b)}</style>${d>0?`<div><div class="s">${String(d).padStart(2,'0')}</div><div class="l">Days</div></div><span class="sep">:</span>`:''}<div><div class="s">${String(h).padStart(2,'0')}</div><div class="l">Hrs</div></div><span class="sep">:</span><div><div class="s">${String(m).padStart(2,'0')}</div><div class="l">Min</div></div><span class="sep">:</span><div><div class="s">${String(s).padStart(2,'0')}</div><div class="l">Sec</div></div>`;
        this.setAttribute('role', 'timer'); this.setAttribute('aria-label', `${d} days, ${h} hours, ${m} minutes, ${s} seconds remaining`);
        if (t <= 0 && this._interval) { clearInterval(this._interval); this.dispatchEvent(new CustomEvent('ds0-complete', { bubbles: true })); }
    }
}
customElements.define('ds0-countdown-timer', DS0CountdownTimer);
export { DS0CountdownTimer };
