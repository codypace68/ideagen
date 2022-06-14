FROM node:16

# app code stored here
WORKDIR /usr/src/app

# Make sure all Package.json files are included
COPY package*.json ./

# Install Dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 80

# start server
CMD [ "node", "app.js" ]
