import { BaseComponent } from '../../component.js';
import { TextData } from '../dialog.js';
export declare class TextSectionInput extends BaseComponent<HTMLElement> implements TextData {
    constructor();
    get title(): string;
    get body(): string;
}
