import { Component } from './components/component.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new(): T;
}

// App: 어플리케이션 전체를 가지고 있는 최상위 컨테이너 클래스
class App {
  private readonly page: PageComponent & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    // appRoot: header 와 footer 사이의 main 태그
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    
    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
      );
      // 'https://picsum.photos/600/300'

    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
      );
      // 'https://youtu.be/E9_foa4z1iQ'

    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
      );
      
    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
      );

    // demo
    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/E9_foa4z1iQ'));
    this.page.addChild(new NoteComponent('Note Title', '타입스크립트 강의 실전 프로젝트'));
    this.page.addChild(new TodoComponent('Todo Title', '공부하자'));
    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/700/350'));
    this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
    this.page.addChild(new NoteComponent('Note Title', '타입스크립트 강의 실전 프로젝트'));
    this.page.addChild(new TodoComponent('Todo Title', '취업하자'));

  }
  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string, 
    InputComponent:InputComponentConstructor<T>,
    makeSection: (input: T) => Component,
    ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const inputSection = new InputComponent();
      dialog.addChild(inputSection);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const component = makeSection(inputSection);
        this.page.addChild(component);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }

}

new App(document.querySelector('.document')! as HTMLElement, document.body);

//  https://www.youtube.com/watch?v=E9_foa4z1iQ
//  https://youtu.be/E9_foa4z1iQ
