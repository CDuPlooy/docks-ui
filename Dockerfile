FROM node:9-alpine

WORKDIR /app

EXPOSE 4200

RUN apk add --update python

CMD ["/bin/sh", "./install.sh"]
