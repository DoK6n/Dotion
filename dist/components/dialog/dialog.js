import { BaseComponent } from './../component.js';
export class InputDialog extends BaseComponent {
    constructor() {
        super(`
    <dialog class="dialog">
      <div class="dialog_container">
        <button class="close">&times;</button>
        <div id="dialog_body"></div>
        <button class="dialog_submit">ADD</button>
      </div>
    </dialog>
    `);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        const submitBtn = this.element.querySelector('.dialog_submit');
        submitBtn.onclick = () => {
            console.log('submitBtn!!');
            this.submitListener && this.submitListener();
        };
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
    addChild(child) {
        const body = this.element.querySelector('#dialog_body');
        child.attachTo(body);
    }
}
//# sourceMappingURL=dialog.js.map