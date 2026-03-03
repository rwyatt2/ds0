class DS0Slider extends HTMLElement {
    static get observedAttributes(): string[] { return ['label', 'value', 'min', 'max', 'step', 'disabled', 'size']; }
    private _label = ''; private _value = 0; private _min = 0; private _max = 100; private _step = 1; private _disabled = false; private _size = 'md';

    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }

    attributeChangedCallback(name: string, _old: string | null, val: string | null): void {
        switch (name) {
            case 'label': this._label = val ?? ''; break;
            case 'value': this._value = Number(val ?? 0); break;
            case 'min': this._min = Number(val ?? 0); break;
            case 'max': this._max = Number(val ?? 100); break;
            case 'step': this._step = Number(val ?? 1); break;
            case 'disabled': this._disabled = val !== null; break;
            case 'size': this._size = val ?? 'md'; break;
        }
        this.render();
    }

    private get percentage(): number { return ((this._value - this._min) / (this._max - this._min)) * 100; }

    private getTrackHeight(): string {
        const h: Record<string, string> = { sm: '4px', md: '8px', lg: '12px' };
        return h[this._size] ?? '8px';
    }

    private getThumbSize(): string {
        const s: Record<string, string> = { sm: '16px', md: '20px', lg: '24px' };
        return s[this._size] ?? '20px';
    }

    private render(): void {
        if (!this.shadowRoot) return;
        const tSize = this.getThumbSize();
        this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .container { display: flex; flex-direction: column; gap: 0.5rem; }
        label { font-size: 0.875rem; font-weight: 500; font-family: inherit; }
        .track { position: relative; width: 100%; height: ${this.getTrackHeight()}; background: var(--ds0-color-secondary, #f1f5f9); border-radius: 9999px; cursor: pointer; }
        .range { position: absolute; height: 100%; background: var(--ds0-color-primary, #2563eb); border-radius: 9999px; width: ${this.percentage}%; }
        .thumb { position: absolute; top: 50%; left: ${this.percentage}%; transform: translate(-50%, -50%); width: ${tSize}; height: ${tSize}; border-radius: 50%; border: 2px solid var(--ds0-color-primary, #2563eb); background: var(--ds0-color-background, #fff); cursor: grab; }
        .thumb:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--ds0-color-background, #fff), 0 0 0 4px var(--ds0-color-ring, #3b82f6); }
        :host([disabled]) { opacity: 0.5; }
      </style>
      <div class="container">
        <label>${this._label}</label>
        <div class="track">
          <div class="range"></div>
          <div class="thumb" role="slider" tabindex="${this._disabled ? '-1' : '0'}" aria-valuemin="${this._min}" aria-valuemax="${this._max}" aria-valuenow="${this._value}" ${this._disabled ? 'aria-disabled="true"' : ''}></div>
        </div>
      </div>`;
    }
}
customElements.define('ds0-slider', DS0Slider);
export { DS0Slider };
