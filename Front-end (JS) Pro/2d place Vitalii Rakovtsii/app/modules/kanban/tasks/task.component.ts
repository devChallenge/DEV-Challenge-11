import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { TaskModel } from './models/task.model';
import { Colour } from "../colour/colour.enum";

@Component({
	moduleId: module.id,
	selector: 'task',
	templateUrl: 'tmpl/task.html',
	styleUrls: ['styles/task.css']
})
export class TaskComponent {
	@Input()
	task: TaskModel;

	@Output()
	removeBeacon: EventEmitter<TaskModel> = new EventEmitter();

	@HostBinding('style.backgroundColor')
	get colour(): string {
		return this.task.colourRGB;
	}

	@HostListener('dragstart', ['$event'])
	handleDragStart(event: DragEvent) {
		event.dataTransfer.setData('text', this.task.id);

		event.stopPropagation();
	}
}
