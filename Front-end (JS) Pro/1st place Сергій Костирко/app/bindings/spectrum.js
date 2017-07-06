import $ from 'jquery';
import 'spectrum-colorpicker';
import 'spectrum-colorpicker/spectrum.css';

export default {
  init: function(element, valueAccessor) {
    const value = valueAccessor();

    const options = {
      color: value(),
      change: function(color) {
        value(color.toHexString());
      }
    };
    $(element).spectrum(options);
  }
};
