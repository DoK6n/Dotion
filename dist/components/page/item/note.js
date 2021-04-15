import { BaseComponent } from "./../../component.js";
export class NoteComponent extends BaseComponent {
    constructor(title, body) {
        super(`
    <section class="note">
      <h2 class="page-item_title note_title"></h2>
        <p class="note_body"></p>
    </section>`);
        const titleElement = this.element.querySelector('.note_title');
        titleElement.textContent = title;
        const bodyElement = this.element.querySelector('.note_body');
        bodyElement.textContent = body;
    }
}
//# sourceMappingURL=note.js.map