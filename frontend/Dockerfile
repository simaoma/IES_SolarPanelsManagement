# pull official base image
FROM node:14.17.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent --force
RUN npm install react-scripts@latest -g --silent

# add app
COPY . ./

# create the 'src' directory
RUN mkdir -p /app/src

# create a symlink for react-refresh/runtime.js
RUN ln -s /app/node_modules/react-refresh/runtime.js /app/src/node_modules/react-refresh/runtime.js

# start app
CMD ["npm", "start"]
