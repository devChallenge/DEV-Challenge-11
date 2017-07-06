import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { KanbanRoutingModule } from './kanban-routing.module';
import { CommonModule } from '../common/common.module';
import { KanbanRouteComponent } from './kanban/kanban-route.component';
import { KanbanComponent } from './kanban/kanban.component';
import { KanbanService } from './kanban/services/kanban.service';
import { TasksService } from './tasks/services/tasks.service';
import { ColumnsService } from './column/services/columns.service';
import { ColumnComponent } from './column/column.component';
import { TaskComponent } from './tasks/task.component';
import { KanbanUpdateTaskComponent } from './kanban/kanban-update-task.component';
import { KanbanRootComponent } from './kanban/kanban-root.component';
import { KanbanUpdateColumnComponent } from './kanban/kanban-update-column.component';
import { SearchComponent } from './search/search.component';
import { ColourService } from './colour/services/colour.service';

@NgModule({
	imports: [
		CommonModule,
		KanbanRoutingModule,
		BrowserModule,
		FormsModule
	],

	declarations: [
		SearchComponent,
		KanbanRootComponent,
		KanbanUpdateTaskComponent,
		KanbanUpdateColumnComponent,
		TaskComponent,
		ColumnComponent,
		KanbanRouteComponent,
		KanbanComponent
	],

	providers: [
		TasksService,
		ColumnsService,
		KanbanService,
		ColourService
	]
})
export class KanbanModule {
}
