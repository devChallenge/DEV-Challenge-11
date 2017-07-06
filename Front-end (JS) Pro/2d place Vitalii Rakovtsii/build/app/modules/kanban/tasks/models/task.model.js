"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colour_enum_1 = require("../../colour/colour.enum");
const marked = require("marked");
class TaskModel {
    get descriptionMD() {
        return marked(this.description);
    }
    get colourRGB() {
        return colour_enum_1.ColourMap.get(+this.colour);
    }
    constructor({ id, title = 'New Task', description = '', columnID, colour = colour_enum_1.Colour.NONE } = {}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.columnID = columnID;
        this.colour = colour;
    }
}
exports.TaskModel = TaskModel;
