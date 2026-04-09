class DS0AvatarGroup extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.shadowRoot!.innerHTML='<style>:host{display:flex;align-items:center}::slotted(*){margin-left:-8px;border:2px solid white;border-radius:50%}</style><slot></slot>'; this.setAttribute('role','group'); } }
customElements.define('ds0-avatar-group', DS0AvatarGroup);
export { DS0AvatarGroup };
