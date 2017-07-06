import { Colour, ColourMap } from '../../colour/colour.enum';
import marked = require('marked');

export interface RawTaskModel {
	id?: string;

	title?: string;

	description?: string;

	columnID?: string;

	colour?: Colour;
}

export class TaskModel {
	public id: string;

	public title: string;

	public description: string;

	public get descriptionMD(): string {
		return marked(this.description);
	}

	public columnID: string;

	public colour: Colour;

	public get colourRGB(): string {
		return ColourMap.get(+this.colour);
	}

	constructor({ id, title = 'New Task', description = '', columnID, colour = Colour.NONE }: RawTaskModel = {}) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.columnID = columnID;
		this.colour = colour;
	}
}
