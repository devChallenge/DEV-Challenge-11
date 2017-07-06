import ko from 'knockout';
import 'knockout-sortable';

import 'blaze/dist/blaze.min.css';
import './assets/app.css';

import './additions';
import './bindings';
import './extenders';
import './components';

import Board from './models/Board';
import Card from './models/Card';
import User from './models/User';
import Category from './models/Category';
import Comment from './models/Comment';

class App {
  loaded = ko.observable(true);
  currentBoard = ko.observable(false);
  newBoardName = ko.observable('');
  boardToConfirmDelete = ko.observable(false);
  searchString = ko.observable('');

  manageUsers = ko.observable(false);
  manageCategories = ko.observable(false);
  manageArchive = ko.observable(false);

  filterByTag = ko.observable(false);
  filterByAssigny = ko.observable(false);
  filterByCategory = ko.observable(false);

  boards = ko.observableArray().extend({
    persistArray: {
      key: 'boards',
      create: () => new Board()
    }
  });

  users = ko.observableArray().extend({
    persistArray: {
      key: 'users',
      create: () => new User()
    }
  });
  categories = ko.observableArray().extend({
    persistArray: {
      key: 'categories',
      create: () => new Category()
    }
  });

  cards = ko.observableArray().extend({
    persistArray: {
      key: 'cards',
      create: () => new Card(),
      mapping: {
        comments: {
          create: options => {
            return new Comment(options.data.text);
          }
        }
      }
    }
  });

  tags = ko.pureComputed(() => {
    const list = {};
    ko.utils.arrayForEach(this.cards(), card => {
      card.tags().forEach(tag => {
        list[tag] = true;
      });
    });

    return Object.keys(list).sort();
  });

  constructor() {
    if (!this.boards().length) {
      this.boards.push(new Board('Зробити'));
      this.boards.push(new Board('В процесі'));
      this.boards.push(new Board('Виконано'));
    }
  }

  addCard = (name, board) => {
    const card = new Card(name);
    card.status(board.id());
    this.cards.push(card);
    return card;
  };
  deleteCard = card => {
    this.cards.remove(card);
  };

  addUser = () => {
    this.users.push(new User());
  };
  removeUser = user => {
    this.users.remove(user);
  };

  addCategory = () => {
    this.categories.push(new Category());
  };
  removeCategory = category => {
    this.categories.remove(category);
  };

  getBoardCards = board => {
    return ko.writeableComputedArray(() =>
      ko.utils.arrayFilter(this.cards(), card => {
        const inBoard = card.status() === board.id() && !card.archived();
        if (!inBoard) return false;
        if (
          this.filterByAssigny() &&
          card.assignedTo() !== this.filterByAssigny()
        )
          return false;
        if (
          this.filterByCategory() &&
          card.category() !== this.filterByCategory()
        )
          return false;
        if (this.filterByTag() && card.tags().indexOf(this.filterByTag() < 0))
          return false;
        return true;
      })
    );
  };

  startAddingBoard = () => {
    this.currentBoard(new Board());
  };
  cancelAddingBoard = () => {
    this.currentBoard(false);
  };
  addBoard = () => {
    this.boards.push(this.currentBoard());
    this.cancelAddingBoard();
  };
  deleteBoard = board => {
    const cards = this.cards().filter(card => card.status() === board.id());
    if (cards.length > 0) {
      this.boardToConfirmDelete(board);
    } else {
      this.boards.remove(board);
    }
  };
  confimBoardDelete = () => {
    const board = this.boardToConfirmDelete();
    this.boards.remove(board);
    for (let card of this.cards()) {
      if (card.status() === board.id()) {
        this.cards.remove(card);
      }
    }
    this.boardToConfirmDelete(false);
  };
  moveCardsOnDelete = otherBoard => {
    const board = this.boardToConfirmDelete();
    for (let card of this.cards()) {
      if (card.status() === board.id()) {
        card.status(otherBoard);
      }
    }
    this.boards.remove(board);
    this.boardToConfirmDelete(false);
  };
  rejectDelete = () => {
    this.boardToConfirmDelete(false);
  };

  isHighlighted = card => {
    return ko.pureComputed(() => {
      return (
        this.searchString() && card.name().indexOf(this.searchString()) >= 0
      );
    });
  };

  startManageUsers = () => {
    this.manageUsers(true);
  };
  stopManageUsers = () => {
    this.manageUsers(false);
  };
  startManageCategories = () => {
    this.manageCategories(true);
  };
  stopManageCategories = () => {
    this.manageCategories(false);
  };
  startManageArchive = () => {
    this.manageArchive(true);
  };
  stopManageArchive = () => {
    this.manageArchive(false);
  };

  cardStyle = card => {
    return ko.pureComputed(() => {
      const style = {};
      if (card.category()) {
        let category = ko.utils.arrayFirst(
          this.categories(),
          cat => cat.id() === card.category()
        );
        if (category) {
          style.borderLeft = `10px solid ${category.color()}`;
        }
      }
      return style;
    });
  };
}

window.app = new App();

ko.applyBindings(window.app, document.getElementById('root'));
