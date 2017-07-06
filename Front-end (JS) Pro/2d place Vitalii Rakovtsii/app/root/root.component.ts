import { Component, HostBinding } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'root',
	templateUrl: 'tmpl/root.html',
	styleUrls: ['styles/root.css']
})
export class RootComponent {
	@HostBinding('class.loaded')
	public loaded = true;
}
