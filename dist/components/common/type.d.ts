export interface Draggable {
    onDragStart(event: DragEvent): void;
    onDragEnd(event: DragEvent): void;
}
export interface Hoverable {
    onDragEnter(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
}
export interface Droppable {
    onDragOver(event: DragEvent): void;
    onDrop(event: DragEvent): void;
}
