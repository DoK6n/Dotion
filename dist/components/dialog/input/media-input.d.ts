import { BaseComponent } from '../../component.js';
import { MediaData } from '../dialog.js';
export declare class MediaSectionInput extends BaseComponent<HTMLElement> implements MediaData {
    constructor();
    get title(): string;
    get url(): string;
}
