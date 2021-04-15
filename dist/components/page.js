import { BaseComponent } from "./baseComponent";
export class PageComponent extends BaseComponent {
    constructor() {
        super();
        this.element = document.createElement('ul');
        this.element.setAttribute('class', 'page');
        this.element.textContent = 'THis is PageComponent';
    }
    attachTo(parent, position = 'afterbegin') {
        parent.insertAdjacentElement(position, this.element);
    }
}
//# sourceMappingURL=page.js.map