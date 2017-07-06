var agentModule = (function () {

    var self = {};

    self.updateTable = function () {
        $.ajax({
            url: '/api/flights',
            success: function (data) {
                $('#agent-list tbody tr').remove();


                $.each(data, function (item) {
                    var deleteButton = '<button data-id="' + data[item].id + '" type="button" class="btn btn-danger deleteButton">Видалити</button>';

                    var updateButton = '<button data-id="' + data[item].id + '"';
                    updateButton = updateButton + 'data-id="' + data[item].id + '"';
                    updateButton = updateButton + 'data-origin="' + data[item].origin + '"';
                    updateButton = updateButton + 'data-destination="' + data[item].destination + '"';
                    updateButton = updateButton + 'data-cost="' + data[item].cost + '"';
                    updateButton = updateButton + 'data-start="' + data[item].start + '"';
                    updateButton = updateButton + 'data-duration="' + data[item].duration + '"';
                    updateButton = updateButton + '" type="button" class="btn btn-primary updateButton">Оновити</button>';

                    var row = '<tr>';
                    row = row + '<td scope="row">' + data[item].origin + '</td>';
                    row = row + '<td scope="row">' + data[item].destination + '</td>';
                    row = row + '<td scope="row">' + data[item].cost + '</td>';
                    row = row + '<td scope="row">' + data[item].start + '</td>';
                    row = row + '<td scope="row">' + data[item].duration + ' хв</td>';
                    row = row + '<td scope="row">' + deleteButton + ' ' + updateButton + '</td>';
                    row = row + '</tr>';

                    $('#agent-list tbody').append(row);
                });

                $('.deleteButton').click(function () {
                    $.ajax({
                        url: '/api/flights/' + $(this).data('id'),
                        type: 'DELETE',
                        success: function () {
                            self.updateTable();
                        }
                    });
                });

                $('.updateButton').click(function () {
                    $('#id').val($(this).data('id'));
                    $('#origin').val($(this).data('origin'));
                    $('#destination').val($(this).data('destination'));
                    $('#cost').val($(this).data('cost'));
                    $('#start').val($(this).data('start'));
                    $('#duration').val($(this).data('duration'));
                });

            },
            dataType: "json"
        });
    };

    self.update = function () {

    };

    self.init = function () {

        self.updateTable();

        $('#update').click(function () {

            var method = 'POST';
            var url = '/api/flights';

            var data = {
                'origin': $('#origin').val(),
                'destination': $('#destination').val(),
                'cost': $('#cost').val(),
                'start': $('#start').val(),
                'duration': $('#duration').val()
            };

            var id = $('#id').val();
            if (id) {
                method = 'PUT';
                data.id = id;
                url = url + '/' + id;
            }

            $.ajax({
                type: method,
                url: url,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function () {
                    self.updateTable();

                    $('#id').val('');
                    $('#origin').val('');
                    $('#destination').val('');
                    $('#cost').val('');
                    $('#start').val('');
                    $('#duration').val('');
                },
                error: function () {
                    alert('Невірно вказані дані');
                }
            });
        });

    };

    return {
        init: self.init
    };

})();

$(document).ready(function () {

    agentModule.init();
});
