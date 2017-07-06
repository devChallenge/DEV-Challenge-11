"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const colour_enum_1 = require("../colour.enum");
let ColourService = class ColourService {
    getAllColours() {
        return Array.from(colour_enum_1.ColourNameMap)
            .map(([key, value]) => [key, colour_enum_1.ColourMap.get(key), value]);
    }
};
ColourService = tslib_1.__decorate([
    core_1.Injectable()
], ColourService);
exports.ColourService = ColourService;
