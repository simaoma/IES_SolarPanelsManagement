# pull official base image
FROM node:14.17.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . .
RUN npm install --silent --force
RUN npm install react-scripts@3.4.1 -g --silent
# start app
CMD ["npm", "start"]