export interface RawColumnModel {
	title?: string;

	description?: string;

	id?: string;
}

export class ColumnModel {
	public title: string;

	public id: string;

	public description: string;

	constructor({ title = 'New Column', id, description }: RawColumnModel = {}) {
		this.title = title;
		this.id = id;
		this.description = description;
	}
}
