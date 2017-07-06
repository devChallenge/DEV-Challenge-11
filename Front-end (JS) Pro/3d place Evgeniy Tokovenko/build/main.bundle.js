webpackJsonp([1,4],{

/***/ 122:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 122;


/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(155);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__category__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__column__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__task__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user__ = __webpack_require__(154);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__category__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__column__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__task__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__user__["a"]; });





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_create_task_dialog_create_task_dialog_component__ = __webpack_require__(94);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(columnService, categoryService, taskService, userService, initService, dialog) {
        this.columnService = columnService;
        this.categoryService = categoryService;
        this.taskService = taskService;
        this.userService = userService;
        this.initService = initService;
        this.dialog = dialog;
        this.users = [];
        this.categories = [];
        this.columns = [];
        this.tasks = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.initService.isFirstRun()) {
            this.initService.onFirstRun();
        }
        this.loadData();
        this.taskService
            .updatedItems
            .subscribe(function (tasks) {
            _this.loadData();
        });
    };
    AppComponent.prototype.loadData = function () {
        this.users = this.userService.getItems();
        this.columns = this.columnService.getItems();
        this.categories = this.categoryService.getItems();
        this.tasks = this.taskService.getItems();
        this.searchText = '';
        this.filterUser = null;
    };
    AppComponent.prototype.onAddNewTask = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__components_create_task_dialog_create_task_dialog_component__["a" /* CreateTaskDialogComponent */]);
    };
    AppComponent.prototype.onSerchText = function ($event) {
        var text = $event.target.value;
        var pattern = new RegExp("" + text, 'i');
        this.tasks.forEach(function (task) {
            task.isVisible = !text || (task.title && task.title.match(pattern));
        });
    };
    AppComponent.prototype.onSerchFamily = function ($event) {
        var user = $event.value;
        this.tasks.forEach(function (task) {
            task.isVisible = !user || (task.user && task.user.id === user.id);
        });
    };
    AppComponent.prototype.onSerchCategory = function ($event) {
        var category = $event.value;
        this.tasks.forEach(function (task) {
            task.isVisible = !category || (task.category && task.category.id === category.id);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(221),
        styles: [__webpack_require__(209)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services__["c" /* ColumnService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services__["c" /* ColumnService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services__["b" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services__["b" /* CategoryService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services__["d" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services__["d" /* TaskService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services__["a" /* UserService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services__["e" /* InitService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services__["e" /* InitService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MdDialog */]) === "function" && _f || Object])
], AppComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_drag_drop__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_drag_drop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_drag_drop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_category_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_column_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_task_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_init_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_user_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_tasks_column_tasks_column_component__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_tasks_columns_items_tasks_columns_items_component__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_tasks_list_tasks_list_component__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_task_task_component__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_create_task_dialog_create_task_dialog_component__ = __webpack_require__(94);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_tasks_column_tasks_column_component__["a" /* TasksColumnComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_tasks_columns_items_tasks_columns_items_component__["a" /* TasksColumnsItemsComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_tasks_list_tasks_list_component__["a" /* TasksListComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_task_task_component__["a" /* TaskComponent */],
            __WEBPACK_IMPORTED_MODULE_19__components_create_task_dialog_create_task_dialog_component__["a" /* CreateTaskDialogComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_19__components_create_task_dialog_create_task_dialog_component__["a" /* CreateTaskDialogComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MdListModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MdDialogModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MdToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_drag_drop__["Ng2DragDropModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MdInputModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MdSelectModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_13__services_init_service__["a" /* InitService */], __WEBPACK_IMPORTED_MODULE_10__services_category_service__["a" /* CategoryService */], __WEBPACK_IMPORTED_MODULE_11__services_column_service__["a" /* ColumnService */], __WEBPACK_IMPORTED_MODULE_12__services_task_service__["a" /* TaskService */], __WEBPACK_IMPORTED_MODULE_14__services_user_service__["a" /* UserService */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TaskComponent = (function () {
    function TaskComponent(taskService) {
        this.taskService = taskService;
    }
    TaskComponent.prototype.onRemove = function (task) {
        this.taskService.removeItem(task);
    };
    return TaskComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models__["b" /* Task */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models__["b" /* Task */]) === "function" && _a || Object)
], TaskComponent.prototype, "task", void 0);
TaskComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-task',
        template: __webpack_require__(223),
        styles: [__webpack_require__(211)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services__["d" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services__["d" /* TaskService */]) === "function" && _b || Object])
], TaskComponent);

var _a, _b;
//# sourceMappingURL=task.component.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksColumnComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TasksColumnComponent = (function () {
    function TasksColumnComponent(taskService) {
        this.taskService = taskService;
    }
    TasksColumnComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterColumnTasks(this.tasks);
        this.taskService
            .updatedItems
            .subscribe(function (tasks) {
            _this.filterColumnTasks(tasks);
        });
    };
    TasksColumnComponent.prototype.filterColumnTasks = function (tasks) {
        var _this = this;
        this.columnTasks = tasks.filter(function (task) { return task.column.id === _this.column.id; });
    };
    TasksColumnComponent.prototype.onItemDrop = function (e) {
        var task = e.dragData;
        if (this.column === task.column) {
            return;
        }
        task.setColumn(this.column);
        this.taskService.save();
    };
    return TasksColumnComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], TasksColumnComponent.prototype, "tasks", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models__["c" /* Column */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models__["c" /* Column */]) === "function" && _a || Object)
], TasksColumnComponent.prototype, "column", void 0);
TasksColumnComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tasks-column',
        template: __webpack_require__(224),
        styles: [__webpack_require__(212)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services__["d" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services__["d" /* TaskService */]) === "function" && _b || Object])
], TasksColumnComponent);

var _a, _b;
//# sourceMappingURL=tasks-column.component.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksColumnsItemsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TasksColumnsItemsComponent = (function () {
    function TasksColumnsItemsComponent() {
    }
    return TasksColumnsItemsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], TasksColumnsItemsComponent.prototype, "tasks", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], TasksColumnsItemsComponent.prototype, "columns", void 0);
TasksColumnsItemsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tasks-columns-items',
        template: __webpack_require__(225),
        styles: [__webpack_require__(213)]
    })
], TasksColumnsItemsComponent);

//# sourceMappingURL=tasks-columns-items.component.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TasksListComponent = (function () {
    function TasksListComponent() {
    }
    return TasksListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], TasksListComponent.prototype, "tasks", void 0);
TasksListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-tasks-list',
        template: __webpack_require__(226),
        styles: [__webpack_require__(214)]
    })
], TasksListComponent);

//# sourceMappingURL=tasks-list.component.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
var Category = (function () {
    function Category(_a) {
        var id = _a.id, title = _a.title, color = _a.color;
        this.id = id;
        this.title = title;
        this.color = color || '#000';
    }
    Category.create = function (title, color) {
        if (color === void 0) { color = '#fff'; }
        return new Category({
            id: +new Date() + Math.random(),
            title: title,
            color: color
        });
    };
    return Category;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Column; });
var Column = (function () {
    function Column(_a) {
        var id = _a.id, title = _a.title, position = _a.position;
        this.id = id;
        this.title = title;
        this.position = position || 0;
    }
    Column.create = function (title, position) {
        if (position === void 0) { position = null; }
        return new Column({
            id: +new Date() + Math.random(),
            title: title,
            position: position
        });
    };
    return Column;
}());

//# sourceMappingURL=column.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Task; });
var Task = (function () {
    function Task(id, title, description, category, user, column, history, tags, position) {
        if (position === void 0) { position = 0; }
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.user = user;
        this.column = column;
        this.history = history;
        this.tags = tags;
        this.position = position;
        this.isVisible = true;
    }
    Task.create = function (title, description, category, user, column, history, tags, position) {
        if (position === void 0) { position = 0; }
        return new Task(+new Date() + Math.random(), title, description, category, user, column, history, tags, position);
    };
    Task.prototype.setColumn = function (column) {
        this.column = column;
    };
    return Task;
}());

//# sourceMappingURL=task.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(_a) {
        var id = _a.id, name = _a.name, photo = _a.photo;
        this.isVisible = true;
        this.id = id;
        this.name = name;
        this.photo = photo;
    }
    User.create = function (name, photo) {
        if (photo === void 0) { photo = null; }
        return new User({
            id: +new Date() + Math.random(),
            name: name,
            photo: photo
        });
    };
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "#page > section {\n  width: 1200px;\n  margin: 0 auto; }\n\nmd-toolbar {\n  position: relative; }\n  md-toolbar > button {\n    position: absolute;\n    right: 10px;\n    top: 10px; }\n\n.filter {\n  font-size: 14px !important;\n  background: white; }\n  .filter > md-select {\n    margin-top: 10px;\n    margin-left: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, ".task-create {\n  width: 500px; }\n  .task-create md-input-container,\n  .task-create md-select {\n    display: block; }\n  .task-create md-select {\n    margin: 10px 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, ".task {\n  padding: 10px;\n  border-left-style: solid;\n  border-left-width: 10px;\n  margin: 15px;\n  box-shadow: 0 0 5px grey;\n  background: white;\n  cursor: move;\n  position: relative; }\n  .task > button {\n    display: none;\n    position: absolute;\n    right: 10px;\n    top: 10px; }\n  .task:hover {\n    box-shadow: 0 0 10px grey; }\n    .task:hover > button {\n      display: block; }\n  .task__title {\n    font-size: 18px;\n    font-weight: bold; }\n  .task__description {\n    font-size: 15px;\n    margin-bottom: 7px; }\n  .task__category, .task__tags, .task__user {\n    font-size: 13px;\n    margin-bottom: 3px; }\n  .task__photo {\n    position: absolute;\n    right: 10px;\n    bottom: 10px; }\n    .task__photo > img {\n      width: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, ".column_tasks__list {\n  min-height: 400px;\n  padding: 15px 0; }\n\n.column_tasks > h2 {\n  margin: 5px 0 5px 0;\n  text-align: center;\n  font-size: 20px;\n  text-transform: uppercase;\n  color: #2b6f6d; }\n\n.drag-over-border {\n  box-shadow: inset 0 0 8px grey;\n  background-color: white; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, ".colums__item {\n  padding: 10px;\n  margin: 15px;\n  box-shadow: 0 0 3px grey;\n  background: #f3f9f7; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(17)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 221:
/***/ (function(module, exports) {

module.exports = "<div id=\"page\">\n  <md-toolbar color=\"primary\">\n    <span fxFlex=\"90\">Family Scrum</span>\n    <button md-raised-button \n            color=\"warn\"\n            (click)=\"onAddNewTask()\">\n      Add new task\n    </button>\n  </md-toolbar>\n  <section fxLayout=\"row\">\n    <div class=\"filter\">\n      <md-input-container>\n        <input mdInput placeholder=\"Search by title\" [(ngModel)]=\"searchText\" (keyup)=\"onSerchText($event)\">\n      </md-input-container>\n    </div>\n    <div class=\"filter\">\n      <md-select placeholder=\"Filter by user\" [(ngModel)]=\"filterUser\" (change)=\"onSerchFamily($event)\">\n        <md-option [value]=\"false\">All family</md-option>\n        <md-option *ngFor=\"let user of users\" [value]=\"user\">\n          {{ user.name }}\n        </md-option>\n      </md-select>\n    </div>\n    <div class=\"filter\">\n      <md-select placeholder=\"Filter by category\" [(ngModel)]=\"filterCategory\" (change)=\"onSerchCategory($event)\">\n        <md-option [value]=\"false\">All categories</md-option>\n        <md-option *ngFor=\"let category of categories\" [value]=\"category\">\n          {{ category.title }}\n        </md-option>\n      </md-select>\n    </div>\n  </section>\n  <section>\n    <app-tasks-columns-items \n      [columns]=\"columns\" \n      [tasks]=\"tasks\"\n    ></app-tasks-columns-items>\n  </section>\n</div>"

/***/ }),

/***/ 222:
/***/ (function(module, exports) {

module.exports = "<div class=\"task-create\">\n  <h2>Task Create</h2>\n  <div>\n    <md-input-container>\n      <input mdInput placeholder=\"Title\" [(ngModel)]=\"taskName\" required>\n    </md-input-container>\n  </div>\n  <div>\n    <md-input-container>\n      <input mdInput placeholder=\"Description\" [(ngModel)]=\"taskDescription\" required>\n    </md-input-container>\n  </div>\n  <div>\n    <md-select placeholder=\"User\" [(ngModel)]=\"taskUser\" required>\n      <md-option *ngFor=\"let user of users\" [value]=\"user\">\n        {{ user.name }}\n      </md-option>\n    </md-select>\n  </div>\n  <br>\n  <div>\n    <md-select placeholder=\"Category\" [(ngModel)]=\"taskCategory\" required>\n      <md-option *ngFor=\"let category of categories\" [value]=\"category\">\n        {{ category.title }}\n      </md-option>\n    </md-select>\n  </div>\n  <div>\n    <md-input-container required>\n      <input mdInput placeholder=\"Tags (Example: One, Two)\" [(ngModel)]=\"taskTags\">\n    </md-input-container>\n  </div>\n  <div class=\"task-create__buttons\" fxLayout=\"row\">\n    <div fxFlex=\"grow\">\n      <button md-raised-button color=\"primary\" (click)=\"onSave()\">Save</button>\n      <button md-raised-button color=\"warn\" (click)=\"onClose()\">Cancel</button>\n    </div>\n    <!--<div>\n      <button md-raised-button color=\"accent\" (click)=\"onRemove()\">remove</button>\n    </div>-->\n  </div>\n</div>\n"

/***/ }),

/***/ 223:
/***/ (function(module, exports) {

module.exports = "<div class=\"task\"\n     [style.opacity]=\"task.isVisible ? 1 : 0.4\"\n     [style.borderColor]=\"task.category && task.category.color || '#000'\">\n  <div class=\"task__title\">\n    {{task.title}}\n  </div>\n  <div class=\"task__description\">\n    {{task.description}}\n  </div>\n  <div class=\"task__category\">\n    <b>Category: </b>\n    {{task.category && task.category.title}}\n  </div>\n  <div class=\"task__user\">\n    <b>User:</b> \n    {{task.user && task.user.name}}\n  </div>\n  <div class=\"task__tags\">\n    <b>Tags:</b> \n    {{task.tags && task.tags.join(', ')}}\n  </div>\n\n  <div class=\"task__photo\" *ngIf=\"task.user && task.user.photo\">\n    <img [src]=\"task.user.photo\">\n  </div>\n  <button md-raised-button \n          color=\"warn\"\n          (click)=\"onRemove(task)\">\n      Remove\n    </button>\n</div>\n"

/***/ }),

/***/ 224:
/***/ (function(module, exports) {

module.exports = "<div class=\"column_tasks\">\n    <h2>{{column.title}}</h2>\n    <div class=\"column_tasks__list\" \n         droppable \n         (onDrop)=\"onItemDrop($event)\">\n      <app-tasks-list [tasks]=\"columnTasks\"></app-tasks-list>\n    </div>\n</div>\n"

/***/ }),

/***/ 225:
/***/ (function(module, exports) {

module.exports = "<div class=\"colums\" \n     fxLayout=\"row\">\n  <div class=\"colums__item\"\n      fxFlex=\"grow\"\n      *ngFor=\"let column of columns\">\n        <app-tasks-column \n          [column]=\"column\" \n          [tasks]=\"tasks\"\n        ></app-tasks-column>\n  </div>\n</div>\n"

/***/ }),

/***/ 226:
/***/ (function(module, exports) {

module.exports = "<div class=\"tasks\">\n  <div *ngFor=\"let task of tasks\">\n    <div class=\"tasks__item\" draggable [dragData]=\"task\">\n      <app-task\n        [task]=\"task\" \n      ></app-task>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(123);


/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
var DataService = (function () {
    function DataService() {
        this.items = [];
    }
    DataService.prototype.getItems = function () {
        if (!this.items.length) {
            var storageItems = localStorage.getItem(this.storageName);
            var items = JSON.parse(storageItems) || [];
            this.itemsFactory(items);
        }
        return this.items;
    };
    DataService.prototype.removeItem = function (item) {
        var index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
        this.save();
    };
    DataService.prototype.addItem = function (item) {
        this.items.push(item);
        this.save();
    };
    DataService.prototype.addItems = function (items) {
        var _this = this;
        items.forEach(function (item) { return _this.items.push(item); });
        this.save();
    };
    DataService.prototype.save = function () {
        var storageData = JSON.stringify(this.items);
        localStorage.setItem(this.storageName, storageData);
        this.updatedItems.emit(this.items);
    };
    return DataService;
}());

//# sourceMappingURL=data.service.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__category_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__column_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__task_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__init_service__ = __webpack_require__(95);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__category_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__column_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__task_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__init_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__user_service__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryService; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CategoryService = (function (_super) {
    __extends(CategoryService, _super);
    function CategoryService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.storageName = 'categories';
        _this.updatedItems = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    CategoryService.prototype.itemsFactory = function (items) {
        this.items = items.map(function (item) { return new __WEBPACK_IMPORTED_MODULE_2__models__["d" /* Category */](item); });
    };
    return CategoryService;
}(__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]));
CategoryService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], CategoryService);

//# sourceMappingURL=category.service.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColumnService; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ColumnService = (function (_super) {
    __extends(ColumnService, _super);
    function ColumnService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.storageName = 'columns';
        _this.updatedItems = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    ColumnService.prototype.itemsFactory = function (items) {
        this.items = items.map(function (item) { return new __WEBPACK_IMPORTED_MODULE_2__models__["c" /* Column */](item); });
    };
    return ColumnService;
}(__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]));
ColumnService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], ColumnService);

//# sourceMappingURL=column.service.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskService; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.storageName = 'tasks';
        _this.updatedItems = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    TaskService.prototype.itemsFactory = function (items) {
        this.items = items.map(function (item) {
            return new __WEBPACK_IMPORTED_MODULE_2__models__["b" /* Task */](item.id, item.title, item.description, item.category, item.user, item.column, item.history, item.tags, item.position);
        });
    };
    return TaskService;
}(__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]));
TaskService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], TaskService);

//# sourceMappingURL=task.service.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.storageName = 'users';
        _this.updatedItems = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    UserService.prototype.itemsFactory = function (items) {
        this.items = items.map(function (item) { return new __WEBPACK_IMPORTED_MODULE_2__models__["a" /* User */](item); });
    };
    return UserService;
}(__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]));
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], UserService);

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateTaskDialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateTaskDialogComponent = (function () {
    function CreateTaskDialogComponent(dialogRef, userService, categoryService, columnService, taskService) {
        this.dialogRef = dialogRef;
        this.userService = userService;
        this.categoryService = categoryService;
        this.columnService = columnService;
        this.taskService = taskService;
        this.taskTags = '';
        this.users = [];
        this.categories = [];
        this.columns = [];
    }
    CreateTaskDialogComponent.prototype.ngOnInit = function () {
        this.users = this.userService.getItems();
        this.categories = this.categoryService.getItems();
        this.columns = this.columnService.getItems();
    };
    CreateTaskDialogComponent.prototype.onSave = function () {
        var task = __WEBPACK_IMPORTED_MODULE_3__models__["b" /* Task */].create(this.taskName, this.taskDescription, this.taskCategory, this.taskUser, this.columns[0], [{
                date: new Date,
                column: this.columns[0].title
            }], this.taskTags.split(','));
        this.taskService.addItem(task);
        this.onClose();
    };
    CreateTaskDialogComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    return CreateTaskDialogComponent;
}());
CreateTaskDialogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-create-task-dialog',
        template: __webpack_require__(222),
        styles: [__webpack_require__(210)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MdDialogRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services__["b" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services__["b" /* CategoryService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services__["c" /* ColumnService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services__["c" /* ColumnService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services__["d" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services__["d" /* TaskService */]) === "function" && _e || Object])
], CreateTaskDialogComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=create-task-dialog.component.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__category_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__column_service__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InitService = (function () {
    function InitService(columnService, categoryService, taskService, userService) {
        this.columnService = columnService;
        this.categoryService = categoryService;
        this.taskService = taskService;
        this.userService = userService;
        this.storageName = 'is-run-before';
    }
    InitService.prototype.isFirstRun = function () {
        return !localStorage.getItem(this.storageName);
    };
    InitService.prototype.onFirstRun = function () {
        var homer = __WEBPACK_IMPORTED_MODULE_5__models__["a" /* User */].create('Homer', '/assets/homer.png');
        var lisa = __WEBPACK_IMPORTED_MODULE_5__models__["a" /* User */].create('Lisa', '/assets/lisa.png');
        var bart = __WEBPACK_IMPORTED_MODULE_5__models__["a" /* User */].create('Bart', '/assets/bart.png');
        var maggie = __WEBPACK_IMPORTED_MODULE_5__models__["a" /* User */].create('Maggie', '/assets/maggie.png');
        var marge = __WEBPACK_IMPORTED_MODULE_5__models__["a" /* User */].create('Marge', '/assets/marge.png');
        this.userService.addItems([homer, lisa, bart, maggie, marge]);
        var toDoColumn = __WEBPACK_IMPORTED_MODULE_5__models__["c" /* Column */].create('To Do');
        var inProgressColumn = __WEBPACK_IMPORTED_MODULE_5__models__["c" /* Column */].create('In Progress');
        var doneColumn = __WEBPACK_IMPORTED_MODULE_5__models__["c" /* Column */].create('Done');
        this.columnService.addItems([toDoColumn, inProgressColumn, doneColumn]);
        var homeWorkCategory = __WEBPACK_IMPORTED_MODULE_5__models__["d" /* Category */].create('Home Work', '#4286f4');
        var restCategory = __WEBPACK_IMPORTED_MODULE_5__models__["d" /* Category */].create('Rest', '#309923');
        var adultStuffCategory = __WEBPACK_IMPORTED_MODULE_5__models__["d" /* Category */].create('Adult Stuff', '#912f5a');
        this.categoryService.addItems([homeWorkCategory, restCategory, adultStuffCategory]);
        var hommerTasks = [
            __WEBPACK_IMPORTED_MODULE_5__models__["b" /* Task */].create('Drink Bear', 'Drink some bear at work. Go to Moe', homeWorkCategory, homer, doneColumn, [], ['bear', 'yummy']),
            __WEBPACK_IMPORTED_MODULE_5__models__["b" /* Task */].create('Drink one more Bear', 'Drink some bear at home', adultStuffCategory, homer, toDoColumn, [], ['Wow'])
        ];
        this.taskService.addItems(hommerTasks);
        var lisaTasks = [
            __WEBPACK_IMPORTED_MODULE_5__models__["b" /* Task */].create('Nooby learning', 'Read books, Write homework', homeWorkCategory, lisa, toDoColumn, [], ['study', 'smart'])
        ];
        this.taskService.addItems(lisaTasks);
        var bartTasks = [
            __WEBPACK_IMPORTED_MODULE_5__models__["b" /* Task */].create('Karambaaa', 'Skating, fart games, kick Homer balls', restCategory, bart, inProgressColumn, [], ['rest', 'games'])
        ];
        this.taskService.addItems(bartTasks);
        var margeTasks = [
            __WEBPACK_IMPORTED_MODULE_5__models__["b" /* Task */].create('Find Hommer', 'Try to find homer after second bear', adultStuffCategory, marge, toDoColumn, [], ['homer', 'as always'])
        ];
        this.taskService.addItems(margeTasks);
        var maggieTasks = [
            __WEBPACK_IMPORTED_MODULE_5__models__["b" /* Task */].create('Be quiet', 'Suck the nipple and be quiet', restCategory, maggie, inProgressColumn, [], ['quiet', 'suck :)'])
        ];
        this.taskService.addItems(maggieTasks);
        localStorage.setItem(this.storageName, 'yes');
    };
    return InitService;
}());
InitService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__column_service__["a" /* ColumnService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__column_service__["a" /* ColumnService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__category_service__["a" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__category_service__["a" /* CategoryService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__task_service__["a" /* TaskService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__task_service__["a" /* TaskService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__user_service__["a" /* UserService */]) === "function" && _d || Object])
], InitService);

var _a, _b, _c, _d;
//# sourceMappingURL=init.service.js.map

/***/ })

},[278]);
//# sourceMappingURL=main.bundle.js.map