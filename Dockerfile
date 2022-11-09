FROM node:lts-alpine

WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm i
# Copy app files
COPY . .
# Expose port
EXPOSE 4000
# Start the app
CMD [ "npm", "start" ]