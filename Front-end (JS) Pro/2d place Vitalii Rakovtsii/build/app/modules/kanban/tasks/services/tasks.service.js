"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const abstract_data_service_1 = require("../../../common/services/abstract-data.service");
const task_model_1 = require("../models/task.model");
let TasksService = class TasksService extends abstract_data_service_1.AbstractDataService {
    createInstance(data = {}) {
        return new task_model_1.TaskModel(data);
    }
    get(id) {
        return this.getList()
            .then((tasks) => {
            let task = tasks.find((task) => task.id === id);
            if (task) {
                return task;
            }
            throw new Error('task not found');
        });
    }
    save() {
        localStorage.setItem('tasks', JSON.stringify(this.cache));
        return Promise.resolve(this.cache);
    }
    sync() {
        let tasks = [];
        let json = localStorage.getItem('tasks');
        try {
            if (json) {
                tasks = JSON.parse(json);
            }
        }
        catch (e) {
            // empty
        }
        return Promise.resolve(tasks);
    }
};
TasksService = tslib_1.__decorate([
    core_1.Injectable()
], TasksService);
exports.TasksService = TasksService;
