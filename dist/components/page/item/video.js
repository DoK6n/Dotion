import { BaseComponent } from './../../component.js';
export class VideoComponent extends BaseComponent {
    constructor(title, url) {
        super(`
    <section class="video">
      <div class="video_player">
      <iframe class="video_iframe"></iframe>
      </div>
      <h3 class="page-item_title video_title"></h3>
    </section>`);
        const iframe = this.element.querySelector('.video_iframe');
        iframe.src = this.convertToEmbeddedURL(url);
        const titleElement = this.element.querySelector('.video_title');
        titleElement.textContent = title;
    }
    convertToEmbeddedURL(url) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9(-|_)]{11}))|(?:youtu.be\/([a-zA-Z0-9(-|_)]{11})))/;
        const match = url.match(regExp);
        const videoId = match ? match[1] || match[2] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}
//# sourceMappingURL=video.js.map