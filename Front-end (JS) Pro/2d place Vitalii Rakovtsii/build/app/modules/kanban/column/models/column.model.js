"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColumnModel {
    constructor({ title = 'New Column', id, description } = {}) {
        this.title = title;
        this.id = id;
        this.description = description;
    }
}
exports.ColumnModel = ColumnModel;
