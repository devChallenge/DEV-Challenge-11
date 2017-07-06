import $ from 'jquery';
import { markdown } from 'markdown';

export default {
  init: function(element, valueAccessor) {
    const value = valueAccessor();
    if (value()) {
      $(element).html(markdown.toHTML(value() || ''));
    } else {
      $(element).html('<span>Додайте опис</span>');
    }
  },
  update: function(element, valueAccessor) {
    const value = valueAccessor();
    if (value()) {
      $(element).html(markdown.toHTML(value() || ''));
    } else {
      $(element).html('<span>Додайте опис</span>');
    }
  }
};
