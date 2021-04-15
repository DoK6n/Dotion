import { Draggable, Droppable, Hoverable } from '../components/common/type';
import { Component } from './../components/component';
declare type GConstructor<T = {}> = new (...args: any[]) => T;
declare type DraggableClass = GConstructor<Component & Draggable>;
export declare function EnableDragging<TBase extends DraggableClass>(Base: TBase): {
    new (...args: any[]): {
        attachTo(parent: HTMLElement, position?: InsertPosition | undefined): void;
        removeFrom(parent: HTMLElement): void;
        attach(component: Component, position?: InsertPosition | undefined): void;
        registerEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void;
        onDragStart(event: DragEvent): void;
        onDragEnd(event: DragEvent): void;
    };
} & TBase;
declare type DragHoverClass = GConstructor<Component & Hoverable>;
export declare function EnableHover<TBase extends DragHoverClass>(Base: TBase): {
    new (...args: any[]): {
        attachTo(parent: HTMLElement, position?: InsertPosition | undefined): void;
        removeFrom(parent: HTMLElement): void;
        attach(component: Component, position?: InsertPosition | undefined): void;
        registerEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void;
        onDragEnter(event: DragEvent): void;
        onDragLeave(event: DragEvent): void;
    };
} & TBase;
declare type DropTargetClass = GConstructor<Component & Droppable>;
export declare function EnableDrop<TBase extends DropTargetClass>(Base: TBase): {
    new (...args: any[]): {
        attachTo(parent: HTMLElement, position?: InsertPosition | undefined): void;
        removeFrom(parent: HTMLElement): void;
        attach(component: Component, position?: InsertPosition | undefined): void;
        registerEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any): void;
        onDragOver(event: DragEvent): void;
        onDrop(event: DragEvent): void;
    };
} & TBase;
export {};
