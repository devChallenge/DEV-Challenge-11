import ko from 'knockout';
import template from './template.html';

class BoarDeleteConfirmationView {
  otherBoard = ko.observable();
  constructor(params) {
    this.model = ko.utils.unwrapObservable(params.model);
    this.remove = params.remove;
    this.cancel = params.cancel;
    this.move = () => {
      params.move(this.otherBoard());
    };
    this.boards = params
      .boards()
      .filter(board => board.id() !== this.model.id());
  }
}
ko.components.register('board-delete-confirmation', {
  viewModel: BoarDeleteConfirmationView,
  template
});
