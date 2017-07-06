'use strict';
if (!window.console)
    window.console = {};
if (!window.console.memory)
    window.console.memory = function() {};
if (!window.console.debug)
    window.console.debug = function() {};
if (!window.console.error)
    window.console.error = function() {};
if (!window.console.info)
    window.console.info = function() {};
if (!window.console.log)
    window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------

var projectsSlider = (function() {
    var link = document.querySelectorAll('.projects__head-link');
    var linkWrapper = document.querySelector('.projects__head-wrapper');
    var projectItem = document.querySelectorAll('.projects__body-item');
    var project = document.querySelectorAll('.projects__item');
    if (link.length == 0){
        return false
    }

    for (var key in link) {
        if (link.hasOwnProperty(key)) {
            link[key].addEventListener('click', function(e) {
                e.preventDefault();
                var tabTarget = this.getAttribute('href');
                var targetEl = document.querySelector(tabTarget);

                var widthParent = document.querySelector('.projects__head').offsetWidth;
                var elementWidth = this.offsetWidth;

                [].forEach.call(link, function(el) {
                    el.classList.remove("active");
                });

                [].forEach.call(projectItem, function(el) {
                    el.style.display = 'none';

                    setTimeout(function() {}, 200)
                });

                targetEl.style.display = 'block';
                // targetEl.classList.remove('hide');

                linkWrapper.style.transform = 'translateX(' + ((widthParent / 2) - (elementWidth / 2) - this.offsetLeft) + 'px)';
                this.classList.add('active');

                [].forEach.call(project, function(el) {
                    el.classList.remove("active");
                });

                var item = document.querySelector(tabTarget+' .projects__item')
                console.log(item)
                item.classList.add('active');
            })
        }
    }

    for (var key in project) {
        if (project.hasOwnProperty(key)) {
            project[key].addEventListener('click', function(e) {
                [].forEach.call(project, function(el) {
                    el.classList.remove("active");
                });
                this.classList.add('active');
            })

        }
    }

    //центруем первый елемент, конечно по красоте вынести б в отдельную функцию,
    //но жизнь слишком коротка =)
    var widthParent = document.querySelector('.projects__head').offsetWidth;
    var elementWidth = link[0].offsetWidth;
    linkWrapper.style.transform = 'translateX(' + ((widthParent / 2) - (elementWidth / 2)) + 'px)';


})()


var seeach = (function () {
    var link = document.querySelector('.header__search');
    var searchInput = document.querySelector('.header__search-wrapper');
    var close = document.querySelector('.header__search-close');
    var input = document.querySelector('.header__search-input');
    var searchRes = document.querySelector('.header__search-results')

    link.addEventListener('click',function (e) {
        e.preventDefault();
        searchInput.style.display = 'block';


    })

    close.addEventListener('click',function (e) {
        e.preventDefault();
        searchInput.style.display = 'none';
        searchRes.style.display = 'none';
    })

    input.addEventListener('keyup',function () {
        searchRes.style.display = 'block';
    })
})()

var popUp = (function () {
    var btn = document.querySelectorAll('.js-show-pop');
    var html = document.querySelector('html');
    var popWrapper = document.querySelector('.pop-up__wrapper');
    var close = document.querySelectorAll('.pop-up__close');


    for (var key in btn) {
        if (btn.hasOwnProperty(key)) {
            btn[key].addEventListener('click', function(e) {
                e.preventDefault();
                console.log('show pop up');
                var target = this.getAttribute('href');
                html.classList.add('hidden');
                popWrapper.classList.add('scroll');
                var popUp = document.querySelector(target);
                popUp.style.display = 'block';
                setTimeout(function () {
                    popUp.classList.add('active');
                },100)

            })

        }
    }


    for (var key in close) {
        if (close.hasOwnProperty(key)) {
            close[key].addEventListener('click', function(e) {
                var popUp = document.querySelector('.pop-up.active');
                popUp.classList.remove('active');
                setTimeout(function () {
                    html.classList.remove('hidden');
                    popWrapper.classList.remove('scroll');
                },300)
            })
        }
    }
})()