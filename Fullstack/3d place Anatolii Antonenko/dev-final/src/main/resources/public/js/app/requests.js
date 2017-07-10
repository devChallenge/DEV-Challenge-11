//GET /trips?origin=Kyiv&destination=Iasi&efficiency=time&results=1
var planTrip = function(origin, destination, efficiency, results) {
    $.ajax({
        url: "trips",
        type: 'GET',
        contentType: 'application/json',
        data: {
            origin: origin,
            destination: destination,
            efficiency: efficiency,
            results: results
        },
        error: errorFunction,
        success: function(data) {
            console.log(data);
            var options = JSON.parse(data);
            displayOptions(options);
        }
    });
}

var displayOptions = function(options) {
    var table = $('#options-tbl > tbody');
    table.html('');//clear
    for(var i = 0; i < options.length; i++) {
        addOption(options[i]);
    }
    function addOption(option) {
        var template = "<tr><td>{flights}</td><td>{time}</td><td>{price}</td><td>{connections}</td></tr>";
        //<th>Flights Ids</th><th>Time</th><th>Price</th><th>Connections count</th>
        var optionHTML = template.replace('{flights}', option.path[0].id);
        //TODO
                                //.replace('{time}', option.path[0].)
                                //.replace('{price}', request.type)
                                //.replace('{connections}', request.transaction.id);
        table.append(optionHTML);
    }
}