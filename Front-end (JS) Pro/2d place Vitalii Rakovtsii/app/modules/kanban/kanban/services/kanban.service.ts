import { EventEmitter, Injectable } from '@angular/core';
import { TaskModel } from '../../tasks/models/task.model';
import { ColumnModel } from '../../column/models/column.model';
import { Colour } from '../../colour/colour.enum';

@Injectable()
export class KanbanService {

	ensureTaskHasColumn(tasks: TaskModel[], columns: ColumnModel[]): void {
		if (!columns.length) {
			return;
		}

		let columnIDs = columns.map((column) => column.id);
		let baseColumnID = columnIDs[0];

		tasks.forEach((task) => {
			if (columnIDs.indexOf(task.columnID) === -1) {
				task.columnID = baseColumnID;
			}
		});
	}

	filterTasks(tasks: TaskModel[], columnID: string, searchColour: Colour): TaskModel[] {
		return tasks
			.filter((task) => {
				if (searchColour === Colour.DISABLE) {
					return task.columnID === columnID;
				}

				return parseInt(task.colour as any, 10) === searchColour && task.columnID === columnID;
			});
	}

	filterIDsBySearchCriteria(tasks: TaskModel[], searchCriteria: string): string[] {
		let ciSearchCriteria = searchCriteria.toLowerCase();

		return tasks.filter((task) => task.title.toLowerCase().indexOf(ciSearchCriteria) > -1)
			.map((task) => task.id);
	}

	generateTaskID(task: TaskModel): void {
		task.id = `task${Math.floor(Math.random() * 100000000)}`;
	}

	generateColumnID(column: ColumnModel): void {
		column.id = `column${Math.floor(Math.random() * 100000000)}`;
	}
}
