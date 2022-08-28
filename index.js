const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const cookieParser = require('cookie-parser');

// Database Connection
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://node:Node123@cluster0.oz0n2kn.mongodb.net/customer_register?retryWrites=true&w=majority', connectionParams)
    .then(() => {
        console.log('Database Connection Successfully!')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/user')
const shopRoutes = require('./routes/shop')

app.use('/user', userRoutes);
app.use('/shop', shopRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.info(`Server Started on http://localhost:${port}`);
});