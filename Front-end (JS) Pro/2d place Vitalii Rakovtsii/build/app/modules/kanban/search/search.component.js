"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const colour_service_1 = require("../colour/services/colour.service");
const colour_enum_1 = require("../colour/colour.enum");
let SearchComponent = class SearchComponent {
    constructor(colourService) {
        this.colourService = colourService;
        this.tasks = [];
        this.searchColour = colour_enum_1.Colour.DISABLE;
        this.changeSearchCriteriaBeacon = new core_1.EventEmitter();
        this.changeSearchColourBeacon = new core_1.EventEmitter();
    }
};
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", Number)
], SearchComponent.prototype, "searchColour", void 0);
tslib_1.__decorate([
    core_1.Output(),
    tslib_1.__metadata("design:type", core_1.EventEmitter)
], SearchComponent.prototype, "changeSearchCriteriaBeacon", void 0);
tslib_1.__decorate([
    core_1.Output(),
    tslib_1.__metadata("design:type", core_1.EventEmitter)
], SearchComponent.prototype, "changeSearchColourBeacon", void 0);
SearchComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'search',
        templateUrl: 'tmpl/search.html',
        styleUrls: ['styles/search.css']
    }),
    tslib_1.__metadata("design:paramtypes", [colour_service_1.ColourService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
