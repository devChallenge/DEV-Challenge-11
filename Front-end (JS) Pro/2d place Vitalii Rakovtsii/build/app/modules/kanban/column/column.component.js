"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const column_model_1 = require("./models/column.model");
let ColumnComponent = class ColumnComponent {
    constructor() {
        this.highlightedIDs = [];
        this.removeBeacon = new core_1.EventEmitter();
        this.removeTaskBeacon = new core_1.EventEmitter();
    }
    handleDragStart(event) {
        event.dataTransfer.setData('text', this.column.id);
    }
};
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", column_model_1.ColumnModel)
], ColumnComponent.prototype, "column", void 0);
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", Array)
], ColumnComponent.prototype, "tasks", void 0);
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", Array)
], ColumnComponent.prototype, "highlightedIDs", void 0);
tslib_1.__decorate([
    core_1.Output(),
    tslib_1.__metadata("design:type", core_1.EventEmitter)
], ColumnComponent.prototype, "removeBeacon", void 0);
tslib_1.__decorate([
    core_1.Output(),
    tslib_1.__metadata("design:type", core_1.EventEmitter)
], ColumnComponent.prototype, "removeTaskBeacon", void 0);
tslib_1.__decorate([
    core_1.HostListener('dragstart', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DragEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ColumnComponent.prototype, "handleDragStart", null);
ColumnComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'column',
        templateUrl: 'tmpl/column.html',
        styleUrls: ['styles/column.css']
    })
], ColumnComponent);
exports.ColumnComponent = ColumnComponent;
