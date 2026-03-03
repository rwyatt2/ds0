class DS0IconButton extends HTMLElement {
    static get observedAttributes() { return ['variant', 'size', 'disabled', 'loading', 'label']; }
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { this.render(); }
    private render() {
        if (!this.shadowRoot) return;
        const label = this.getAttribute('label') ?? '';
        this.shadowRoot.innerHTML = `<style>:host{display:inline-flex;}button{border:none;background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;border-radius:0.375rem;width:2.5rem;height:2.5rem;}</style><button aria-label="${label}" part="button"><slot></slot></button>`;
    }
}
customElements.define('ds0-icon-button', DS0IconButton);
export { DS0IconButton };
