class DS0ChatBubble extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML='<style>:host{display:flex;flex-direction:column;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}</style><slot></slot>'; this.setAttribute('role','log'); } }
customElements.define('ds0-chat-bubble', DS0ChatBubble);
export { DS0ChatBubble };
