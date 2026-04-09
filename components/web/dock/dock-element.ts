class DS0Dock extends HTMLElement {
  static get observedAttributes(): string[] { return ['variant', 'x', 'y']; }
  private _x = 20; private _y = 20; private _variant = 'default'; private _dragging = false; private _offsetX = 0; private _offsetY = 0;
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void { this.render(); this.setupDrag(); }
  attributeChangedCallback(n: string, _o: string, v: string): void {
    if (n === 'x') this._x = parseInt(v, 10) || 20;
    if (n === 'y') this._y = parseInt(v, 10) || 20;
    if (n === 'variant') this._variant = v;
    this.render();
  }
  private setupDrag(): void {
    const handle = this.shadowRoot?.querySelector('.handle');
    if (!handle) return;
    handle.addEventListener('mousedown', (e: Event) => {
      const me = e as MouseEvent; this._dragging = true; this._offsetX = me.clientX - this._x; this._offsetY = me.clientY - this._y;
      const onMove = (ev: MouseEvent) => { this._x = ev.clientX - this._offsetX; this._y = ev.clientY - this._offsetY; this.updatePosition(); };
      const onUp = () => { this._dragging = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
      document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
    });
  }
  private updatePosition(): void { this.style.left = `${this._x}px`; this.style.top = `${this._y}px`; }
  private render(): void {
    if (!this.shadowRoot) return;
    const bg = this._variant === 'glass' ? 'background: rgba(255,255,255,0.6); backdrop-filter: blur(16px);' : 'background: var(--ds0-color-background, #fff);';
    this.shadowRoot.innerHTML = `<style>:host { position: fixed; left: ${this._x}px; top: ${this._y}px; z-index: 50; border-radius: 0.5rem; border: 1px solid var(--ds0-color-border, #e5e7eb); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden; ${bg} } .handle { display: flex; align-items: center; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--ds0-color-border, #e5e7eb); cursor: grab; user-select: none; font-size: 0.75rem; color: var(--ds0-color-muted-foreground, #6b7280); } .content { padding: 0.75rem; }</style><div class="handle">Panel</div><div class="content"><slot></slot></div>`;
    this.setAttribute('role', 'dialog'); this.setAttribute('aria-label', 'Dock panel');
  }
}
customElements.define('ds0-dock', DS0Dock);
export { DS0Dock };
