import ko from 'knockout';
import template from './template.html';

class BoardView {
  editingCard = ko.observable();
  adding = ko.observable(false);
  cardName = ko.observable('');

  constructor(params) {
    this.model = params.model;
    this.showButton = params.showButton;
    this.cards = params.getBoardCards(this.model);
    this.addCard = params.addCard;
    this.deleteCard = params.deleteCard;
    this.deleteBoard = () => {
      params.deleteBoard(this.model);
    };
  }

  startAdding = () => {
    this.adding(true);
  };
  stopAdding = () => {
    this.adding(false);
  };

  add = () => {
    if (this.cardName()) {
      const card = this.addCard(this.cardName(), this.model);
      this.adding(false);
      this.cardName('');
      this.editingCard(card);
    }
  };

  editCard = card => {
    this.editingCard(card);
  };

  deleteCard = card => {
    this.params.deleteCard(card);
  };

  finishEdit = () => {
    this.editingCard(null);
  };

  afterMove = args => {
    args.item.status(this.model.id());
  };
}
ko.components.register('board', {
  viewModel: BoardView,
  template
});
