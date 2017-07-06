import { Injectable } from '@angular/core';
import { AbstractDataService } from '../../../common/services/abstract-data.service';
import { ColumnModel, RawColumnModel } from '../models/column.model';

@Injectable()
export class ColumnsService extends AbstractDataService<ColumnModel, RawColumnModel> {

	createInstance(data: any = {}): ColumnModel {
		return new ColumnModel(data);
	}

	get(id: string): Promise<ColumnModel> {
		return this.getList()
			.then((columns) => {
				let column = columns.find((column) => column.id === id);

				if (column) {
					return column;
				}

				throw new Error('column not found');
			});
	}

	save(): Promise<ColumnModel[]> {
		localStorage.setItem('columns', JSON.stringify(this.cache));

		return Promise.resolve(this.cache);
	}

	sync(): Promise<RawColumnModel[]> {
		let columns: RawColumnModel[] = [];
		let json = localStorage.getItem('columns');

		try {
			if (json) {
				columns = JSON.parse(json);
			}
		} catch (e) {
			// empty
		}

		if (!localStorage.getItem('columns_default')) {
			localStorage.setItem('columns_default', 'done');

			columns = [
				{
					"title": "TODO",
					"id": "column44458078",
					"description": "where to start"
				},
				{
					"title": "In Progress",
					"id": "column87703758",
					"description": "very nice column"
				},
				{
					"title": "Done",
					"id": "column61191928",
					"description": "grab a beer now"
				}
			];

			localStorage.setItem('columns', JSON.stringify(columns));
		}

		return Promise.resolve(columns);
	}
}
