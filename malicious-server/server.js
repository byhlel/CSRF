const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Malicious server running on port ${port}`);
});

