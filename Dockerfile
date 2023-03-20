FROM  nikolaik/python-nodejs
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
CMD npm run build
EXPOSE 3000