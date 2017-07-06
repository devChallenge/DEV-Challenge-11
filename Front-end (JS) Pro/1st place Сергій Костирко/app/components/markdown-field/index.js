import ko from 'knockout';
import template from './template.html';

class MarkdownView {
  editing = ko.observable(false);

  constructor(params) {
    this.field = params.field;
    this.params = params;
  }
  startEditing = () => {
    this.editing(true);
  };
  finishEditing = () => {
    this.editing(false);
  };
}
ko.components.register('markdown-field', {
  viewModel: MarkdownView,
  template
});
