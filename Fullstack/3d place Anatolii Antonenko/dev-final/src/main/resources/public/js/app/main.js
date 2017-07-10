$(function () {
  $('#login-btn').click(function() {
    var email = $('#email').val();
    login(email);
  });

  $('#logout-btn').click(function() {
    $('#auth').show();
    $('#logined').hide();
  });

  $('#plan-btn').click(function() {
    var origin = $('#origin').val();
    var destination = $('#destination').val();
    var efficiency = $('#efficiency').val();
    var results = $('#results').val();
    planTrip(origin, destination, efficiency, results);
  });

});
