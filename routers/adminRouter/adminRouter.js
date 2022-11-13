const express = require("express")
const route = express.Router()
// body-parser
const bodyParser = require("body-parser").urlencoded({extended: true})
// multer
const multer = require("multer")
// Url DB 
// const URL_DB = "mongodb+srv://imadtawab:azertyuiop@cluster0.4inwqai.mongodb.net/mystore?retryWrites=true&w=majority"
// Auth
const auth = require("../../models/guard_auth")
// flash
const flash = require("connect-flash")

// use
route.use(flash())

// Controllers
const {admin_addNewProduct_get,
    admin_addNewProduct_post,
    admin_allProducts_get,
    admin_allProduct_delete,
    admin_productDetails_get,
    admin_allOrders_get,
    admin_orderDetails_get,
    admin_dashboard_get,
    admin_allOrders_delete,
    admin_UpdateProduct_get,
    admin_UpdateProduct_post,
    admin_register_get,
    admin_ProductChangeStatus_get,
    admin_ordersChangeStatus_get,
    admin_register_post,
    admin_login_get,
    admin_login_post,
    admin_logout_get,
    admin_profile_get,
    admin_profile_post
} = require("../../controllers/adminController")

// express session
const session = require("express-session")
const { db } = require("../../models/addProductSchema")
// mongodb Store
const mongoDbStore = require("connect-mongodb-session")(session)

// Create Store {New Collection}
let Store = new mongoDbStore({
    uri: process.env.URL_DB,
    collection: "mysession"
})
route.use(session({
    secret: "user user",
    cookie: {
        maxAge: 604800000
    },
    store: Store,
    resave: true,
    saveUninitialized: true
}))


// path => /admin/

route.get("/",auth,admin_dashboard_get)

route.get("/addnewproduct",auth,admin_addNewProduct_get)
route.post("/addnewproduct",auth,multer({
    storage:multer.diskStorage({
        destination:function (req,file,cb) {
            cb(null,"./public/uploads")
        },
        filename:function (req,file,cb) {
            cb(null,Date.now() + "_" + file.originalname)
        }
    })
}).array(["images"]),admin_addNewProduct_post)

route.get("/allproducts",auth,admin_allProducts_get)
route.get("/allproducts/changeStatus",auth,admin_ProductChangeStatus_get)
route.get("/allProducts/:id",auth,admin_productDetails_get)
route.get("/allProducts/delete/:id",auth,admin_allProduct_delete)
route.get("/allProducts/update/:id",auth,admin_UpdateProduct_get)
route.post("/allProducts/update/:id",auth,multer({
    storage:multer.diskStorage({
        destination:function (req,file,cb) {
            cb(null,"./public/uploads")
        },
        filename:function (req,file,cb) {
            cb(null,Date.now() + "_" + file.originalname)
        }
    })
}).array(["images"]),admin_UpdateProduct_post)

route.get("/orders",auth,admin_allOrders_get)
route.get("/orders/changeStatus",auth,admin_ordersChangeStatus_get)
route.get("/orders/:id",auth,admin_orderDetails_get)
route.get("/orders/delete/:id",auth,admin_allOrders_delete)

route.get("/register",admin_register_get)
route.post("/register",bodyParser,admin_register_post)

route.get("/login",admin_login_get)
route.post("/login",bodyParser,admin_login_post)

route.get("/logout",auth,admin_logout_get)

route.get("/profile",auth,admin_profile_get)
route.post("/profile",auth,multer({
    storage:multer.diskStorage({
        destination:function (req,file,cb) {
            cb(null,"./public/uploads")
        },
        filename:function (req,file,cb) {
            cb(null,Date.now() + "_" + file.originalname)
        }
    })
}).single("image"),admin_profile_post)

module.exports = route