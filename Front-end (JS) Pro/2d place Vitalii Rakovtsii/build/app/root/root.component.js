"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let RootComponent = class RootComponent {
    constructor() {
        this.loaded = true;
    }
};
tslib_1.__decorate([
    core_1.HostBinding('class.loaded'),
    tslib_1.__metadata("design:type", Object)
], RootComponent.prototype, "loaded", void 0);
RootComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'root',
        templateUrl: 'tmpl/root.html',
        styleUrls: ['styles/root.css']
    })
], RootComponent);
exports.RootComponent = RootComponent;
