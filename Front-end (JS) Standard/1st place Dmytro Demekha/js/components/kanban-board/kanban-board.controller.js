function KanbanBoardController(ngDialog, localStorageService) {
    var ctrl = this;

    var defaultTaskName = 'To Do';

    ctrl.columnsList = [
        {
            name: defaultTaskName,
            tasks: []
        },
        {
            name: 'Doing',
            tasks: []
        },
        {
            name: 'Done',
            tasks: []
        }
    ];

    ctrl.colorCategoriesList = [
        {
            id: 0,
            name: 'No category',
            color: '#fff'
        },
        {
            id: 1,
            name: 'Frontend',
            color: '#e6e6e6'
        },
        {
            id: 2,
            name: 'Backend',
            color: '#f7f4bc'
        },
        {
            id: 3,
            name: 'Design',
            color: '#caf791'
        },
        {
            id: 4,
            name: 'QA',
            color: '#f7b7c9'
        }
    ];

    ctrl.archiveLength = 0;
    
    ctrl.$onInit = function () {
        if (!localStorageService.get('kanban')) {
            localStorageService.set('kanban', ctrl.columnsList);
        } else {
            ctrl.columnsList = localStorageService.get('kanban');
        }

        if (!localStorageService.get('archive')) {
            localStorageService.set('archive', []);
        }
        ctrl.archiveLength = localStorageService.get('archive').length;

        if (!localStorageService.get('colorCategories')) {
            localStorageService.set('colorCategories', ctrl.colorCategoriesList);
        } else {
            ctrl.colorCategoriesList = localStorageService.get('colorCategories');
        }
    };


    ctrl.createTask = function () {
        ctrl.createTaskDialog = ngDialog.open({ template: 'js/components/kanban-board/dialogs/create-task.html', className: 'ngdialog-theme-default', controller: function() {

            var dialogCtrl = this;

            dialogCtrl.cancel = function() {
                ctrl.createTaskDialog.close();
            };

            dialogCtrl.columnsList = ctrl.columnsList;

            dialogCtrl.colorCategories = ctrl.colorCategoriesList;

            dialogCtrl.taskModel = {
                name: '',
                description: '',
                color: 0
            };

            dialogCtrl.taskStatus = null;

            dialogCtrl.saveTask = function () {
                var columnIndex = null;
                if (!!dialogCtrl.taskStatus&&dialogCtrl.taskStatus.name) {
                    angular.forEach(ctrl.columnsList, function (value, key) {
                        if (value.name === dialogCtrl.taskStatus.name) {
                            columnIndex = key;
                        }
                    });
                } else {
                    angular.forEach(ctrl.columnsList, function (value, key) {
                        if (value.name === defaultTaskName) {
                            columnIndex = key;
                        }
                    });
                }
                dialogCtrl.columnsList[columnIndex].tasks.push(dialogCtrl.taskModel);
                localStorageService.set('kanban', dialogCtrl.columnsList);
                dialogCtrl.cancel();
            }

        }, controllerAs: '$dialogCtrl'});
    }

    ctrl.editTask = function (columnIndex, taskIndex) {
        ctrl.createTaskDialog = ngDialog.open({ template: 'js/components/kanban-board/dialogs/create-task.html', className: 'ngdialog-theme-default', controller: function() {

            var dialogCtrl = this;

            dialogCtrl.isEditing = true;

            dialogCtrl.cancel = function() {
                ctrl.createTaskDialog.close();
            };

            dialogCtrl.columnsList = ctrl.columnsList;

            dialogCtrl.colorCategories = ctrl.colorCategoriesList;

            var editableTask = dialogCtrl.columnsList[columnIndex].tasks[taskIndex];

            dialogCtrl.taskModel = {
                name: editableTask.name,
                description: editableTask.description,
                color: editableTask.color
            };

            dialogCtrl.taskStatus = dialogCtrl.columnsList[columnIndex];

            dialogCtrl.saveTask = function () {
                dialogCtrl.columnsList[columnIndex].tasks[taskIndex] = dialogCtrl.taskModel;
                localStorageService.set('kanban', dialogCtrl.columnsList);
                dialogCtrl.cancel();
            }

        }, controllerAs: '$dialogCtrl'});
    }

    ctrl.archiveTask = function (columnIndex, taskIndex) {
        ctrl.alertDialog = ngDialog.open({ template: 'js/components/kanban-board/dialogs/alert.html', className: 'ngdialog-theme-default', controller: function() {

            var dialogCtrl = this;

            dialogCtrl.action = 'archive';

            dialogCtrl.cancel = function() {
                ctrl.alertDialog.close();
            };

            dialogCtrl.onAgreeClick = function () {
                var archivedTasks = localStorageService.get('archive');
                archivedTasks.push(ctrl.columnsList[columnIndex].tasks[taskIndex]);
                ctrl.columnsList[columnIndex].tasks.splice(taskIndex, 1);
                localStorageService.set('archive', archivedTasks);
                localStorageService.set('kanban', ctrl.columnsList);
                ctrl.archiveLength = archivedTasks.length;
                dialogCtrl.cancel();
            };

        }, controllerAs: '$dialogCtrl'});
    }

    ctrl.deleteTask = function (columnIndex, taskIndex) {
        ctrl.alertDialog = ngDialog.open({ template: 'js/components/kanban-board/dialogs/alert.html', className: 'ngdialog-theme-default', controller: function() {

            var dialogCtrl = this;

            dialogCtrl.action = 'delete';

            dialogCtrl.cancel = function() {
                ctrl.alertDialog.close();
            };

            dialogCtrl.onAgreeClick = function () {
                ctrl.columnsList[columnIndex].tasks.splice(taskIndex, 1);
                localStorageService.set('kanban', ctrl.columnsList);
                dialogCtrl.cancel();
            };

        }, controllerAs: '$dialogCtrl'});
    }

    ctrl.openArchive = function () {
        ctrl.archiveDialog = ngDialog.open({ template: 'js/components/kanban-board/dialogs/archive.html', className: 'ngdialog-theme-default', controller: function() {

            var dialogCtrl = this;

            dialogCtrl.cancel = function() {
                ctrl.archiveDialog.close();
            };

            dialogCtrl.archiveList = localStorageService.get('archive');

            dialogCtrl.removeTask = function (index) {
                dialogCtrl.archiveList.splice(index, 1);
                localStorageService.set('archive', dialogCtrl.archiveList);
                ctrl.archiveLength = dialogCtrl.archiveList.length;
            };

            dialogCtrl.restoreTask = function (index) {
                angular.forEach(ctrl.columnsList, function (value, key) {
                    if (value.name === defaultTaskName) {
                        ctrl.columnsList[key].tasks.push(dialogCtrl.archiveList[index]);
                        localStorageService.set('kanban', ctrl.columnsList);
                    }
                });
                dialogCtrl.removeTask(index);
            }

        }, controllerAs: '$dialogCtrl'});
    }

    ctrl.taskMoved = function () {
        localStorageService.set('kanban', ctrl.columnsList);
    }

    ctrl.editColumns = function () {
        ctrl.editColumnsDialog = ngDialog.open({ template: 'js/components/kanban-board/dialogs/edit-columns.html', className: 'ngdialog-theme-default', controller: function() {

            var dialogCtrl = this;

            dialogCtrl.addColumnIsActive = false;

            dialogCtrl.cancel = function() {
                ctrl.editColumnsDialog.close();
            };

            dialogCtrl.columnModel = {
                name: '',
                tasks: []
            };

            dialogCtrl.columns = ctrl.columnsList;

            dialogCtrl.deleteColumn = function (index) {
                dialogCtrl.columns.splice(index, 1);
                localStorageService.set('kanban', dialogCtrl.columns);
            }

            dialogCtrl.addColumn = function () {
                dialogCtrl.columns.push(dialogCtrl.columnModel);
                localStorageService.set('kanban', dialogCtrl.columns);
                dialogCtrl.columnModel = {
                    name: '',
                    tasks: []
                };
                dialogCtrl.addColumnIsActive = false;
            }

            dialogCtrl.columnMoved = function () {
                localStorageService.set('kanban', dialogCtrl.columns);
            }

        }, controllerAs: '$dialogCtrl'});
    }

    ctrl.editColorsCategories = function () {
        ctrl.editColorsCategoriesDialog = ngDialog.open({ template: 'js/components/kanban-board/dialogs/colors-categories.html', className: 'ngdialog-theme-default', controller: function() {

            var dialogCtrl = this;

            dialogCtrl.cancel = function() {
                ctrl.editColorsCategoriesDialog.close();
            };

            dialogCtrl.colorsCategories = ctrl.colorCategoriesList;

            dialogCtrl.saveColors = function () {
                localStorageService.set('colorCategories', dialogCtrl.colorsCategories);
                dialogCtrl.cancel();
            }

        }, controllerAs: '$dialogCtrl'});
    }

}

angular
    .module('components.board')
    .controller('KanbanBoardController', ['ngDialog', 'localStorageService', KanbanBoardController]);