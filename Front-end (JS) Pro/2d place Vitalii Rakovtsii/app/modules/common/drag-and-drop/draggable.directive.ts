import {
	Directive, HostListener, Inject, ViewContainerRef
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
	selector: '[draggable]'
})
export class DraggableDirective {
	constructor(
		@Inject(DOCUMENT)
		private document: Document,
		public vcRef: ViewContainerRef
	) {
	}

	@HostListener('dragstart', ['$event'])
	handleDragStart(event: DragEvent) {
	}
}
