import { BaseComponent } from "../../component.js";
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super(`
    <section class="image">
      <div class="image_holder">
        <img class="image_thumbnail">
      </div>
      <h2 class="page-item_title image_title"></h2>
    </section>`);
        const imageElement = this.element.querySelector('.image_thumbnail');
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = this.element.querySelector('.image_title');
        titleElement.textContent = title;
    }
}
//# sourceMappingURL=image.js.map