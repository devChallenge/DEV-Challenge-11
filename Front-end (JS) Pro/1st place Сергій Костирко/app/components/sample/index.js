import ko from 'knockout';
import template from './template.html';

class Sample {
  constructor(params) {
    this.params = params;
  }
}
ko.components.register('sample', {
  viewModel: Sample,
  template,
});
