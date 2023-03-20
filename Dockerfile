FROM  nikolaik/python-nodejs
EXPOSE 3000
RUN yarn install
CMD ["npm", "run build"]