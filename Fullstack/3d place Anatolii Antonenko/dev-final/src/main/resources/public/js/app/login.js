var login = function(email) {
    $.ajax({
        url: "user",
        type: 'GET',
        contentType: 'application/json',
        data: {
            email: email
        },
        error: errorFunction,
        success: function(data) {
            console.log(data);
            var user = JSON.parse(data);
            if (user.role === 'Customer') {
                $('#auth').hide();
                $('#logined').show();
                $('#login-label').text(email);
                $('#admin-content').hide();
                $('#client-content').show();
                localStorage.setItem('clientId', user.id);
            }
        }
    });
}

var errorFunction = function(data, status, er) {
    console.log("Error: " + data + " status: " + status + " er: " + er);
}