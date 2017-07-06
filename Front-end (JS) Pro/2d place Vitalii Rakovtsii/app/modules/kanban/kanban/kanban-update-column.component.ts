import { Component, OnDestroy } from '@angular/core';
import { TaskModel } from '../tasks/models/task.model';
import { TasksService } from '../tasks/services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { ColumnsService } from '../column/services/columns.service';
import { ColumnModel } from '../column/models/column.model';
import { KanbanService } from './services/kanban.service';

@Component({
	moduleId: module.id,
	selector: 'kanban-update-column',
	templateUrl: 'tmpl/kanban-update-column.html',
	styleUrls: ['styles/kanban-update-column.css']
})
export class KanbanUpdateColumnComponent implements OnDestroy {

	column: ColumnModel;

	constructor(
		public kanbanService: KanbanService,
		public columnsService: ColumnsService,
		public route: ActivatedRoute) {

		Promise
			.all<ColumnModel[]>([
				this.columnsService.getList()
			])
			.then(() => {

				route.params.subscribe((params) => {
					let id = params['id'];

					if (id) {
						columnsService.get(id)
							.then((column) => this.column = column);
					} else {
						let column = columnsService.createInstance();

						kanbanService.generateColumnID(column);

						columnsService.add(column);

						this.column = column;
					}
				});

			});
	}

	ngOnDestroy(): void {
		this.columnsService.save();
	}
}
