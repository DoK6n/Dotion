// for decorator
import { Hoverable, Droppable } from './../common/type';
import { EnableDragging, EnableDrop, EnableHover } from '../../decorators/draggable.js';
import { Draggable } from '../common/type.js';

import { BaseComponent, Component } from './../component.js';

// 다른요소들을 함께 조립할 수 있다.
export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave';
// <T extends Component>: 어떤것이든 다 되지만 Component는 다 상속해야 됨
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

                                                      //  ↓  for decorator   ↓
interface SectionContainer extends Component, Composable, Draggable, Hoverable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  // SectionContainer에 한해서 발생하는 drag 이벤트를 들을 수 있는 이벤트 리스터를 등록할 수 있는 setOnDragStateListener
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

// for decorator
@EnableDragging
@EnableHover
export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  // PageItemComponent: PageComponent내부에 하나씩 추가될 아이템 컴포넌트 클래스 <li>
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    super(`
    <li draggable="true" class="page-item">
      <section class="page-item_body"></section>
      <div class="page-item_controls">
        <button class="close">&times;</button>
      </div>
    </li>
    `);
    // 이벤트가 많아질 경우 addEventListener 사용권장
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    // this.element.addEventListener('dragstart', (event: DragEvent) => {
    //   this.onDragStart(event);
    // });
    // this.element.addEventListener('dragend', (event: DragEvent) => {
    //   this.onDragEnd(event);
    // });
    // this.element.addEventListener('dragenter', (event: DragEvent) => {
    //   this.onDragEnter(event);
    // });
    // this.element.addEventListener('dragleave', (event: DragEvent) => {
    //   this.onDragLeave(event);
    // });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers('start');
    this.element.classList.add('lifted');
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers('stop');
    this.element.classList.remove('lifted');
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers('enter');
    this.element.classList.add('drop-area');
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers('leave');
    this.element.classList.remove('drop-area');
  }

  onDropped() {
    this.element.classList.remove('drop-area');
  }

  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  // child는 Component를 구현하는 어떤 클래스든 받을 수 있다.
  addChild(child: Component) {
    const container = this.element.querySelector('.page-item_body')! as HTMLElement;
    child.attachTo(container); //
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  // setOnDragStateListener는 콜백함수를 받는데, 이 콜백함수는 어떤 PageItem의 Component인지, state에 대해 전달을 약속
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }

  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}

// for decorator
@EnableDrop
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable, Droppable {
  // PageComponent: 사용자가 추가하는 문서를 담을수 있는 페이지 컨테이너 컴포넌트 클래스 <ul>
  private children = new Set<SectionContainer>();
  private dragTarget?: SectionContainer;
  private dropTarget?: SectionContainer;

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    // this.element.addEventListener('dragover', (event: DragEvent) => {
    //   this.onDragOver(event);
    // });
    // this.element.addEventListener('drop', (event: DragEvent) => {
    //   this.onDrop(event);
    // });
  }

  // onDragOver(event: DragEvent) {
  //   // event.preventDefault();
  // }

  // for decorator
  onDragOver(_: DragEvent): void {}
  
  onDrop(event: DragEvent) {
    // event.preventDefault();
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect();

      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
    }
    this.dropTarget.onDropped();
  }

  // PageComponent인 <ul>안에 PageItemComponent인 <li>안에 <section class="page-item_body">에 받은 <section>을 추가
  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      switch (state) {
        case 'start':
          this.dragTarget = target;
          this.updateSections('mute');
          break;
        case 'stop':
          this.dragTarget = undefined;
          this.updateSections('unmute');
          break;
        case 'enter':
          this.dropTarget = target;
          break;
        case 'leave':
          this.dropTarget = undefined;
          break;

        default:
          throw new Error(`unsupported state: ${state}`);
      }
    });
  }

  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}

/**
 * PageItemComponent는 자기 자신이 Drag 되거나 Drag된 요소가 들어오거나 나가면 리스터를 통해서 리스너를 등록한 사람에게 자기 자신의 상태를 알려줌
 * 그리고 부모 컴포넌트인 PageComponent는 PageItem을 만들때마다 리스너를 등록해준다.
 * 그래서 각각의 Item의 상태가 변화되면 콜백함수에서 알수 있다.
 */
