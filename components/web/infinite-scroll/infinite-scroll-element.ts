class DS0InfiniteScroll extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback(): void {
    this.shadowRoot!.innerHTML = `<style>:host { display: block; } .sentinel { height: 1px; width: 100%; }</style><slot></slot><div class="sentinel"></div>`;
    this.setAttribute('role', 'feed');
    const sentinel = this.shadowRoot!.querySelector('.sentinel');
    if (sentinel) {
      new IntersectionObserver((entries) => { const entry = entries[0]; if (entry && entry.isIntersecting) this.dispatchEvent(new CustomEvent('ds0-load-more')); }).observe(sentinel);
    }
  }
}
customElements.define('ds0-infinite-scroll', DS0InfiniteScroll);
export { DS0InfiniteScroll };
