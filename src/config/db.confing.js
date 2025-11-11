const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("db is connented..")
}).catch(err=>{
    console.log("db is disconnented." , err)
})