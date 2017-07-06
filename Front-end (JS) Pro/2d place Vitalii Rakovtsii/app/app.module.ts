import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RootComponent } from './root/root.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from './modules/common/common.module';
import { KanbanModule } from './modules/kanban/kanban.module';

@NgModule({
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		CommonModule,
		KanbanModule
	],

	declarations: [
		RootComponent
	],

	bootstrap: [
		RootComponent
	]
})
export class AppModule {
}
