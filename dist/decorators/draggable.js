export function EnableDragging(Base) {
    return class DraggableItem extends Base {
        constructor(...args) {
            super(...args);
            this.registerEventListener('dragstart', (event) => {
                this.onDragStart(event);
                console.log('DragStart!');
            });
            this.registerEventListener('dragend', (event) => {
                this.onDragEnd(event);
                console.log('DragEnd!');
            });
        }
    };
}
export function EnableHover(Base) {
    return class DragHoverArea extends Base {
        constructor(...args) {
            super(...args);
            this.registerEventListener('dragenter', (event) => {
                event.preventDefault();
                this.onDragEnter(event);
                console.log('항목으로 진입');
            });
            this.registerEventListener('dragleave', (event) => {
                this.onDragLeave(event);
                console.log('항목에서 떠남');
            });
        }
    };
}
export function EnableDrop(Base) {
    return class DropArea extends Base {
        constructor(...args) {
            super(...args);
            this.registerEventListener('dragover', (event) => {
                event.preventDefault();
                this.onDragOver(event);
            });
            this.registerEventListener('drop', (event) => {
                event.preventDefault();
                this.onDrop(event);
            });
        }
    };
}
//# sourceMappingURL=draggable.js.map