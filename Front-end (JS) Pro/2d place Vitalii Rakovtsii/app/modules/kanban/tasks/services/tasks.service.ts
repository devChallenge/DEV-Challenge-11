import { Injectable } from '@angular/core';
import { AbstractDataService } from '../../../common/services/abstract-data.service';
import { TaskModel, RawTaskModel } from '../models/task.model';

@Injectable()
export class TasksService extends AbstractDataService<TaskModel, RawTaskModel> {

	createInstance(data: any = {}): TaskModel {
		return new TaskModel(data);
	}

	get(id: string): Promise<TaskModel> {
		return this.getList()
			.then((tasks) => {
				let task = tasks.find((task) => task.id === id);

				if (task) {
					return task;
				}

				throw new Error('task not found');
			});
	}

	save(): Promise<TaskModel[]> {
		localStorage.setItem('tasks', JSON.stringify(this.cache));

		return Promise.resolve(this.cache);
	}

	sync(): Promise<RawTaskModel[]> {
		let tasks: RawTaskModel[] = [];
		let json = localStorage.getItem('tasks');

		try {
			if (json) {
				tasks = JSON.parse(json);
			}
		} catch (e) {
			// empty
		}

		return Promise.resolve(tasks);
	}
}
