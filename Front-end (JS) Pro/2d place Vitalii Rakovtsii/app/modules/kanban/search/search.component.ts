import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../tasks/models/task.model';
import { ColourService } from '../colour/services/colour.service';
import { Colour } from '../colour/colour.enum';

@Component({
	moduleId: module.id,
	selector: 'search',
	templateUrl: 'tmpl/search.html',
	styleUrls: ['styles/search.css']
})
export class SearchComponent {
	tasks: TaskModel[] = [];

	@Input()
	searchColour: Colour = Colour.DISABLE;

	@Output()
	changeSearchCriteriaBeacon: EventEmitter<string> = new EventEmitter();

	@Output()
	changeSearchColourBeacon: EventEmitter<Colour> = new EventEmitter();

	constructor(public colourService: ColourService) {}
}
