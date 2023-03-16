const express = require("express")
const route = express.Router()
// body-parser
const bodyParser = require("body-parser").urlencoded({extended: true})
// multer
const multer = require("multer")
// Url DB 
// const URL_DB = "mongodb+srv://imadtawab:azertyuiop@cluster0.4inwqai.mongodb.net/mystore?retryWrites=true&w=majority"
// Auth
const {auth} = require("../../models/guard_auth")
// // flash
// const flash = require("connect-flash")

// // use
// route.use(flash())

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
    admin_confirmAccount_get,

    admin_login_get,
    admin_login_post,
    admin_forgotPassword_get,
    admin_forgotPassword_post,
    admin_forgotPasswordCode_get,
    admin_forgotPasswordCode_post,

    admin_logout_get,
    admin_profile_get,
    // admin_profile_post
    admin_profile_updateImageProfile_post,
    admin_profile_deleteImageProfile_post,
    admin_profile_updateUserName_post,
    admin_profile_updateStoreName_post,
    admin_profile_updateStoreLogo_post,
    admin_profile_deleteStoreLogo_post,
    admin_profile_updateEmail_post,
    admin_profile_updatePassword_post,
    admin_statistics_get,
    admin_ordersManyEvent_post,
    admin_allproductsManyEvent_post
} = require("../../controllers/adminController")

// // express session
const session = require("express-session")
// // const { db } = require("../../models/addProductSchema")
// // mongodb Store
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
    resave: false,
    saveUninitialized: false
}))

// #########################################

// const cookieSession = require('cookie-session')

// route.use(cookieSession({
//   name: 'sessionn',
//   keys: [ "secret keys" ],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))
// #########################################

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
route.post("/allproducts/many",bodyParser,admin_allproductsManyEvent_post)
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
route.post("/orders/many",bodyParser,admin_ordersManyEvent_post)
route.get("/orders/:id",auth,admin_orderDetails_get)
route.get("/orders/delete/:id",auth,admin_allOrders_delete)

route.get("/statistics",auth,admin_statistics_get)

route.get("/profile",auth,admin_profile_get)
// route.post("/profile",auth,multer({
//     storage:multer.diskStorage({
//         destination:function (req,file,cb) {
//             cb(null,"./public/uploads")
//         },
//         filename:function (req,file,cb) {
//             cb(null,Date.now() + "_" + file.originalname)
//         }
//     })
// }).single("image"),admin_profile_post)

route.post("/profile/update-imageProfile",auth,multer({
    storage:multer.diskStorage({
        destination:function (req,file,cb) {
            cb(null,"./public/uploads")
        },
        filename:function (req,file,cb) {
            cb(null,Date.now() + "_" + file.originalname)
        }
    })
}).single("image"),admin_profile_updateImageProfile_post)
route.post("/profile/delete-imageProfile",auth,bodyParser,admin_profile_deleteImageProfile_post)


route.post("/profile/update-username",auth,bodyParser,admin_profile_updateUserName_post)
route.post("/profile/update-storename",auth,bodyParser,admin_profile_updateStoreName_post)
route.post("/profile/update-storeLogo",auth,multer({
    storage:multer.diskStorage({
        destination:function (req,file,cb) {
            cb(null,"./public/uploads")
        },
        filename:function (req,file,cb) {
            cb(null,Date.now() + "_" + file.originalname)
        }
    })
}).single("storeLogo"),admin_profile_updateStoreLogo_post)
route.post("/profile/delete-storeLogo",auth,bodyParser,admin_profile_deleteStoreLogo_post)

route.post("/profile/update-email",auth,bodyParser,admin_profile_updateEmail_post)
route.post("/profile/update-password",auth,bodyParser,admin_profile_updatePassword_post)

route.get("/register",admin_register_get)
route.post("/register",bodyParser,admin_register_post)

route.get("/register/confirm/:activationCode",admin_confirmAccount_get)

route.get("/login",admin_login_get)
route.post("/login",bodyParser,admin_login_post)
route.get("/login/forgot-password",admin_forgotPassword_get)
route.post("/login/forgot-password",bodyParser,admin_forgotPassword_post)
route.get("/login/forgot-password/:forgotPasswordCode",admin_forgotPasswordCode_get)
route.post("/login/forgot-password/:forgotPasswordCode",bodyParser,admin_forgotPasswordCode_post)

route.get("/logout",auth,admin_logout_get)

module.exports = route