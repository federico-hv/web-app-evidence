FROM node:18-alpine

# Setup working dir to /app
WORKDIR /app

# Cache effective copying
COPY ./package.json /app
COPY ./yarn.lock /app

# Install the dependencies in /app
RUN yarn

# Copy the rest of the files to app
COPY . /app