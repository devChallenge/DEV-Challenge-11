"use strict";
( function() {

    $( function() {

        $.each( $( '.site__menu' ), function() {

            new Menu ( $( this ) );

        } );
        $.each( $( '.location-city' ), function() {

            new LocationCity ( $( this ) );

        } );
        $.each( $( '.location__map' ), function() {

            new Map ( $( this ) );

        } );
        $.each( $( '.recent-markets__slider' ), function() {

            new ResentMarketsSlider ( $( this ) );

        } );
        $.each( $( '.hero' ), function() {

            new HeroSlider ( $( this ) );

        } );

    });

    var Menu = function( obj ) {

        //private properties
        var _self = this,
            _menu = obj,
            _body = $( 'body' ),
            _window = $( window ),
            _showBtn = $( '.site__menu-btn' );

        //private methods
        var _onEvents = function() {

                _showBtn.on( {
                    click: function() {

                        _openMenu( $( this ) );

                    }
                } );

                _window.on( {
                    resize: function () {

                        // _resetStyle();

                    }
                } );

            },
            _openMenu = function( elem )  {

                var curItem = elem;

                if( curItem.hasClass( 'opened' ) ) {

                    curItem.removeClass( 'opened' );
                    _menu.removeClass( 'opened' );

                    _body.css( {
                        'overflow': 'visible'
                    } );

                } else {

                    curItem.addClass( 'opened' );
                    _menu.addClass( 'opened' );

                    _body.css( {
                        'overflow': 'hidden'
                    } );
                }

            },
            _resetStyle = function() {

                _showBtn.removeClass( 'opened' );
                _menu.removeAttr( 'style' );
                _body.css( {
                    'overflow': 'visible'
                } );

            },
            _init = function() {
                _menu[ 0 ].obj = _self;
                _onEvents();
            };

        _init();
    };
    var LocationCity = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _selected = _obj.find('.location-city__selected');

        //private methods
        var _onEvents = function() {

                _selected.on( {
                    click: function() {

                        _openList( $( this ) );

                    }
                } );

                $(document).on(
                    "click",
                    ".location-city",
                    function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                );
                $(document).on(
                    "click",
                    "body",
                    function(){
                        _obj.removeClass( 'opened' );
                    }
                );

            },
            _openList = function( elem )  {

                var curItem = elem;

                if( curItem.parent().hasClass( 'opened' ) ) {

                    curItem.parent().removeClass( 'opened' );

                } else {

                    curItem.parent().addClass( 'opened' );
                }

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _onEvents();
            };

        _init();
    };
    var Map = function (obj) {

        this.obj = obj;
        this.mapWrap = this.obj;

        //private properties
        var _self = this,
            _mapInfoWrap = $( '.contact__map-info' ),
            _addressBtns = _mapInfoWrap.find( '.contact__map-switcher-item' ),
            _markers = [],
            _map,
            _data = JSON.parse(this.mapWrap.attr('data-map')).marks,
            _zoom = JSON.parse(this.mapWrap.attr('data-map')).zoom;

        //private methods
        var _onEvents = function () {

                google.maps.event.addDomListener( window, 'load', _initMap );

                // _addressBtns.on({
                //     click: function () {
                //
                //         if ( $( this ).hasClass( 'active' ) ) {
                //
                //             return false
                //
                //         } else {
                //
                //             _choiceAddress( $( this ) )
                //         }
                //     }
                // });
            },
            _initMap = function () {

                var mapOptions = {
                    zoom: _zoom,
                    scrollwheel: false,
                    center:  new google.maps.LatLng(_data[0].poi_latitude, _data[0].poi_longitude)
                };

                _map = new google.maps.Map( _self.mapWrap[0], mapOptions );

                _setMarkers();
            },
            _setMarkers = function () {

                $.each( _data, function ( i ) {

                    var curItem = this,
                        curLatLng = new google.maps.LatLng( curItem.poi_latitude, curItem.poi_longitude);

                    _markers[ i ] = new google.maps.Marker({
                        position: curLatLng,
                        map: _map
                    });
                });
            },

            _init = function () {
                _onEvents();
            };
        _init();
    };
    var ResentMarketsSlider = function (obj) {

        //private properties
        var _self = this,
            _obj = obj;

        //private methods
        var _initSlider = function () {

                _obj.slick( {
                    arrows: false,
                    dots: false,
                    infinite: false,
                    speed: 600,
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    centerMode: false,
                    centerPadding: 0,
                    touchThreshold: 25,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    responsive: [
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                            }
                        }
                    ]
                } );

            },
            _init = function () {
                _initSlider();
            };
        _init();
    };
    var HeroSlider = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _bannerSlider = _obj.find('.hero__slider'),
            _timelineSlider = _obj.find('.hero__timeline');

        //private methods
        var _initSlider = function () {

                _bannerSlider.slick( {
                    arrows: false,
                    dots: false,
                    infinite: false,
                    speed: 600,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    slidesToShow: 1,
                    centerMode: false,
                    centerPadding: 0,
                    touchThreshold: 25,
                    asNavFor: _timelineSlider
                } );

                _timelineSlider.slick( {
                    arrows: false,
                    dots: false,
                    infinite: false,
                    speed: 600,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    asNavFor: _bannerSlider,
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    centerMode: false,
                    centerPadding: 0,
                    touchThreshold: 25,
                    responsive: [
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                            }
                        }
                    ]
                } );

            },
            _init = function () {
                _initSlider();
            };
        _init();
    };

} )();
