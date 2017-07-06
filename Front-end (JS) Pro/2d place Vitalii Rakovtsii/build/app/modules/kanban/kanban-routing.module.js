"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const kanban_route_component_1 = require("./kanban/kanban-route.component");
const kanban_update_task_component_1 = require("./kanban/kanban-update-task.component");
const kanban_root_component_1 = require("./kanban/kanban-root.component");
const kanban_update_column_component_1 = require("./kanban/kanban-update-column.component");
const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: kanban_root_component_1.KanbanRootComponent,
        children: [
            {
                path: '',
                component: kanban_route_component_1.KanbanRouteComponent
            },
            {
                path: 'add-task',
                component: kanban_update_task_component_1.KanbanUpdateTaskComponent,
                outlet: 'overlay'
            },
            {
                path: 'update-task/:id',
                component: kanban_update_task_component_1.KanbanUpdateTaskComponent,
                outlet: 'overlay'
            },
            {
                path: 'add-column',
                component: kanban_update_column_component_1.KanbanUpdateColumnComponent,
                outlet: 'overlay'
            },
            {
                path: 'update-column/:id',
                component: kanban_update_column_component_1.KanbanUpdateColumnComponent,
                outlet: 'overlay'
            }
        ]
    }
];
let KanbanRoutingModule = class KanbanRoutingModule {
};
KanbanRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(routes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], KanbanRoutingModule);
exports.KanbanRoutingModule = KanbanRoutingModule;
