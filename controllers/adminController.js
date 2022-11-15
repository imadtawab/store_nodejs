
// all product schema
const allProducts = require("../models/addProductSchema")
const allOrders = require("../models/newOrderSchema")
const registerAccount = require("../models/registerSchema")

const visitor = require("../models/numberVisitors")
// bcrypt
const bcrypt = require("bcrypt")


// nodemailer
// const nodemailer = require("nodemailer")

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "imadtawab03@gmail.com",
//         pass: "Leroirimadleroi@"
//     }
// })

// const mailOptions = {
//     from: "imadtawab03@gmail.com",
//     to: "imadtawab@gmail.com",
//     subject: "Welecom to Stoeino",
//     text: "welecom imad in storeino blabla"
// }
// transporter.sendMail(mailOptions,function (error, info) {
//     if (error) {
//         console.log(error,"ffffffff");
//     } else {
//         console.log("Email sent : " + info.response);      
//         console.log("###########")
//     }
// })
 







// ##################

    // async..await is not allowed in global scope, must use a wrapper
    // async function main() {
    // // Generate test SMTP service account from ethereal.email
    // // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //     user: "imadtawab03@gmail.com", // generated ethereal user
    //     pass: "Leroirimadleroi@", // generated ethereal password
    //     },
    // });

    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: 'imadtawab03@gmail.com', // sender address
    //     to: "imadtawab@gmail.Com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });

    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    // }

    // main().catch(console.error);
// ##################






// Controllers Functions
const admin_addNewProduct_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        res.render("addNewProduct",{pageName:"Add Product",user:user})
    }).catch(err => console.log(err))
}
const admin_addNewProduct_post = (req,res) => {
    let imagesArray = []
    req.files.map((file) => {
        imagesArray.push(file.filename)
    })
    let date = new Date()
    function checkDate(mydate) {
        return mydate > 9 ? mydate : "0"+mydate
    }
    new allProducts({
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        sub_price: req.body.sub_price,
        discount: req.body.discount,
        images: imagesArray,
        shoes_size: req.body.shoes_size,
        colors: req.body.colors,
        clothes_size: req.body.clothes_size,
        status: req.body.status,
        addedIn: `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
      }).save()
    .then((result) => {
    // console.log(result,"saved !!")  
      res.redirect("/admin/addNewProduct")
    })
}

const admin_allProducts_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allProducts.find().then((result) => {
            res.render("allProducts",{pageName:"MyProduct",allProducts:result,user:user})
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
} 

const admin_allProduct_delete = (req,res) => {
    allProducts.deleteOne({_id:req.params.id}).then((result) => {
        // console.log(result,"delete !!")
        res.redirect("/admin/allproducts")
    }).catch(err => console.log(err))
}

const admin_productDetails_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allProducts.findById(req.params.id).then((product) => {
            res.render("productDetailsAdmin",{pageName:product.title,product:product,user:user})
        })
    }).catch(err => console.log(err))
}
const admin_allOrders_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allOrders.find().then((orders) => {
                res.render("allOrders",{pageName:"All Orders",allOrders:orders,user:user})
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
} 
const admin_orderDetails_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allOrders.findById(req.params.id).then((order) => {
            res.render("orderDetails",{pageName:order.product.title,order:order,user:user})
        })
    }).catch(err => console.log(err))
}
const admin_dashboard_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allOrders.find().then((orders) => {
            visitor.find().then((visitors) => {
                res.render("dashboard",{pageName:"All Orders",allOrders:orders,user:user,visitors:visitors.length})
            }).catch(err => console.log(err))
                
                // console.log("Total Visitor = " + req.session.views)
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
const admin_allOrders_delete =  (req,res) => {
    allOrders.deleteOne({_id:req.params.id}).then((result) => {
        console.log(result,"delete !!")
        res.redirect("/admin/orders")
    }).catch(err => console.log(err))
}
const admin_UpdateProduct_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allProducts.findById(req.params.id).then((product) => {
            res.render("updateProduct",{pageName:"Update product",product:product,user:user})
        })
    }).catch(err => console.log(err))
}
const admin_UpdateProduct_post = (req,res) => {
    let date = new Date()
    function checkDate(mydate) {
        return mydate > 9 ? mydate : "0"+mydate
    }
    allProducts.updateOne({_id:req.params.id},{
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        sub_price: req.body.sub_price,
        discount: req.body.discount,
        shoes_size: req.body.shoes_size,
        colors: req.body.colors,
        clothes_size: req.body.clothes_size,
        status: req.body.status,
        addedIn: `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
      }).then((result) => {
        res.redirect('/admin/allproducts')
    })
}
const admin_ProductChangeStatus_get = (req,res) => {
    allProducts.updateOne({_id:req.query.id},{
        status: req.query.status,
      }).then((result) => {
        res.redirect('/admin/allproducts')
    })
}
const admin_ordersChangeStatus_get = (req,res) => {
    let date = new Date()
    function checkDate(mydate) {
        return mydate > 9 ? mydate : "0"+mydate
    }
    let addIn = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
    
    allOrders.findById(req.query.id).then((order) => {
        let oldStatus = order.status
        oldStatus.push({statue: req.query.status,in: addIn})
        allOrders.updateOne({_id:req.query.id},{
            status: oldStatus
        }).then((result) => {
            res.redirect('/admin/orders')
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))

}
const admin_register_get = (req,res) => {
    
    res.render("register",{pageName:"Create Account",msg:req.flash("error")[0],myuser:req.flash("myuser")[0]})
}

const admin_register_post = (req,res) => {
    let date = new Date()
    function checkDate(mydate) {
        return mydate > 9 ? mydate : "0"+mydate
    }
    registerAccount.findOne({email:req.body.email}).then((user) => {
        if (user) {
            // console.log("This email is used ...")
            req.flash("error","This email is used ...")
            req.flash("myuser",{email:req.body.email,userName:req.body.userName})
            res.redirect("/admin/register")
        }else{
            bcrypt.hash(req.body.password,10).then((hPass) => {
                new registerAccount({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hPass,
                    addedIn: `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`,
                }).save().then((result) => {
                    res.redirect("/admin/login")
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }
    }).catch(err => console.log(err))

} 

const admin_login_get = (req,res) => {
    res.render("login",{pageName:"Login",msg:req.flash("error")[0],myuser:req.flash("myuser")[0]})
}
const admin_login_post = (req,res) => {
    registerAccount.findOne({email:req.body.email}).then((verifUser) => {
        if (verifUser) {
            bcrypt.compare(req.body.password,verifUser.password).then((verifPass) => {
                if(verifPass){
                    req.session.userId = verifUser._id
                    // console.log("Welecom " + verifUser.userName)
                    res.redirect("/admin")
                }else{
                    // console.log("Password Not Correct ...")
                    req.flash("error","Email Or Password Not Correct ...")
                    req.flash("myuser",{email:req.body.email})
                    res.redirect("/admin/login")
                }

            })
        } else {
            // console.log("This Email Not Exist ...")
            req.flash("error","Email Or Password Not Correct ...")
            req.flash("myuser",{email:req.body.email})
            res.redirect("/admin/login")
        }
    })
}

const admin_logout_get = (req,res) => {
    req.session.destroy(() => {
        res.redirect("/admin/login")
    })
}

const admin_profile_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        res.render("profile",{pageName:"Profile",user:user})
    }).catch(err => console.log(err))
}
const admin_profile_post = (req,res) => {
        bcrypt.hash(req.body.password,10).then((hPass) => {
            if (req.file) {
                registerAccount.updateOne({_id:req.session.userId},{
                    userName:req.body.userName,
                    email:req.body.email,
                    password:hPass,
                    image:req.file.filename
                }).then((user) => {
                    res.redirect("/admin/profile")
                }).catch(err => console.log(err))
            } else {
                registerAccount.updateOne({_id:req.session.userId},{
                    userName:req.body.userName,
                    email:req.body.email,
                    password:hPass,
                }).then((user) => {
                    res.redirect("/admin/profile")
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
}
module.exports = {
    admin_addNewProduct_get,
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
}