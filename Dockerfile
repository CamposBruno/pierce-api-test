FROM node:12

WORKDIR /usr/node/app

COPY . /usr/node/app

EXPOSE 3000

CMD ["npm", "run", "production"]