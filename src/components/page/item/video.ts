import { BaseComponent } from './../../component.js';
export class VideoComponent extends BaseComponent<HTMLDivElement> {
  constructor(title: string, url: string) {
    super(`
    <section class="video">
      <div class="video_player">
      <iframe class="video_iframe"></iframe>
      </div>
      <h3 class="page-item_title video_title"></h3>
    </section>`);
    
    const iframe = this.element.querySelector('.video_iframe')! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url);
    
    const titleElement = this.element.querySelector('.video_title')! as HTMLHeadingElement;
    titleElement.textContent = title;
    
  }
  // input 
  //  https://www.youtube.com/watch?v=E9_foa4z1iQ
  //  https://youtu.be/E9_foa4z1iQ
  // output
  //  https://www.youtube.com/embed/E9_foa4z1iQ
  // 정규표현식 Regex

  private convertToEmbeddedURL(url: string): string {
    const regExp =  /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9(-|_)]{11}))|(?:youtu.be\/([a-zA-Z0-9(-|_)]{11})))/;

    const match = url.match(regExp);
    // match(): 인자로 넘긴 정규표현식과 매칭되는 것이 있다면 배열로 리턴
    
    const videoId = match ? match[1] || match[2] : undefined;
    // 매칭된 것이 있다면 첫번째것, 없다면 두번째것 매칭없으면 undefined

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}