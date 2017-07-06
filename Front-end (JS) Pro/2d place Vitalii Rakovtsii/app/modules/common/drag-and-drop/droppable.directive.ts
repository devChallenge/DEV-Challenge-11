import { Directive, HostListener, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[droppable]'
})
export class DroppableDirective {
	constructor(
		public renderer: Renderer2,
		public vcRef: ViewContainerRef
	) {
	}

	@HostListener('drop', ['$event'])
	handleDrop(event: DragEvent): void {
		// event.stopPropagation();

		this.handleDragLeave();
	}

	@HostListener('dragenter')
	handleDragEnter(): void {
		this.renderer.addClass(this.vcRef.element.nativeElement, 'droppable');
	}

	@HostListener('dragexit')
	handleDragExit(): void {
		this.handleDragLeave();
	}

	@HostListener('dragleave')
	handleDragLeave(): void {
		this.renderer.removeClass(this.vcRef.element.nativeElement, 'droppable');
	}

	@HostListener('dragover', ['$event'])
	handleDragOver(event: DragEvent): void {
		event.dataTransfer.dropEffect = 'copy';

		event.preventDefault();

		this.handleDragEnter();
	}
}
