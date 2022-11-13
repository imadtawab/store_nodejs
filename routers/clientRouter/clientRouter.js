const express = require("express")
const route = express.Router()
const bodyParser = require("body-parser").urlencoded({extended:true})
// Controllers
const {
    client_home_get,
    client_productDetails_get,
    client_productDetails_post
} = require("../../controllers/clientController")


// URL DB
// const URL_DB = "mongodb+srv://imadtawab:azertyuiop@cluster0.4inwqai.mongodb.net/mystore?retryWrites=true&w=majority"
// express session
const session = require("express-session")
// mongodb Store
const mongoDbStore = require("connect-mongodb-session")(session)
// visitors
let vStore = new mongoDbStore({
    uri: process.env.URL_DB,
    collection: "visitor"
})
route.use(session({
    secret: "user user",
    cookie: {
        // maxAge: 604800000
    },
    store: vStore,
    resave: true,
    saveUninitialized: true
}))
// URL DB
// express session
// const session = require("express-session")
// mongodb Store
// const mongoDbStore = require("connect-mongodb-session")(session)

// // visitors
// let vStore = new mongoDbStore({
//     uri: URL_DB_LOCAL,
//     collection: "visitors"
// })
// route.use(session({
//     secret: "user user",
//     cookie: {
//         // maxAge: 604800000
//     },
//     store: vStore,
//     resave: true,
//     saveUninitialized: true
// }))

// function calcVisitor() {
//         if (req.session.visitor) {
//             console.log("eeeeeeeeeee!!!!!!!!!")
//         } else {
//             req.session.visitor = 0
//         }
//         // console.log(req.session,"eeeee!!!!")
//         next()
// }

// routes
route.get("/",client_home_get)

route.get("/:id",client_productDetails_get)
route.post("/:id",bodyParser,client_productDetails_post)

module.exports = route