"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const colour_enum_1 = require("../../colour/colour.enum");
let KanbanService = class KanbanService {
    ensureTaskHasColumn(tasks, columns) {
        if (!columns.length) {
            return;
        }
        let columnIDs = columns.map((column) => column.id);
        let baseColumnID = columnIDs[0];
        tasks.forEach((task) => {
            if (columnIDs.indexOf(task.columnID) === -1) {
                task.columnID = baseColumnID;
            }
        });
    }
    filterTasks(tasks, columnID, searchColour) {
        return tasks
            .filter((task) => {
            if (searchColour === colour_enum_1.Colour.DISABLE) {
                return task.columnID === columnID;
            }
            return parseInt(task.colour, 10) === searchColour && task.columnID === columnID;
        });
    }
    filterIDsBySearchCriteria(tasks, searchCriteria) {
        let ciSearchCriteria = searchCriteria.toLowerCase();
        return tasks.filter((task) => task.title.toLowerCase().indexOf(ciSearchCriteria) > -1)
            .map((task) => task.id);
    }
    generateTaskID(task) {
        task.id = `task${Math.floor(Math.random() * 100000000)}`;
    }
    generateColumnID(column) {
        column.id = `column${Math.floor(Math.random() * 100000000)}`;
    }
};
KanbanService = tslib_1.__decorate([
    core_1.Injectable()
], KanbanService);
exports.KanbanService = KanbanService;
