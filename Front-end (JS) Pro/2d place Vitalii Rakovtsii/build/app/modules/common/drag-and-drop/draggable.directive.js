"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
let DraggableDirective = class DraggableDirective {
    constructor(document, vcRef) {
        this.document = document;
        this.vcRef = vcRef;
    }
    handleDragStart(event) {
    }
};
tslib_1.__decorate([
    core_1.HostListener('dragstart', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DragEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], DraggableDirective.prototype, "handleDragStart", null);
DraggableDirective = tslib_1.__decorate([
    core_1.Directive({
        selector: '[draggable]'
    }),
    tslib_1.__param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    tslib_1.__metadata("design:paramtypes", [Document,
        core_1.ViewContainerRef])
], DraggableDirective);
exports.DraggableDirective = DraggableDirective;
