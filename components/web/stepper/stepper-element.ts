class DS0Stepper extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['variant', 'size', 'orientation', 'active-step'];
    }
    private _variant = 'default';
    private _size = 'md';
    private _orientation = 'horizontal';
    private _activeStep = 0;
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(name: string, _: string, val: string): void {
        if (name === 'variant') this._variant = val;
        else if (name === 'size') this._size = val;
        else if (name === 'orientation') this._orientation = val;
        else if (name === 'active-step') this._activeStep = parseInt(val, 10) || 0;
        this.render();
    }
    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: flex; gap: 8px; align-items: center; flex-direction: ${this._orientation === 'vertical' ? 'column' : 'row'}; }
            </style>
            <slot></slot>
        `;
        this.setAttribute('role', 'tablist');
        this.setAttribute('aria-orientation', this._orientation);
    }
}
customElements.define('ds0-stepper', DS0Stepper);
export { DS0Stepper };
