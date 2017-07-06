import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ColumnModel } from './models/column.model';
import { TaskModel } from '../tasks/models/task.model';

@Component({
	moduleId: module.id,
	selector: 'column',
	templateUrl: 'tmpl/column.html',
	styleUrls: ['styles/column.css']
})
export class ColumnComponent {
	@Input()
	column: ColumnModel;

	@Input()
	tasks: TaskModel[];

	@Input()
	highlightedIDs: string[] = [];

	@Output()
	removeBeacon: EventEmitter<ColumnModel> = new EventEmitter();

	@Output()
	removeTaskBeacon: EventEmitter<TaskModel> = new EventEmitter();

	@HostListener('dragstart', ['$event'])
	handleDragStart(event: DragEvent) {
		event.dataTransfer.setData('text', this.column.id);
	}
}
