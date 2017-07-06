import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks/services/tasks.service';
import { TaskModel } from '../tasks/models/task.model';
import { KanbanService } from './services/kanban.service';
import { ColumnsService } from '../column/services/columns.service';
import { ColumnModel } from '../column/models/column.model';
import { Colour } from '../colour/colour.enum';

@Component({
	moduleId: module.id,
	selector: 'kanban',
	templateUrl: 'tmpl/kanban.html',
	styleUrls: ['styles/kanban.css']
})
export class KanbanComponent implements OnInit {
	tasks: TaskModel[] = [];

	columns: ColumnModel[] = [];

	searchCriteria: string = '';

	searchColour: Colour = Colour.DISABLE;

	constructor(
		public tasksService: TasksService,
		public columnsService: ColumnsService,
		public kanbanService: KanbanService
	) {
	}

	handleDrop(event: DragEvent, columnID: string): void {
		let id = event.dataTransfer.getData('text');

		this.tasksService.get(id)
			.then((task) => {
				task.columnID = columnID;

				return this.tasksService.save();
			})
			.catch(() => {
				/* oh well it wasn't task then */

				Promise.all([
						this.columnsService.get(id),
						this.columnsService.get(columnID)
					])
					.then(([columnA, columnB]) => this.columnsService.swap(columnA, columnB))
					.catch(() => { /* oh well it wasn't column then */ });
			});
	}

	handleSearchColourChange(x: any): void {
		this.searchColour = parseInt(x, 10);
	}

	ngOnInit(): void {

		Promise
			.all<TaskModel[], ColumnModel[]>([
				this.tasksService.getList(),
				this.columnsService.getList()
			])
			.then(([tasks, columns]) => {
				this.kanbanService.ensureTaskHasColumn(tasks, columns);

				this.tasks = tasks;
				this.columns = columns;
			});
	}
}
