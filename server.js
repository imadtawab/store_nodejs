const express = require("express")
const app = express()
// path
const path = require("path")
// Routes
const adminRoute = require("./routers/adminRouter/adminRouter")
const clientRoute = require("./routers/clientRouter/clientRouter")
// .env
require('dotenv').config()
// helmet
const helmet = require("helmet");
// ejs
app.set("view engine","ejs")
app.set("views","views")
// mongoose
const mongoose = require("mongoose")
// const URL_DB = "mongodb+srv://imadtawab:azertyuiop@cluster0.4inwqai.mongodb.net/mystore?retryWrites=true&w=majority"
// const URL_DB_LOCAL = "mongodb://localhost:27017"
mongoose.connect(process.env.URL_DB,{useNewUrlParser:true,useUnifiedTopology:true}).then((result) => {
    console.log("connect !!") 
    app.listen(process.env.PORT || 5555,() => {
        console.log("sucsses !!")
    })
}).catch(err => console.log(err))

// 
app.use(helmet()); 
// statics folder
app.use(express.static(path.join(__dirname,"public")))

app.use("/admin",adminRoute)
app.use("/",clientRoute)

app.use((req,res) => {
    res.send("404")
})

