"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const root_component_1 = require("./root/root.component");
const app_routing_module_1 = require("./app-routing.module");
const common_module_1 = require("./modules/common/common.module");
const kanban_module_1 = require("./modules/kanban/kanban.module");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            app_routing_module_1.AppRoutingModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            common_module_1.CommonModule,
            kanban_module_1.KanbanModule
        ],
        declarations: [
            root_component_1.RootComponent
        ],
        bootstrap: [
            root_component_1.RootComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
