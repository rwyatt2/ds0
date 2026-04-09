class DS0Carousel extends HTMLElement { static get observedAttributes(): string[] { return ['loop', 'auto-play']; } constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback(): void { this.render(); } attributeChangedCallback(): void { this.render(); } private render(): void { if (!this.shadowRoot) return; this.shadowRoot.innerHTML = `<style>:host{display:block;position:relative;overflow:hidden}</style><slot></slot>`; this.setAttribute('aria-roledescription', 'carousel'); } }
customElements.define('ds0-carousel', DS0Carousel);
export { DS0Carousel };
