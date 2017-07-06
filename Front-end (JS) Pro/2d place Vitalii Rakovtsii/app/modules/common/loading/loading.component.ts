import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: '[loading]',
	templateUrl: 'tmpl/loading.html',
	styleUrls: ['styles/loading.css']
})
export class LoadingComponent {
	@Input()
	loaded: boolean = false;

}
