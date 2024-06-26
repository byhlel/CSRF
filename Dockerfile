# Step 1: Build the React app
FROM node:14 AS build-client
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Step 2: Set up the Node.js server for CSRF demo
FROM node:14 AS build-server
WORKDIR /app/csrf-demo
COPY csrf-demo/package.json csrf-demo/package-lock.json ./
RUN npm install
COPY csrf-demo/ ./

# Step 3: Set up the malicious server
FROM node:14 AS build-malicious
WORKDIR /app/malicious-server
COPY malicious-server/package.json malicious-server/package-lock.json ./
RUN npm install
COPY malicious-server/ ./

# Step 4: Run all servers using a single container
FROM node:14

# Copy built React app
WORKDIR /app/client
COPY --from=build-client /app/client/build ./build

# Copy and set up Node.js server for CSRF demo
WORKDIR /app/csrf-demo
COPY --from=build-server /app/csrf-demo ./

# Copy and set up malicious server
WORKDIR /app/malicious-server
COPY --from=build-malicious /app/malicious-server ./

# Expose the ports
EXPOSE 3000 4000 5000

# Command to run both servers
CMD ["sh", "-c", "cd /app/csrf-demo && node server.js & cd /app/malicious-server && node server.js & cd /app/client/build &&  npx http-server -p 3000"]
