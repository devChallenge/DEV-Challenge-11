import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { RouterModule } from '@angular/router';
import { RootComponent } from './root/root.component';
import { DroppableDirective } from './drag-and-drop/droppable.directive';
import { DraggableDirective } from './drag-and-drop/draggable.directive';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule
	],

	declarations: [
		DroppableDirective,
		DraggableDirective,
		LoadingComponent,
		RootComponent
	],

	providers: [
	],

	exports: [
		DroppableDirective,
		DraggableDirective,
		LoadingComponent,
		RootComponent
	]
})
export class CommonModule {
}
