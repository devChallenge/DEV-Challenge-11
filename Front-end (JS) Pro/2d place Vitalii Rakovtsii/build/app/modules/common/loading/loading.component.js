"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let LoadingComponent = class LoadingComponent {
    constructor() {
        this.loaded = false;
    }
};
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", Boolean)
], LoadingComponent.prototype, "loaded", void 0);
LoadingComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '[loading]',
        templateUrl: 'tmpl/loading.html',
        styleUrls: ['styles/loading.css']
    })
], LoadingComponent);
exports.LoadingComponent = LoadingComponent;
