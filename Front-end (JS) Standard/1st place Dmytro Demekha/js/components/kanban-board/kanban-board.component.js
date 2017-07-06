var KanbanBoardComponent = {
    controller: 'KanbanBoardController',
    templateUrl: 'js/components/kanban-board/kanban-board.html'
};

angular
    .module('components.board')
    .component('kanbanBoard', KanbanBoardComponent);