FROM node:16

# app code stored here
WORKDIR /usr/src/app

# Make sure all Package.json files are included
COPY package*.json ./

# Install Dependencies
RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3005

# start server
CMD [ "node", "app.js" ]
