// ErrorBoundary is a React-specific pattern; web component serves as fallback container
class DS0ErrorBoundary extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML='<style>:host{display:block}</style><slot></slot>'; } }
customElements.define('ds0-error-boundary', DS0ErrorBoundary);
export { DS0ErrorBoundary };
