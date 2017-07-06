var clientModule = (function () {

    var self = {};

    self.init = function () {

        $('#send').click(function () {

            $.ajax({
                url: '/api/trips/',
                type: 'GET',
                data: {
                    // 'origin': 'Kyiv',
                    'origin': $('#from').val(),
                    // 'destination': 'Iasi'
                    'destination': $('#to').val()
                },
                success: function (data) {

                    function implode(glue, pieces) {
                        return ( ( pieces instanceof Array ) ? pieces.join(glue) : pieces );
                    }

                    var text = "";
                    text = text + "<b>Ціна</b> " + data.cost;
                    text = text + "<br>";
                    text = text + "<b>Пересадок</b> " + data.connections;
                    text = text + "<br>";
                    text = text + "<b>Маршрут</b> " + implode(' - ', data.flights);


                    $('.data').html(text);

                },
                error: function () {
                    alert('Маршрут не знайдено');
                }
            });

        });
    };

    return {
        init: self.init
    };

})();

$(document).ready(function () {

    clientModule.init();
});
