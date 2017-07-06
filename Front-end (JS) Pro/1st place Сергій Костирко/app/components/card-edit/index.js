import ko from 'knockout';
import template from './template.html';

class CardEditView {
  constructor(params) {
    this.model = ko.utils.unwrapObservable(params.model);
    this.finishEdit = params.finishEdit;
  }
}
ko.components.register('card-edit', {
  viewModel: CardEditView,
  template
});
