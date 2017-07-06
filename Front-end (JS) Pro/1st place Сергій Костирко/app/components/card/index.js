import ko from 'knockout';
import template from './template.html';

class CardView {
  constructor(params) {
    this.model = params.model;
    this.params = params;
  }

  editCard = () => {
    this.params.editCard(this.model);
  };

  deleteCard = () => {
    this.params.deleteCard(this.model);
  };
}
ko.components.register('card', {
  viewModel: CardView,
  template
});
