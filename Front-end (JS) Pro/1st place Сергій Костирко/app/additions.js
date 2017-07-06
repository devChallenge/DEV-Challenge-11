import ko from 'knockout';

ko.writeableComputedArray = function(evaluatorFunction) {
  // We use this to get notified when the evaluator function recalculates the array.
  const computed = ko.computed(evaluatorFunction);

  // This is what gets returned to the caller and they can subscribe to
  const observableArray = ko.observableArray(computed());

  // When the computed changes, make the same changes to the observable array.
  computed.subscribe(function(newArray) {
    // Add any new values
    newArray.forEach(function(value) {
      if (observableArray.indexOf(value) == -1) {
        // It's a new value, push it
        observableArray.unshift(value);
      }
    });

    // Remove any old ones.  Loop backwards since we're removing items from it.
    for (
      var valueIndex = observableArray().length - 1;
      valueIndex >= 0;
      valueIndex--
    ) {
      const value = observableArray()[valueIndex];
      if (newArray.indexOf(value) == -1) {
        // It's an old value, remove it
        observableArray.remove(value);
      }
    }
  });

  return observableArray;
};
