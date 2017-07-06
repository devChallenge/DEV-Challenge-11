import ko from 'knockout';

export default function persist(target, key) {
  let initialValue = target();
  if (key && localStorage.getItem(key) !== null) {
    try {
      initialValue = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('LocalStorage not supported'); // eslint-disable-line
    }
  }

  target(initialValue);

  target.subscribe(function(newValue) {
    try {
      localStorage.setItem(key, ko.toJSON(newValue));
    } catch (e) {
      console.error('LocalStorage not supported'); // eslint-disable-line
    }
  });
  return target;
}
