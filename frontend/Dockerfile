# pull official base image
FROM node:21-alpine3.18

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

RUN ln -s /app/node_modules/react-refresh/runtime.js /app/src

# start app
CMD ["npm", "start"]
