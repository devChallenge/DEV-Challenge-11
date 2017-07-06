"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const columns_service_1 = require("../column/services/columns.service");
const kanban_service_1 = require("./services/kanban.service");
let KanbanUpdateColumnComponent = class KanbanUpdateColumnComponent {
    constructor(kanbanService, columnsService, route) {
        this.kanbanService = kanbanService;
        this.columnsService = columnsService;
        this.route = route;
        Promise
            .all([
            this.columnsService.getList()
        ])
            .then(() => {
            route.params.subscribe((params) => {
                let id = params['id'];
                if (id) {
                    columnsService.get(id)
                        .then((column) => this.column = column);
                }
                else {
                    let column = columnsService.createInstance();
                    kanbanService.generateColumnID(column);
                    columnsService.add(column);
                    this.column = column;
                }
            });
        });
    }
    ngOnDestroy() {
        this.columnsService.save();
    }
};
KanbanUpdateColumnComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'kanban-update-column',
        templateUrl: 'tmpl/kanban-update-column.html',
        styleUrls: ['styles/kanban-update-column.css']
    }),
    tslib_1.__metadata("design:paramtypes", [kanban_service_1.KanbanService,
        columns_service_1.ColumnsService,
        router_1.ActivatedRoute])
], KanbanUpdateColumnComponent);
exports.KanbanUpdateColumnComponent = KanbanUpdateColumnComponent;
