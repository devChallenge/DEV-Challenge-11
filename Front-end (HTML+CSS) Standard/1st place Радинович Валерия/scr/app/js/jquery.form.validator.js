var FormValidator = function (obj) {

    //private properties
    var _self = this,
        _obj = obj,
        _fields = _obj.find( ':required' );

    //private methods
    var _constructor = function () {
            _onEvents();
            _addNotTouchedClass();
            _obj[0].obj = _self;
        },
        _addNotTouchedClass = function () {
            _fields.addClass( 'not-touched' );
            _fields.each( function () {
                _validateField( $( this ) );
            } );
        },
        _onEvents = function () {
            _fields.on( {
                focus: function() {
                    $( this ).removeClass( 'not-touched' );
                },
                keyup: function() {
                    _validateField( $( this ) );
                }
            } );

        },
        _makeNotValid = function ( field ) {
            field.addClass( 'not-valid' );
            field.removeClass( 'valid' );
        },
        _makeValid = function ( field ) {
            field.removeClass( 'not-valid' );
            field.addClass( 'valid' );
        },
        _validateEmail = function ( email ) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        _validateField = function ( field ) {
            var type = field.attr( 'type' );

            if( type === 'email' || type === 'text' ){

                if( field.val() === '' ){
                    _makeNotValid( field );
                    return false;
                }

            }

            if( type === 'email' ){
                if( !_validateEmail( field.val() ) ){
                    _makeNotValid( field );
                    return false;
                }
            }

            _makeValid( field );
        };

    //public properties

    //public methods
    _self.checkValid = function () {
        var valid = true;

        _fields.each( function () {
            $( this ).removeClass( 'not-touched' );
            if( $( this ).hasClass( 'not-valid' ) ){
                valid = false;

            }
        } );

        return valid;
    };

    _constructor();
};
