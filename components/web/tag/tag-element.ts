class DS0Tag extends HTMLElement {
    static get observedAttributes(): string[] { return ['variant', 'size', 'removable', 'disabled']; }
    private _variant = 'default'; private _size = 'md'; private _removable = false; private _disabled = false;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _old: string | null, val: string | null): void {
        switch (name) {
            case 'variant': this._variant = val ?? 'default'; break;
            case 'size': this._size = val ?? 'md'; break;
            case 'removable': this._removable = val !== null; break;
            case 'disabled': this._disabled = val !== null; break;
        }
        this.render();
    }
    private getVariantStyles(): string {
        const v: Record<string, string> = {
            default: 'background:var(--ds0-color-secondary,#f1f5f9);color:var(--ds0-color-secondary-foreground,#0f172a);',
            primary: 'background:var(--ds0-color-primary,#2563eb);color:var(--ds0-color-primary-foreground,#fff);',
            destructive: 'background:var(--ds0-color-destructive,#dc2626);color:var(--ds0-color-destructive-foreground,#fff);',
            outline: 'background:var(--ds0-color-background,#fff);border:1px solid var(--ds0-color-border,#e2e8f0);',
        };
        return v[this._variant] ?? v['default']!;
    }
    private getSizeStyles(): string {
        const s: Record<string, string> = {
            sm: 'height:1.5rem;padding:0 0.5rem;font-size:0.75rem;',
            md: 'height:1.75rem;padding:0 0.625rem;font-size:0.75rem;',
            lg: 'height:2rem;padding:0 0.75rem;font-size:0.875rem;',
        };
        return s[this._size] ?? s['md']!;
    }
    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `<style>:host{display:inline-flex;}.tag{display:inline-flex;align-items:center;border-radius:var(--ds0-radius-md,0.375rem);font-weight:500;gap:0.25rem;${this.getVariantStyles()}${this.getSizeStyles()}${this._disabled?'opacity:0.5;pointer-events:none;':''}}.remove{background:none;border:none;cursor:pointer;padding:0;color:inherit;opacity:0.7;line-height:1;}.remove:hover{opacity:1;}</style><span class="tag" part="tag"><slot></slot>${this._removable?'<button class="remove" part="remove" aria-label="Remove">×</button>':''}</span>`;
        this.shadowRoot.querySelector('.remove')?.addEventListener('click', () => {
            if (!this._disabled) this.dispatchEvent(new CustomEvent('ds0-remove', { bubbles: true, composed: true }));
        });
    }
}
customElements.define('ds0-tag', DS0Tag);
export { DS0Tag };
