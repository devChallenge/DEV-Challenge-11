import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanRouteComponent } from './kanban/kanban-route.component';
import { KanbanUpdateTaskComponent } from './kanban/kanban-update-task.component';
import { KanbanRootComponent } from './kanban/kanban-root.component';
import { KanbanUpdateColumnComponent } from './kanban/kanban-update-column.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'home',
		component: KanbanRootComponent,
		children: [
			{
				path: '',
				component: KanbanRouteComponent
			},
			{
				path: 'add-task',
				component: KanbanUpdateTaskComponent,
				outlet: 'overlay'
			},
			{
				path: 'update-task/:id',
				component: KanbanUpdateTaskComponent,
				outlet: 'overlay'
			},
			{
				path: 'add-column',
				component: KanbanUpdateColumnComponent,
				outlet: 'overlay'
			},
			{
				path: 'update-column/:id',
				component: KanbanUpdateColumnComponent,
				outlet: 'overlay'
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class KanbanRoutingModule {
}
