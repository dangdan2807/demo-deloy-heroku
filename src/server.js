const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
dotenv.config();
const POST = process.env.POST || 3001;

const route = require('./routes/index.route');
const db = require('./configs/db.config');
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

// router init
route(app);

app.listen(POST, () => {
    console.log(`Server is running on http://localhost:${POST}`);
});