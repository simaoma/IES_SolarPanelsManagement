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

#O erro  em baixo impedio-nos de dar deployment do frontend 

#Module not found: Error: You attempted to import /app/node_modules/react-refresh/runtime.js which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.
#You can either move it inside src/, or add a symlink to it from project's node_modules/.

# esta é uma das possiveis soluções que tentamos sem sucesso.
RUN ln -s /app/node_modules/react-refresh/runtime.js /app/src

# start app
CMD ["npm", "start"]
