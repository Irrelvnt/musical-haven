FROM  nikolaik/python-nodejs
COPY package.json yarn.lock ./
RUN yarn install
CMD npm run build
EXPOSE 3000