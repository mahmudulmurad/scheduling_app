# Use the official Node.js image as base image
FROM node:14

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app is running on
EXPOSE 3020

# Start the application
CMD ["npm", "start"]