import express from 'express';
import { mapOrder } from '*/utilities/sorts.js';

const app = express();

const hostname = 'localhost';
const port = 8000;

app.get('/', (req, res) => {
    res.end('<h1>Hello</h1>')
});

app.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`);
})