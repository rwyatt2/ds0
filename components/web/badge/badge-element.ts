class DS0Badge extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { this.shadowRoot!.innerHTML = '<style>:host{display:inline-flex;}.badge{display:inline-flex;align-items:center;border-radius:9999px;padding:0.125rem 0.625rem;font-size:0.75rem;font-weight:500;font-family:inherit;}</style><span class="badge" part="badge"><slot></slot></span>'; }
}
customElements.define('ds0-badge', DS0Badge);
export { DS0Badge };
