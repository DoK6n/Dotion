import { Draggable, Droppable, Hoverable } from '../components/common/type';
import { Component } from './../components/component';

type GConstructor<T = {}> = new (...args: any[]) => T;
type DraggableClass = GConstructor<Component & Draggable>;

/**
 * Base라는 클라스를 받아와서 이 클래스의 생성자를 감싸는 것을 해준다.
 * EnableDragging은 drag에 관련된 start와 end까지를 처리하는 함수이다.
 * 타입이 안전해야 하므로 DraggableClass만 가능하다.
 * DraggableClass는 Component이면서 Draggable하다.
 */

export function EnableDragging<TBase extends DraggableClass>(Base: TBase) {
  return class DraggableItem extends Base {
    constructor(...args: any[]) {
      super(...args);                                                   // 기존의 클래스의 생성자를 그대로 호출하고
      this.registerEventListener('dragstart', (event: DragEvent) => {   // drag가 start되면 onDragStart를,
        this.onDragStart(event);
        console.log('DragStart!');
        
      });
      this.registerEventListener('dragend', (event: DragEvent) => {     // drag가 end가 되면 onDagEnd라는 이벤트를 호출해준다.
        this.onDragEnd(event);
        console.log('DragEnd!');
      });
    }
  };
}

type DragHoverClass = GConstructor<Component & Hoverable>;

export function EnableHover<TBase extends DragHoverClass>(Base: TBase) {
  return class DragHoverArea extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener('dragenter', (event: DragEvent) => {
        event.preventDefault();
        this.onDragEnter(event);
        console.log('항목으로 진입');
        
      });
      this.registerEventListener('dragleave', (event: DragEvent) => {
        this.onDragLeave(event);
        console.log('항목에서 떠남');
        
      });
    }
  };
}

type DropTargetClass = GConstructor<Component & Droppable>;

export function EnableDrop<TBase extends DropTargetClass>(Base: TBase) {
  return class DropArea extends Base {
    constructor(...args: any[]) {
      super(...args);
      this.registerEventListener('dragover', (event: DragEvent) => {
        event.preventDefault();
        this.onDragOver(event);
      });
      this.registerEventListener('drop', (event: DragEvent) => {
        event.preventDefault();
        this.onDrop(event);
      });
    }
  };
}