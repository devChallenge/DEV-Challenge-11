#!/usr/bin/env bash
service nginx stop
cp /vagrant/vagrant/nginx/dev1.dev.conf /etc/nginx/sites-available/_.conf
cp /vagrant/vagrant/nginx/dev1.dev.conf /etc/nginx/sites-available/dev1.dev.conf
service nginx start
service php7.1-fpm restart