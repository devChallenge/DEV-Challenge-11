import { Component, OnDestroy } from '@angular/core';
import { TaskModel } from '../tasks/models/task.model';
import { TasksService } from '../tasks/services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { ColumnsService } from '../column/services/columns.service';
import { ColumnModel } from '../column/models/column.model';
import { KanbanService } from './services/kanban.service';
import { ColourNameMap } from '../colour/colour.enum';

@Component({
	moduleId: module.id,
	selector: 'kanban-update',
	templateUrl: 'tmpl/kanban-update-task.html',
	styleUrls: ['styles/kanban-update-task.css']
})
export class KanbanUpdateTaskComponent implements OnDestroy {

	columns: ColumnModel[];

	task: TaskModel;

	colours = Array.from(ColourNameMap);

	constructor(
		public tasksService: TasksService,
		public kanbanService: KanbanService,
		public columnsService: ColumnsService,
		public route: ActivatedRoute) {

		Promise
			.all<TaskModel[], ColumnModel[]>([
				this.tasksService.getList(),
				this.columnsService.getList()
			])
			.then(([tasks, columns]) => {
				this.columns = columns;

				route.params.subscribe((params) => {
					let id = params['id'];

					if (id) {
						tasksService.get(id)
							.then((task) => this.task = task);
					} else {
						let task = tasksService.createInstance();

						kanbanService.ensureTaskHasColumn([task], columns);
						kanbanService.generateTaskID(task);

						tasksService.add(task);

						this.task = task;
					}
				});

			});
	}


	ngOnDestroy(): void {
		this.tasksService.save();
	}
}
