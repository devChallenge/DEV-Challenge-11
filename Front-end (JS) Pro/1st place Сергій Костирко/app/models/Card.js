import ko from 'knockout';
import koMapping from 'knockout.mapping';
import Comment from './Comment';

export default class Card {
  name = ko.observable();
  description = ko.observable();
  status = ko.observable();
  assignedTo = ko.observable();
  tags = ko.observableArray();
  comments = ko.observableArray();

  archived = ko.observable(false);
  tagName = ko.observable();
  commentText = ko.observable();
  category = ko.observable();

  json = ko
    .computed(() => {
      return koMapping.toJS(this, {
        ignore: ['json']
      });
    })
    .extend({ rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' } });

  constructor(name) {
    this.name(name);
  }

  archive = () => {
    this.archived(true);
  };

  unarchive = () => {
    this.archived(false);
  };

  addTag = () => {
    if (this.tagName() && this.tags().indexOf(this.tagName()) < 0) {
      this.tags.push(this.tagName());
      this.tagName('');
    }
  };

  addComment = () => {
    this.comments.push(new Comment(this.commentText()));
    this.commentText('');
  };
  removeComment = comment => {
    this.comments.remove(comment);
  };

  removeTag = tag => {
    this.tags.remove(tag);
  };
}
