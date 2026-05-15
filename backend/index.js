const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const startServer = async () => {
    await connectToMongo();

    const app = express();
    const port = process.env.PORT || 5000;

    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res) => {
        res.send("Hello Swathi");
    });

    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/notes', require('./routes/notes'));

    app.listen(port, () => {
        console.log(`iNotebook Backend listening on port ${port}`);
    });
};

startServer();