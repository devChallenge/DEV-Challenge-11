import ko from 'knockout';
import template from './template.html';

class CommentView {
  editing = ko.observable(false);

  constructor(params) {
    this.model = ko.utils.unwrapObservable(params.model);
    this.params = params;
  }
  startEditing = () => {
    this.editing(true);
  };
  finishEditing = () => {
    this.editing(false);
  };
  remove = () => {
    this.params.remove(this.model);
  };
}
ko.components.register('comment', {
  viewModel: CommentView,
  template
});
