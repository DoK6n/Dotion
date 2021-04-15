export interface Draggable {
  // 드래그 시작시 실행
  onDragStart(event: DragEvent): void;
  // 드래그 완료시 실행
  onDragEnd(event: DragEvent): void;
}

export interface Hoverable {
  // 드래그한 아이템이 해당 영역에 들어올 때 알림
  onDragEnter(event: DragEvent): void;
  // 드래그한 아이템이 영역을 벗어날 때 알림
  onDragLeave(event: DragEvent): void;
}

export interface Droppable {
  // 드래그한 항목이 위치를 변경하고자 하는 항목 위에 있을 때 발생하는 작업을 처리
  onDragOver(event: DragEvent): void;
  // 드래그한 항목의 드롭을 처리
  onDrop(event: DragEvent): void;
}