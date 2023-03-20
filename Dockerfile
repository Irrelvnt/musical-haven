FROM  nikolaik/python-nodejs
EXPOSE 3000
RUN npm install
CMD npm run build