"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const kanban_routing_module_1 = require("./kanban-routing.module");
const common_module_1 = require("../common/common.module");
const kanban_route_component_1 = require("./kanban/kanban-route.component");
const kanban_component_1 = require("./kanban/kanban.component");
const kanban_service_1 = require("./kanban/services/kanban.service");
const tasks_service_1 = require("./tasks/services/tasks.service");
const columns_service_1 = require("./column/services/columns.service");
const column_component_1 = require("./column/column.component");
const task_component_1 = require("./tasks/task.component");
const kanban_update_task_component_1 = require("./kanban/kanban-update-task.component");
const kanban_root_component_1 = require("./kanban/kanban-root.component");
const kanban_update_column_component_1 = require("./kanban/kanban-update-column.component");
const search_component_1 = require("./search/search.component");
const colour_service_1 = require("./colour/services/colour.service");
let KanbanModule = class KanbanModule {
};
KanbanModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            common_module_1.CommonModule,
            kanban_routing_module_1.KanbanRoutingModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule
        ],
        declarations: [
            search_component_1.SearchComponent,
            kanban_root_component_1.KanbanRootComponent,
            kanban_update_task_component_1.KanbanUpdateTaskComponent,
            kanban_update_column_component_1.KanbanUpdateColumnComponent,
            task_component_1.TaskComponent,
            column_component_1.ColumnComponent,
            kanban_route_component_1.KanbanRouteComponent,
            kanban_component_1.KanbanComponent
        ],
        providers: [
            tasks_service_1.TasksService,
            columns_service_1.ColumnsService,
            kanban_service_1.KanbanService,
            colour_service_1.ColourService
        ]
    })
], KanbanModule);
exports.KanbanModule = KanbanModule;
