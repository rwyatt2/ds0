class DS0SplitterGroup extends HTMLElement {
  static get observedAttributes(): string[] { return ['direction']; }
  private _direction = 'horizontal';
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void { this.render(); }
  attributeChangedCallback(name: string, _old: string, val: string): void {
    if (name === 'direction') this._direction = val;
    this.render();
  }
  private render(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: ${this._direction === 'vertical' ? 'column' : 'row'}; width: 100%; height: 100%; }
      </style>
      <slot></slot>
    `;
    this.setAttribute('role', 'group');
  }
}

class DS0SplitterHandle extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void {
    this.setAttribute('role', 'separator');
    this.setAttribute('tabindex', '0');
    this.shadowRoot!.innerHTML = `
      <style>
        :host { flex-shrink: 0; width: 4px; background: var(--ds0-color-border, #e5e7eb); cursor: col-resize; transition: background 0.2s; }
        :host(:hover), :host(:focus-visible) { background: var(--ds0-color-primary, #171717); opacity: 0.3; }
      </style>
    `;
  }
}

customElements.define('ds0-splitter-group', DS0SplitterGroup);
customElements.define('ds0-splitter-handle', DS0SplitterHandle);
export { DS0SplitterGroup, DS0SplitterHandle };
