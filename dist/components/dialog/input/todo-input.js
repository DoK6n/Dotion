import { BaseComponent } from '../../component.js';
export class TodoSectionInput extends BaseComponent {
    constructor() {
        super(`
    <div>
      <div class="form_container">
        <label for="title">Title</label>
        <input type="text" id="title">
      </div>
      <div class="form_container">
        <label for="url">Body</label>
        <textarea type="text" row="3" id="item"></textarea>
      </div>
    </div>
    `);
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    get item() {
        const element = this.element.querySelector('#item');
        return element.value;
    }
}
//# sourceMappingURL=todo-input.js.map