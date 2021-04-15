import { BaseComponent } from "../../component.js";

// ImageComponent: 사용자가 추가할 수 있는 문서중 하나의 타입으로, 이미지 노트 

export class ImageComponent extends BaseComponent<HTMLImageElement> {
  constructor(title: string, url: string) {
    super(`
    <section class="image">
      <div class="image_holder">
        <img class="image_thumbnail">
      </div>
      <h2 class="page-item_title image_title"></h2>
    </section>`)

    const imageElement = this.element.querySelector('.image_thumbnail')! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector('.image_title')! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}
