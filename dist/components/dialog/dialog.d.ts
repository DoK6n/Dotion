import { Composable } from './../page/page.js';
import { BaseComponent, Component } from './../component.js';
declare type OnCloseListener = () => void;
declare type OnSubmitListener = () => void;
export interface MediaData {
    readonly title: string;
    readonly url: string;
}
export interface TextData {
    readonly title: string;
    readonly body: string;
}
export declare class InputDialog extends BaseComponent<HTMLElement> implements Composable {
    closeListener?: OnCloseListener;
    submitListener?: OnSubmitListener;
    constructor();
    setOnCloseListener(listener: OnCloseListener): void;
    setOnSubmitListener(listener: OnSubmitListener): void;
    addChild(child: Component): void;
}
export {};
