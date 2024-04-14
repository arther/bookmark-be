FROM node:lts-alpine3.19

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Install TypeScript globally in the container
RUN npm install -g typescript

# Copy the rest of the application to the working directory
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the compiled JavaScript when the container launches
CMD ["node", "dist/index.js"]