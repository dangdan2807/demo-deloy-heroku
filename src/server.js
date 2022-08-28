const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
dotenv.config();

const route = require('./routes/index.route');
const db = require('./configs/db.config');
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

// router init
route(app);

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});