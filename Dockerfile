# See the README.md for usage and configuration info

# This line defines which node.js Docker image to leverage
# Available versions are described at https://hub.docker.com/_/node/
FROM node:16-alpine

# COPY start.sh /start.sh
# RUN chmod +x /start.sh

# Sets the default working directory to /app which is where we copy the service files to.
WORKDIR /app

# Denotes to copy all files in the service to 'app' folder in the container
COPY . /app

# # Install service dependencies relevant for production builds skipping all development dependencies.
# RUN npm install --production --no-optional
RUN npm i

# # check every 5s to ensure this service is healthy
# HEALTHCHECK --interval=5s --start-period=45s --timeout=5s --retries=5 CMD node healthcheck.js

# Starts the service
CMD ["node", "."]
