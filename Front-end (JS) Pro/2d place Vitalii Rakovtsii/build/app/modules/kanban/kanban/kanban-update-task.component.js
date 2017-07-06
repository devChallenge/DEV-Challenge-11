"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const tasks_service_1 = require("../tasks/services/tasks.service");
const router_1 = require("@angular/router");
const columns_service_1 = require("../column/services/columns.service");
const kanban_service_1 = require("./services/kanban.service");
const colour_enum_1 = require("../colour/colour.enum");
let KanbanUpdateTaskComponent = class KanbanUpdateTaskComponent {
    constructor(tasksService, kanbanService, columnsService, route) {
        this.tasksService = tasksService;
        this.kanbanService = kanbanService;
        this.columnsService = columnsService;
        this.route = route;
        this.colours = Array.from(colour_enum_1.ColourNameMap);
        Promise
            .all([
            this.tasksService.getList(),
            this.columnsService.getList()
        ])
            .then(([tasks, columns]) => {
            this.columns = columns;
            route.params.subscribe((params) => {
                let id = params['id'];
                if (id) {
                    tasksService.get(id)
                        .then((task) => this.task = task);
                }
                else {
                    let task = tasksService.createInstance();
                    kanbanService.ensureTaskHasColumn([task], columns);
                    kanbanService.generateTaskID(task);
                    tasksService.add(task);
                    this.task = task;
                }
            });
        });
    }
    ngOnDestroy() {
        this.tasksService.save();
    }
};
KanbanUpdateTaskComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'kanban-update',
        templateUrl: 'tmpl/kanban-update-task.html',
        styleUrls: ['styles/kanban-update-task.css']
    }),
    tslib_1.__metadata("design:paramtypes", [tasks_service_1.TasksService,
        kanban_service_1.KanbanService,
        columns_service_1.ColumnsService,
        router_1.ActivatedRoute])
], KanbanUpdateTaskComponent);
exports.KanbanUpdateTaskComponent = KanbanUpdateTaskComponent;
