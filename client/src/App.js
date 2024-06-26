import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [balance, setBalance] = useState(null);

    const handleLogin = () => {
        axios.post('http://127.0.0.1:4000/login', { username, password }, { withCredentials: true })
            .then(response => {
                setMessage(response.data.message);
                setBalance(null);
            })
            .catch(error => {
                setMessage(error.response.data.message);
            });
    };

    const handleTransfer = () => {
        axios.post('http://127.0.0.1:4000/transfer', { amount: parseInt(amount) }, { withCredentials: true })
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                setMessage(error.response.data.message);
            });
    };

    const handleLogout = () => {
        axios.post('http://127.0.0.1:4000/logout', {}, { withCredentials: true })
            .then(response => {
                setMessage(response.data.message);
                setBalance(null);
            })
            .catch(error => {
                setMessage(error.response.data.message);
            });
    };

    const checkBalance = () => {
        axios.get('http://127.0.0.1:4000/balance', { withCredentials: true })
            .then(response => {
                setBalance(response.data.balance);
                setMessage(`Your balance is $${response.data.balance}`);
            })
            .catch(error => {
                setMessage(error.response.data.message);
            });
    };

    return (
        <div className="App">
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            <h2>Transfer Money</h2>
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handleTransfer}>Transfer</button>

            <button onClick={handleLogout}>Logout</button>

            <h2>Check Balance</h2>
            <button onClick={checkBalance}>Check Balance</button>

            <p>{message}</p>
            {balance !== null && <p>Your current balance is: ${balance}</p>}
        </div>
    );
}

export default App;

