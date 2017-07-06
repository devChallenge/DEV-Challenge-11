import ko from 'knockout';
import UUID from 'uuid-js';

export default class Comment {
  id = ko.observable(UUID.create().hex);
  text = ko.observable();

  constructor(text) {
    this.text(text);
  }
}
