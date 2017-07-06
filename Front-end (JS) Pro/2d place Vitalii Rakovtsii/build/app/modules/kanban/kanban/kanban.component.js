"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const tasks_service_1 = require("../tasks/services/tasks.service");
const kanban_service_1 = require("./services/kanban.service");
const columns_service_1 = require("../column/services/columns.service");
const colour_enum_1 = require("../colour/colour.enum");
let KanbanComponent = class KanbanComponent {
    constructor(tasksService, columnsService, kanbanService) {
        this.tasksService = tasksService;
        this.columnsService = columnsService;
        this.kanbanService = kanbanService;
        this.tasks = [];
        this.columns = [];
        this.searchCriteria = '';
        this.searchColour = colour_enum_1.Colour.DISABLE;
    }
    handleDrop(event, columnID) {
        let id = event.dataTransfer.getData('text');
        this.tasksService.get(id)
            .then((task) => {
            task.columnID = columnID;
            return this.tasksService.save();
        })
            .catch(() => {
            /* oh well it wasn't task then */
            Promise.all([
                this.columnsService.get(id),
                this.columnsService.get(columnID)
            ])
                .then(([columnA, columnB]) => this.columnsService.swap(columnA, columnB))
                .catch(() => { });
        });
    }
    handleSearchColourChange(x) {
        this.searchColour = parseInt(x, 10);
    }
    ngOnInit() {
        Promise
            .all([
            this.tasksService.getList(),
            this.columnsService.getList()
        ])
            .then(([tasks, columns]) => {
            this.kanbanService.ensureTaskHasColumn(tasks, columns);
            this.tasks = tasks;
            this.columns = columns;
        });
    }
};
KanbanComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'kanban',
        templateUrl: 'tmpl/kanban.html',
        styleUrls: ['styles/kanban.css']
    }),
    tslib_1.__metadata("design:paramtypes", [tasks_service_1.TasksService,
        columns_service_1.ColumnsService,
        kanban_service_1.KanbanService])
], KanbanComponent);
exports.KanbanComponent = KanbanComponent;
