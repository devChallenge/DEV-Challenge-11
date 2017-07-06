"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const routes = [];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes, { useHash: true })
        ],
        exports: [
            router_1.RouterModule
        ],
        providers: [
            { provide: common_1.APP_BASE_HREF, useValue: '/' }
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
