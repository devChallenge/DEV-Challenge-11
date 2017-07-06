"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const task_model_1 = require("./models/task.model");
let TaskComponent = class TaskComponent {
    constructor() {
        this.removeBeacon = new core_1.EventEmitter();
    }
    get colour() {
        return this.task.colourRGB;
    }
    handleDragStart(event) {
        event.dataTransfer.setData('text', this.task.id);
        event.stopPropagation();
    }
};
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", task_model_1.TaskModel)
], TaskComponent.prototype, "task", void 0);
tslib_1.__decorate([
    core_1.Output(),
    tslib_1.__metadata("design:type", core_1.EventEmitter)
], TaskComponent.prototype, "removeBeacon", void 0);
tslib_1.__decorate([
    core_1.HostBinding('style.backgroundColor'),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [])
], TaskComponent.prototype, "colour", null);
tslib_1.__decorate([
    core_1.HostListener('dragstart', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DragEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], TaskComponent.prototype, "handleDragStart", null);
TaskComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'task',
        templateUrl: 'tmpl/task.html',
        styleUrls: ['styles/task.css']
    })
], TaskComponent);
exports.TaskComponent = TaskComponent;
