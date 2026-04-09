class DS0KanbanBoard extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }); } connectedCallback() { this.render(); } private render() { this.shadowRoot!.innerHTML='<style>:host{display:flex;gap:16px;overflow-x:auto}</style><slot></slot>'; this.setAttribute('role','region'); this.setAttribute('aria-label','Kanban board'); } }
customElements.define('ds0-kanban-board', DS0KanbanBoard);
export { DS0KanbanBoard };
