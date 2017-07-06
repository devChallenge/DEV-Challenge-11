import ko from 'knockout';
import template from './template.html';

class BoardEditView {
  constructor(params) {
    this.model = ko.utils.unwrapObservable(params.model);
    this.save = params.save;
    this.cancel = params.cancel;
  }
}
ko.components.register('board-edit', {
  viewModel: BoardEditView,
  template
});
