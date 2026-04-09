class DS0CodeBlock extends HTMLElement {
    static get observedAttributes(): string[] { return ['language', 'title', 'line-numbers']; }
    private _language = ''; private _title = ''; private _lineNumbers = false;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(n: string, _: string, v: string): void {
        if (n === 'language') this._language = v; else if (n === 'title') this._title = v; else if (n === 'line-numbers') this._lineNumbers = v !== null;
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        const code = this.textContent || '';
        const lines = code.split('\n');
        const lineHtml = lines.map((l, i) => `<span class="line">${this._lineNumbers ? `<span class="ln">${i + 1}</span>` : ''}${this.escapeHtml(l) || ' '}</span>`).join('');
        this.shadowRoot.innerHTML = `<style>:host{display:block}.wrap{border-radius:8px;overflow:hidden;background:#18181b;color:#fafafa;border:1px solid #27272a;font-family:monospace}.header{display:flex;justify-content:space-between;align-items:center;padding:8px 16px;border-bottom:1px solid #27272a;background:#09090b;font-size:12px;color:#a1a1aa}pre{margin:0;padding:16px;overflow-x:auto;font-size:14px}code{display:grid}.line{padding:0 4px}.ln{display:inline-block;width:32px;text-align:right;margin-right:16px;color:#3f3f46;user-select:none}.copy{background:none;border:none;color:#a1a1aa;cursor:pointer;padding:4px 8px;border-radius:4px;font-size:12px}.copy:hover{color:#fafafa;background:#27272a}</style><div class="wrap">${this._title || this._language ? `<div class="header"><span>${this._title || this._language}</span><button class="copy" aria-label="Copy code">Copy</button></div>` : ''}<pre role="region" aria-label="${this._language ? `Code block: ${this._language}` : 'Code block'}"><code>${lineHtml}</code></pre></div>`;
        this.shadowRoot.querySelector('.copy')?.addEventListener('click', () => { navigator.clipboard.writeText(code); const btn = this.shadowRoot!.querySelector('.copy')!; btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 2000); });
    }
    private escapeHtml(s: string): string { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
}
customElements.define('ds0-code-block', DS0CodeBlock);
export { DS0CodeBlock };
