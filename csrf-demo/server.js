const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:5000'], // React app URL*/
    credentials: true
}));

// Simulate a user database
const users = {
    'user1': { password: 'password1', balance: 1000 }
};

// Middleware to simulate authentication
app.use((req, res, next) => {
    const token = req.cookies['auth-token'];
    if (token && token in users) {
        req.user = users[token];
    }
    next();
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        res.cookie('auth-token', username, { httpOnly: true });
        res.send({ message: 'Login successful' });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

app.post('/transfer', (req, res) => {
    if (!req.user) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const { amount } = req.body;
    req.user.balance -= amount;
    res.send({ message: `Transferred $${amount}`, balance: req.user.balance });
});

app.get('/balance', (req, res) => {
    if (!req.user) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    res.send({ balance: req.user.balance });
});

app.post('/logout', (req, res) => {
    req.user.balance = 1000; // We reset for demonstration purposes
    res.clearCookie('auth-token'); // Clear the auth token cookie
    res.send({ message: 'Logged out' });
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});

