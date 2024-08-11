const express = require('express');
const cors = require ('cors');
require('dotenv').config();
const connectDB = require("./config/db");
const router = require("./routes/index");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use("/api", router);

const port = 5500 || process.env.PORT;

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server with port:", port, "is running");
    })
})
