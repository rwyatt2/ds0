class DS0AspectRatio extends HTMLElement {
    static get observedAttributes(): string[] { return ['ratio']; }
    private _ratio = 1;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _old: string | null, val: string | null): void {
        if (name === 'ratio') this._ratio = Number(val ?? 1);
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; position: relative; width: 100%; }
        .wrapper { position: relative; width: 100%; padding-bottom: ${(1 / this._ratio) * 100}%; }
        .inner { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
      </style>
      <div class="wrapper"><div class="inner"><slot></slot></div></div>`;
    }
}
customElements.define('ds0-aspect-ratio', DS0AspectRatio);
export { DS0AspectRatio };
