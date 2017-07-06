import $ from 'jquery';
export default {
  init: function(element, valueAccessor) {
    var callback = valueAccessor();
    $(element).keypress(function(event) {
      var keyCode = event.which ? event.which : event.keyCode;
      if (keyCode === 13) {
        callback();
        return false;
      }
      return true;
    });
  }
};
