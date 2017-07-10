FROM ubuntu:latest

RUN apt-get clean && apt-get -y update && apt-get install -y locales && locale-gen en_US.UTF-8

RUN apt-get -y install libapache2-mod-php7.0 php7.0 php7.0-cli php-xdebug php7.0-mbstring sqlite3 php7.0-mysql php-imagick php-memcached php-pear curl imagemagick php7.0-dev php7.0-phpdbg php7.0-gd npm nodejs-legacy php7.0-json php7.0-curl php7.0-sqlite3 php7.0-intl apache2 vim git-core wget libsasl2-dev libssl-dev libsslcommon2-dev libcurl4-openssl-dev autoconf g++ make openssl libssl-dev libcurl4-openssl-dev pkg-config libsasl2-dev libpcre3-dev \
  && a2enmod headers \
  && a2enmod rewrite

ADD crontab-task /etc/cron.d/crontab-task
RUN chmod 0644 /etc/cron.d/crontab-task
RUN touch /var/log/cron.log
CMD cron

CMD rm -f /var/run/apache2/apache2.pid
CMD rm -rf /run/httpd/* /tmp/httpd*

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
RUN ln -sf /dev/stdout /var/log/apache2/access.log && \
    ln -sf /dev/stderr /var/log/apache2/error.log
RUN mkdir -p $APACHE_RUN_DIR $APACHE_LOCK_DIR $APACHE_LOG_DIR

RUN rm -rf /var/www/html/index.*

VOLUME [ "/var/www/html" ]
WORKDIR /var/www/html

EXPOSE 80

ENTRYPOINT [ "/usr/sbin/apache2" ]
CMD ["-D", "FOREGROUND"]
