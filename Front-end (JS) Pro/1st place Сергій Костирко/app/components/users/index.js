import ko from 'knockout';
import template from './template.html';

class UsersView {
  constructor(params) {
    this.params = params;
  }
}
ko.components.register('users', {
  viewModel: UsersView,
  template
});
