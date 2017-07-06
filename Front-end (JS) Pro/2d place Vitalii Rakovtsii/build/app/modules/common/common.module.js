"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const loading_component_1 = require("./loading/loading.component");
const router_1 = require("@angular/router");
const root_component_1 = require("./root/root.component");
const droppable_directive_1 = require("./drag-and-drop/droppable.directive");
const draggable_directive_1 = require("./drag-and-drop/draggable.directive");
let CommonModule = class CommonModule {
};
CommonModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            router_1.RouterModule
        ],
        declarations: [
            droppable_directive_1.DroppableDirective,
            draggable_directive_1.DraggableDirective,
            loading_component_1.LoadingComponent,
            root_component_1.RootComponent
        ],
        providers: [],
        exports: [
            droppable_directive_1.DroppableDirective,
            draggable_directive_1.DraggableDirective,
            loading_component_1.LoadingComponent,
            root_component_1.RootComponent
        ]
    })
], CommonModule);
exports.CommonModule = CommonModule;
