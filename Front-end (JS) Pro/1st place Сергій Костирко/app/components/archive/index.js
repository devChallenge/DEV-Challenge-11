import ko from 'knockout';
import template from './template.html';

class ArchiveView {
  constructor(params) {
    this.params = params;
    this.cards = ko.pureComputed(() => {
      return ko.utils.arrayFilter(params.cards(), card => card.archived());
    });
  }
}
ko.components.register('archive', {
  viewModel: ArchiveView,
  template
});
