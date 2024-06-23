# CSRF Demonstration

This repository contains a demonstration of a Cross-Site Request Forgery (CSRF) attack. It includes a React client, a Node.js server to handle API calls, and a malicious server to simulate the attack.

## Project Structure

- `client/`: Contains the React application.
- `csrf-demo/`: Contains the Node.js server for handling user authentication and money transfers.
- `malicious-server/`: Contains the malicious server that simulates a CSRF attack.

## Prerequisites

- Docker installed on your machine.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/byhlel/CSRF.git
cd csrf-demo
```

### 2. Build the Docker Image

```bash
docker build -t csrf-demo .
```

### 3. Run the Docker Container

```bash
docker run -p 3000:3000 -p 4000:4000 -p 5000:5000 csrf-demo
```

## Accessing the Application

- **React Client**: http://localhost:3000
- **Node.js Server**: http://localhost:4000
- **Malicious Server**: http://localhost:5000

## Demonstrating the CSRF Attack

1. Open the React client in your browser: http://localhost:3000
2. Log in with the credentials: `user1` / `password1`.
3. Verify that you can transfer money manually.
4. Open a new browser tab and visit the malicious server: http://localhost:5000
5. Click the "Redeem your iPad" link.
6. Switch back to the React client and click the "Check Balance" button to see the unauthorized transfer.

## Project Details

### React Client (`client/`)

A simple React application that allows users to log in, transfer money, and check their balance.

### Node.js Server (`csrf-demo/`)

Handles user authentication, money transfers, and balance checking. It also includes CORS configuration to simulate cross-origin requests.

### Malicious Server (`malicious-server/`)

A mock server that simulates a CSRF attack by making an unauthorized money transfer request to the Node.js server.

## Dockerfile

This multi-stage Dockerfile sets up and runs all three components: the React client, the Node.js server, and the malicious server.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
