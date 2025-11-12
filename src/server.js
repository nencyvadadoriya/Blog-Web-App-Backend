require("dotenv").config();
const express = require('express');
const morgan = require("morgan")
require("./config/db.confing")
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', require('./routes/index'))
app.listen(PORT,(error)=>{ 
    if(error){
        console.log("server not started")
        return false;
    }
        console.log("server is starting")
})