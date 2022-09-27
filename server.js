require('dotenv').config();

// this file is used for starting the server (listening) and connecting to the db.
const mongoose = require('mongoose');
const app = require('./app/app');

// shopping api
const PORT = process.env.PORT || 8880;
app.listen(PORT, () => console.log(`Server started on port:${PORT}`));

const DB_URI = process.env.DB_URI;
mongoose.Promise = global.Promise;

const _option = {
    socketTimeoutMS: 0,
    keepAlive: true,
    useNewUrlParser: true,
};

mongoose.connect(DB_URI, _option).then(()=> console.log(`DB connected`)).catch(err => {
    console.error(err);
    // optional things - if you want you can also terminate the server
    process.exit(1); // 1 means some error has occurred.
});