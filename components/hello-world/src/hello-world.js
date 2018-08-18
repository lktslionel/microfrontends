class HelloWorld extends HTMLElement {
    constructor() {
        super();

        const shadowRootEl = this.attachShadow({mode: 'open'});
        shadowRootEl.innerHTML = `<div class="status">Hello World</div>`;

        if (!this.hasAttribute('mytext')) {
            this.updateContent("hey I'm the default text");
        }
    }

    static get observedAttributes() {
        return ['mytext'];
    }

    connectedCallback() {
        let _this = this;

        this.shadowRoot.querySelector('.status').addEventListener('click', function () {
            _this.dispatchEvent(new CustomEvent("customEvent", {
                bubbles: true,
                cancelable: false,
            }));
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) {
            return
        }

        if (name === 'mytext') {
            this.updateContent(newValue)
        }
    }

    updateContent(newContent) {
        this.shadowRoot.querySelector('.status').innerHTML = newContent
    }
}

window.customElements.define('hello-world', HelloWorld);
