# Using Node.js LTS
FROM node:10.16.3-alpine

WORKDIR usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm packages
RUN npm install

# Copy the remaining code (see .dockerignore if something is not showing up)
ADD . /usr/src/app

EXPOSE 3000

# This will compile tsc and then run the server
CMD ["npm", "run", "start:prod"]
