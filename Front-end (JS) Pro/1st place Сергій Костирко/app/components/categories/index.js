import ko from 'knockout';
import template from './template.html';

class CategoriesView {
  constructor(params) {
    this.params = params;
  }
}
ko.components.register('categories', {
  viewModel: CategoriesView,
  template
});
