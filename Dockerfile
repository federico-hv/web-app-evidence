FROM node:16-alpine

ENV YARN_VERSION 3.4.1

RUN yarn policies set-version $YARN_VERSION

# Setup working dir to /app
WORKDIR /app
## COPY entrypoint script & make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# Cache effective copying
COPY ["package.json", "yarn.lock", "./"]
# Install the dependencies in /app
RUN yarn
# Copy the rest of the files to app
COPY . .
## Expose port
ENTRYPOINT ["/entrypoint.sh"]
# Run app
CMD ["yarn", "dev"]
