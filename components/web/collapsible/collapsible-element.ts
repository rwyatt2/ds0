/**
 * DS0 Collapsible Web Component.
 * Framework-agnostic custom element for expandable/collapsible content.
 *
 * @example
 * ```html
 * <ds0-collapsible>
 *   <button slot="trigger">Toggle</button>
 *   <div slot="content">Hidden content</div>
 * </ds0-collapsible>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/collapsible | Documentation}
 */
class DS0Collapsible extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['open'];
    }

    private _open = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this.render();
        this.addEventListeners();
    }

    disconnectedCallback(): void {
        this.removeEventListeners();
    }

    attributeChangedCallback(
        name: string,
        _oldValue: string | null,
        newValue: string | null,
    ): void {
        if (name === 'open') {
            this._open = newValue !== null;
            this.render();
        }
    }

    private addEventListeners(): void {
        this.shadowRoot?.addEventListener('click', this.handleTriggerClick);
    }

    private removeEventListeners(): void {
        this.shadowRoot?.removeEventListener('click', this.handleTriggerClick);
    }

    private handleTriggerClick = (event: Event): void => {
        const target = event.target as HTMLElement;
        if (target.closest('[slot="trigger"]') || target.closest('.trigger-slot')) {
            this._open = !this._open;
            this.render();
            this.dispatchEvent(
                new CustomEvent('ds0-toggle', {
                    bubbles: true,
                    composed: true,
                    detail: { open: this._open },
                }),
            );
        }
    };

    private render(): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .content {
          overflow: hidden;
          transition: max-height 200ms ease-in-out, opacity 200ms ease-in-out;
        }

        .content[hidden] {
          display: none;
        }
      </style>
      <div part="trigger" class="trigger-slot">
        <slot name="trigger"></slot>
      </div>
      <div part="content" class="content" role="region" ${!this._open ? 'hidden' : ''}>
        <slot name="content"></slot>
      </div>
    `;

        const triggerSlot = this.shadowRoot.querySelector('.trigger-slot');
        if (triggerSlot) {
            triggerSlot.setAttribute('aria-expanded', String(this._open));
        }

        this.setAttribute('data-state', this._open ? 'open' : 'closed');
    }
}

customElements.define('ds0-collapsible', DS0Collapsible);

export { DS0Collapsible };
