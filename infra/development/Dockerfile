FROM docker.bravi.com.br/node-mongo-base

ENV TIMEZONE Brazil/East
RUN /usr/local/bin/setup_timezone

WORKDIR /src

ADD ./infra/development/docker.sh /docker.sh

EXPOSE 3000
EXPOSE 27017

RUN chmod +x /docker.sh

ENTRYPOINT ["/docker.sh"]
