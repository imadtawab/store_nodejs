const express = require("express")
const route = express.Router()
const bodyParser = require("body-parser").urlencoded({extended:true})
const visitor = require("../../models/numberVisitors")
const registerAccount = require("../../models/registerSchema")

// Controllers
const {
    client_home_get,
    // client_home_post,
    client_productDetails_get,
    client_productDetails_post,
    client_redirectToShoppingCard_get,
    client_shoppingCard_post,
    client_shoppingCard_get,
    client_shoppingCardBuy_post
} = require("../../controllers/clientController")

// URL DB
// const URL_DB = "mongodb+srv://imadtawab:azertyuiop@cluster0.4inwqai.mongodb.net/mystore?retryWrites=true&w=majority"
// express session
// const session = require("express-session")
// mongodb Store
// const mongoDbStore = require("connect-mongodb-session")(session)

// visitors
// #########################################

const cookieSession = require('cookie-session')

route.use(cookieSession({
  name: 'session',
  keys: [ "secret keys!" ],

  // Cookie Options
  maxAge: 1000 * 60 * 60 * 24 // 24 hours
}))

// #########################################

// URL DB
// express session
// const session = require("express-session")
// mongodb Store
// const mongoDbStore = require("connect-mongodb-session")(session)

// // visitors
// let vStore = new mongoDbStore({
//     uri: process.env.URL_DB,
//     collection: "visitors"
// })

// route.use(session({
//     secret: "visitorrr",
//     cookie: {
//         // maxAge: 1000*60
//     },
//     // store: vStore,
//     resave: false,
//     saveUninitialized: false
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
// flash
function checkVisitor(req,res,next) {
  console.log(req.session , "waaaabachar");
  if (req.params.subdomain && req.params.subdomain != "favicon.ico" && req.params.subdomain != "admin") {
    console.log("ffff",req.params,"eeeee");
    visitor.findById(req.session.visitor).then((result) => {
        if(!result){
            registerAccount.findOne({storeName:req.params.subdomain}).then((user) => {
                if (user) {
                    let date = new Date()
                    function checkDate(mydate) {
                        return mydate > 9 ? mydate : "0"+mydate
                    }
                    let newVisitor = {
                        storeName :user.storeName ,
                        addedIn: `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
                    }
                    new visitor(newVisitor).save().then((docs) => {
        
                        console.log(docs, "save visitor ...");
                        req.session.visitor = docs._id
                        console.log(req.session.visitor, "lmmmmard");
                        
                console.log(req.session,"!!!!!!!!!!!!!");
        
                    }).catch(err => console.log(err))
                
                }
            })
        }else{
            console.log(result ,"myVisitorrrrrrrrrr");
        }
                   
    }).catch(err => console.log(err))
next()
}
   }

// routes
route.get("/:subdomain",checkVisitor,client_home_get)
// route.post("/:subdomain",client_home_post)

route.get("/:subdomain/redirectToShoppingCard",client_redirectToShoppingCard_get)

route.post("/:subdomain/shoppingCard",bodyParser,client_shoppingCard_post)
route.get("/:subdomain/shoppingCard",checkVisitor,client_shoppingCard_get)
route.post("/:subdomain/shoppingCard/buy",bodyParser,client_shoppingCardBuy_post)

route.get("/:subdomain/:id",checkVisitor,client_productDetails_get)
route.post("/:subdomain/:id",bodyParser,client_productDetails_post)

module.exports = route