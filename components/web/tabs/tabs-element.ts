/**
 * DS0 Tabs Web Component.
 * Framework-agnostic custom element wrapping Tabs behavior.
 *
 * @example
 * ```html
 * <ds0-tabs default-value="tab1">
 *   <ds0-tabs-list>
 *     <ds0-tabs-trigger value="tab1">Tab 1</ds0-tabs-trigger>
 *     <ds0-tabs-trigger value="tab2">Tab 2</ds0-tabs-trigger>
 *   </ds0-tabs-list>
 *   <ds0-tabs-content value="tab1">Content 1</ds0-tabs-content>
 *   <ds0-tabs-content value="tab2">Content 2</ds0-tabs-content>
 * </ds0-tabs>
 * ```
 *
 * @see {@link https://ds0.systems/docs/components/tabs | Documentation}
 */
class DS0Tabs extends HTMLElement {
    static get observedAttributes(): string[] {
        return ['default-value', 'orientation', 'activation-mode'];
    }

    private _activeValue: string = '';
    private _orientation: string = 'horizontal';
    private _activationMode: string = 'automatic';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(): void {
        this._activeValue = this.getAttribute('default-value') ?? '';
        this.render();
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
        switch (name) {
            case 'default-value':
                this._activeValue = newValue;
                break;
            case 'orientation':
                this._orientation = newValue;
                break;
            case 'activation-mode':
                this._activationMode = newValue;
                break;
        }
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
            </style>
            <slot></slot>
        `;

        this.setAttribute('data-orientation', this._orientation);
    }
}

customElements.define('ds0-tabs', DS0Tabs);

export { DS0Tabs };
