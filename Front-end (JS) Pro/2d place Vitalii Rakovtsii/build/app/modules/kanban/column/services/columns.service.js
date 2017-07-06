"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const abstract_data_service_1 = require("../../../common/services/abstract-data.service");
const column_model_1 = require("../models/column.model");
let ColumnsService = class ColumnsService extends abstract_data_service_1.AbstractDataService {
    createInstance(data = {}) {
        return new column_model_1.ColumnModel(data);
    }
    get(id) {
        return this.getList()
            .then((columns) => {
            let column = columns.find((column) => column.id === id);
            if (column) {
                return column;
            }
            throw new Error('column not found');
        });
    }
    save() {
        localStorage.setItem('columns', JSON.stringify(this.cache));
        return Promise.resolve(this.cache);
    }
    sync() {
        let columns = [];
        let json = localStorage.getItem('columns');
        try {
            if (json) {
                columns = JSON.parse(json);
            }
        }
        catch (e) {
            // empty
        }
        if (!localStorage.getItem('columns_default')) {
            localStorage.setItem('columns_default', 'done');
            columns = [
                {
                    "title": "TODO",
                    "id": "column44458078",
                    "description": "where to start"
                },
                {
                    "title": "In Progress",
                    "id": "column87703758",
                    "description": "very nice column"
                },
                {
                    "title": "Done",
                    "id": "column61191928",
                    "description": "grab a beer now"
                }
            ];
            localStorage.setItem('columns', JSON.stringify(columns));
        }
        return Promise.resolve(columns);
    }
};
ColumnsService = tslib_1.__decorate([
    core_1.Injectable()
], ColumnsService);
exports.ColumnsService = ColumnsService;
