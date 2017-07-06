"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let DroppableDirective = class DroppableDirective {
    constructor(renderer, vcRef) {
        this.renderer = renderer;
        this.vcRef = vcRef;
    }
    handleDrop(event) {
        // event.stopPropagation();
        this.handleDragLeave();
    }
    handleDragEnter() {
        this.renderer.addClass(this.vcRef.element.nativeElement, 'droppable');
    }
    handleDragExit() {
        this.handleDragLeave();
    }
    handleDragLeave() {
        this.renderer.removeClass(this.vcRef.element.nativeElement, 'droppable');
    }
    handleDragOver(event) {
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();
        this.handleDragEnter();
    }
};
tslib_1.__decorate([
    core_1.HostListener('drop', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DragEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], DroppableDirective.prototype, "handleDrop", null);
tslib_1.__decorate([
    core_1.HostListener('dragenter'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DroppableDirective.prototype, "handleDragEnter", null);
tslib_1.__decorate([
    core_1.HostListener('dragexit'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DroppableDirective.prototype, "handleDragExit", null);
tslib_1.__decorate([
    core_1.HostListener('dragleave'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DroppableDirective.prototype, "handleDragLeave", null);
tslib_1.__decorate([
    core_1.HostListener('dragover', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DragEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], DroppableDirective.prototype, "handleDragOver", null);
DroppableDirective = tslib_1.__decorate([
    core_1.Directive({
        selector: '[droppable]'
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.Renderer2,
        core_1.ViewContainerRef])
], DroppableDirective);
exports.DroppableDirective = DroppableDirective;
