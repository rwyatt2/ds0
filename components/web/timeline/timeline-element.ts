class DS0Timeline extends HTMLElement {
    static get observedAttributes(): string[] { return ['variant', 'size', 'orientation']; }
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback(): void { this.render(); }
    attributeChangedCallback(): void { this.render(); }
    private render(): void { if (!this.shadowRoot) return; this.shadowRoot.innerHTML = `<style>:host { display: flex; flex-direction: column; gap: 16px; }</style><slot></slot>`; this.setAttribute('role', 'list'); this.setAttribute('aria-label', 'Timeline'); }
}
customElements.define('ds0-timeline', DS0Timeline);
export { DS0Timeline };
