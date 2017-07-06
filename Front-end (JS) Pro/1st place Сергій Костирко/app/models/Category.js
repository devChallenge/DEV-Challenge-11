import ko from 'knockout';
import koMapping from 'knockout.mapping';
import UUID from 'uuid-js';

export default class Category {
  id = ko.observable(UUID.create().hex);
  name = ko.observable('');
  color = ko.observable('#ffffff');

  json = ko
    .computed(() => {
      return koMapping.toJS(this, {
        ignore: ['json']
      });
    })
    .extend({ rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' } });
}
