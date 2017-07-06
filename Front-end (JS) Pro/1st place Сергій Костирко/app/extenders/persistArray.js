import ko from 'knockout';
import koMapping from 'knockout.mapping';

export default function persistArray(target, { key, create, mapping }) {
  let initialValue;
  if (key && localStorage.getItem(key) !== null) {
    try {
      initialValue = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('LocalStorage not supported'); // eslint-disable-line
    }
  }

  const subscriptions = [];

  if (initialValue && initialValue.length) {
    const data = [];
    for (let savedData of initialValue) {
      const item = create();
      koMapping.fromJS(savedData, mapping || {}, item);
      data.push(item);
      subscriptions.push(item.json.subscribe(save));
    }
    target(data);
  }

  function save() {
    try {
      localStorage.setItem(key, ko.toJSON(target().map(item => item.json())));
    } catch (e) {
      console.error('LocalStorage not supported'); // eslint-disable-line
    }
  }

  target.subscribe(function(newValue) {
    for (let subscription of subscriptions) {
      subscription.dispose();
    }
    for (let item of newValue) {
      subscriptions.push(item.json.subscribe(save));
    }
    save();
  });
  return target;
}
