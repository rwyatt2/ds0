class DS0Confetti extends HTMLElement {
    static get observedAttributes(): string[] { return ['active', 'count', 'duration']; }
    private _active = false; private _count = 80; private _duration = 3000; private _timeout: ReturnType<typeof setTimeout> | null = null;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    disconnectedCallback(): void { if (this._timeout) clearTimeout(this._timeout); }
    attributeChangedCallback(n: string, _: string, v: string): void {
        if (n === 'active') this._active = v !== null && v !== 'false';
        else if (n === 'count') this._count = parseInt(v) || 80;
        else if (n === 'duration') this._duration = parseInt(v) || 3000;
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        if (!this._active) { this.shadowRoot.innerHTML = ''; this.style.display = 'none'; return; }
        this.style.display = 'block';
        const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
        let pieces = '';
        for (let i = 0; i < this._count; i++) {
            const c = colors[i % colors.length];
            const l = 40 + Math.random() * 20;
            const d = Math.random() * 0.8;
            const dur = 2 + Math.random() * 1.5;
            const xe = (Math.random() - 0.5) * 40;
            const ye = 50 + Math.random() * 40;
            const r = Math.random() * 720 - 360;
            pieces += `<div class="p" style="left:${l}%;animation-delay:${d}s;animation-duration:${dur}s;--cx:${xe}vw;--cy:${ye}vh;--cr:${r}deg;background:${c}"></div>`;
        }
        this.shadowRoot.innerHTML = `<style>:host{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9999}.p{position:absolute;top:-2%;width:10px;height:6px;border-radius:2px;animation:fall var(--d,2s) cubic-bezier(0.25,0.46,0.45,0.94) var(--dl,0s) forwards}@keyframes fall{0%{transform:translate(0,0) rotate(0);opacity:1}100%{transform:translate(var(--cx),var(--cy)) rotate(var(--cr));opacity:0}}</style>${pieces}`;
        this.setAttribute('aria-hidden', 'true');
        if (this._timeout) clearTimeout(this._timeout);
        this._timeout = setTimeout(() => { this._active = false; this.render(); this.dispatchEvent(new CustomEvent('ds0-complete', { bubbles: true })); }, this._duration);
    }
}
customElements.define('ds0-confetti', DS0Confetti);
export { DS0Confetti };
