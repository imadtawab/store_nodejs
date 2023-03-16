
// all product schema
const allProducts = require("../models/addProductSchema")
const allOrders = require("../models/newOrderSchema")
const registerAccount = require("../models/registerSchema")
const fs = require("fs")
const visitor = require("../models/numberVisitors")
// bcrypt
const bcrypt = require("bcrypt")
// const {auth} = require("../models/guard_auth")
const { transport } = require("../models/nodemailer")


// Controllers Functions
const admin_addNewProduct_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        res.render("addNewProduct",{
            pageName:"Add Product",
            user:user,
            msg_lastPopup:req.flash("last-popup")[0]
        })
        
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

    registerAccount.findById(req.session.userId).then((user) => {
        new allProducts({
            userID: user._id,
            type: req.body.type,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            sub_price: req.body.sub_price,
            discount: req.body.discount,
            shipping: req.body.shipping,
            images: imagesArray,
            shoes_size: req.body.shoes_size,
            colors: req.body.colors,
            quantite: "",
            clothes_size: req.body.clothes_size,
            status: req.body.status,
            addedIn: `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
          }).save()
          .then((result) => {
          console.log(result,"saved !!") 
              req.flash("last-popup","Product Added ...") 
              res.redirect("/admin/addNewProduct")
          }).catch(err => console.log(err))
    }) .then((result) => {}).catch(err => console.log(err))
}

const admin_allProducts_get = (req,res) => {

    registerAccount.findById(req.session.userId).then((user) => {
        allProducts.find({userID: user._id}).then((result) => {
            // console.log(result , "dddddddd" ,req.session.id , "dddddddddddddddddddd")
            res.render("allProducts",{
                pageName:"MyProduct",
                allProducts:result,
                user:user,
                msg_lastPopup:req.flash("last-popup")[0],
                msg_lastPopup_delete:req.flash("last-popup_delete")[0]
            })
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
} 
const admin_allproductsManyEvent_post = (req,res) => {
    if(req.body.event == "deleteMany"){
        console.log(req.body.checkboxForProduct,"delete  .........")
        let myImages = []
        allProducts.find({"_id" : req.body.checkboxForProduct}).then((products) => {
            console.log(products,"products...");
            products.forEach(product => {
                myImages.push(...product.images)
            })
            myImages.forEach((image,index) => {
                const path = "./public/uploads/" + image
                fs.unlink(path,(err) => {
                    if (err) {
                        console.log(err,"not deleted ???")
                    } else {
                        console.log("image deleted ...");
                    }
                })
                if (index + 1 == myImages.length) {
                    console.log("finish");
                    allProducts.deleteMany({"_id" : req.body.checkboxForProduct}).then((docs) => {
                        req.flash("last-popup_delete","Product Delete ...")
                        res.redirect("/admin/allproducts")
                    }).catch(err => console.log(err))
                }
            });
        }).catch(err => console.log(err))
    }else if (req.body.event == "updateMany") {
        let counter = 0 
        console.log("update  .........");

        let mainArray = req.body.checkboxForProduct
        let secondArray = []
        if (typeof(mainArray) == "string") {
            secondArray.push(mainArray)
            mainArray = secondArray
        }
        mainArray.forEach((id) => {
                allProducts.updateOne({_id : id},{
                    status: req.body.thisStatusForMany
                }).then((docs) => {
                    counter++
                    if (counter == mainArray.length) {
                        req.flash("last-popup","Status Changed ...") 
                        res.redirect("/admin/allproducts")
                    }
                }).catch(err => console.log(err))
        })

    }else{
        res.redirect("/admin/allproducts")
    }
}
const admin_allProduct_delete = (req,res) => {
    allProducts.findById(req.params.id).then((product) => {
        product.images.forEach((image,index) => {
            const path = "./public/uploads/" + image
            fs.unlink(path,(err) => {
                if (err) {
                    console.log(err,"not deleted ???")
                } else {
                    console.log("image deleted ...");
                }
            })
            if (index + 1 == product.images.length) {
                console.log("finish");
                product.remove().then((result) => {
                        req.flash("last-popup_delete","Product Delete ...") 
                        res.redirect("/admin/allproducts")
                    }).catch(err => console.log(err))
            }
        });
    })
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
        allOrders.find({userID: user._id}).then((orders) => {
                res.render("allOrders",{pageName:"All Orders",
                allOrders:orders,
                user:user,
                msg_lastPopup_delete:req.flash("last-popup_delete")[0],
                msg_lastPopup:req.flash("last-popup")[0]
            })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
} 
const admin_orderDetails_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allOrders.findById(req.params.id).then((order) => {
            res.render("orderDetails",{pageName:`${order.quantite} | ${order.fullName}`,order:order,user:user})
        })
    }).catch(err => console.log(err))
}
const admin_dashboard_get = (req,res) => {
    console.log(req.session,"zz");
    registerAccount.findById(req.session.userId).then((user) => {
        allOrders.find({userID: user._id}).then((orders) => {
            visitor.find({storeName: user.storeName}).then((visitors) => {                
                res.render("dashboard",{pageName:"All Orders",allOrders:orders,user:user,visitors:visitors})
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => {
        res.redirect("/admin/login")
    })
}
const admin_statistics_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allOrders.find({userID: user._id}).then((orders) => {
            visitor.find({storeName: user.storeName}).then((visitors) => {
                res.render("statistics",{pageName:"All Orders",allOrders:orders,user:user,visitors:visitors})
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
const admin_allOrders_delete =  (req,res) => {
    allOrders.deleteOne({_id:req.params.id}).then((result) => {
        req.flash("last-popup_delete","Order Delete ...") 
        res.redirect("/admin/orders")
    }).catch(err => console.log(err))
}
const admin_ordersManyEvent_post = (req,res) => {
    if(req.body.event == "deleteMany"){
        console.log("delete  .........");
        allOrders.deleteMany({"_id" : req.body.checkboxForProduct}).then((docs) => {
            req.flash("last-popup_delete","Product Delete ...") 
            res.redirect("/admin/orders")
        }).catch(err => console.log(err))
    }else if (req.body.event == "updateMany") {
        let date = new Date()
    function checkDate(mydate) {
        return mydate > 9 ? mydate : "0"+mydate
    }
    let addIn = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
        let counter = 0 
        console.log("update  .........");

        let mainArray = req.body.checkboxForProduct
        let secondArray = []
        if (typeof(mainArray) == "string") {
            secondArray.push(mainArray)
            mainArray = secondArray
        }
        mainArray.forEach((id) => {
            allOrders.findById(id).then((prod) => {
                let statusArray = prod.status
                statusArray.push({
                    statue: req.body.thisStatusForMany,
                    in: addIn
                })
                allOrders.updateOne({_id : id},{
                    status: statusArray
                }).then((docs) => {
                    counter++
                    if (counter == mainArray.length) {
                        req.flash("last-popup","Status Changed ...") 
                        res.redirect("/admin/orders")
                    }
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        })

        // if (typeof(req.body.checkboxForProduct) != "string") {
        //     req.body.checkboxForProduct.forEach((id) => {
        //         allOrders.findById(id).then((prod) => {
        //             let statusArray = prod.status
        //             statusArray.push({
        //                 statue: req.body.thisStatusForMany,
        //                 in: addIn
        //             })
        //             allOrders.updateOne({_id : id},{
        //                 status: statusArray
        //             }).then((docs) => {
        //                 console.log("update !!!!!!!!!!!");
        //                 counter++
        //                 if (counter == req.body.checkboxForProduct.length) {
        //                     res.redirect("/admin/orders")
        //                 }
        //             }).catch(err => console.log(err))
        //         }).catch(err => console.log(err))
        //     })
        // }else{
        //         allOrders.findById(req.body.checkboxForProduct).then((prod) => {
        //             let statusArray = prod.status
        //             statusArray.push({
        //                 statue: req.body.thisStatusForMany,
        //                 in: addIn
        //             })
        //             allOrders.updateOne({_id : req.body.checkboxForProduct},{
        //                 status: statusArray
        //             }).then((docs) => {
        //                 console.log("update !!!!!!!!!!!");
        //                 res.redirect("/admin/orders")
        //             }).catch(err => console.log(err))
        //         }).catch(err => console.log(err))
        // }
    }else{
        res.redirect("/admin/orders")
    }
}
const admin_UpdateProduct_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        allProducts.findById(req.params.id).then((product) => {
            res.render("updateProduct",{
                pageName:"Update product",
                product:product,
                user:user
            })
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
        shipping: req.body.shipping,
        shoes_size: req.body.shoes_size,
        colors: req.body.colors,
        clothes_size: req.body.clothes_size,
        status: req.body.status,
        addedIn: `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
      }).then((result) => {
        req.flash("last-popup","Product Update ...") 
        res.redirect('/admin/allproducts')
    })
}
const admin_ProductChangeStatus_get = (req,res) => {
    allProducts.updateOne({_id:req.query.id},{
        status: req.query.status,
      }).then((result) => {
        req.flash("last-popup","Status Changed ...") 
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
            req.flash("last-popup","Status Changed ...") 
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
    // create activationCode token
    let characters = "0123456789abcdefghijklmnopqrstuvwxyzyxwvutsrqponABCDEFGHIJKLMNOPQRSTUVWXYZYXWVUTSRQPON"
    let activationCode = ""
    for (let i = 0; i < 25; i++) {
        activationCode += characters[Math.floor(Math.random() * characters.length)]        
    }
    // end activationCode token
    registerAccount.findOne({email:req.body.email}).then((user) => {
        if (user) {
            // console.log("This email is used ...")
            req.flash("error","This email is used ...")
            req.flash("myuser",{email:req.body.email , userName:req.body.userName , storeName:req.body.storeName})
            res.redirect("/admin/register")
        }else{
            registerAccount.findOne({storeName:req.body.storeName}).then((storeName) => {
                if (storeName || req.body.storeName == "admin") {
                    req.flash("error","This store name is used ...")
                    req.flash("myuser",{email:req.body.email , userName:req.body.userName , storeName:req.body.storeName})
                    res.redirect("/admin/register")
                } else {
                    bcrypt.hash(req.body.password,10).then((hPass) => {
                        new registerAccount({
                            userName: req.body.userName,
                            storeName: req.body.storeName,
                            email: req.body.email,
                            password: hPass,
                            activationCode: activationCode,
                            addedIn: `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`,
                        }).save().then(async (result) => {
                            let sendConfirmationEmail = (email, activationCode) => {
                                    transport.sendMail({
                                        from: "testrimad@gmail.com",
                                        to: email,
                                        subject: "Confirm your acount",
                                        html: ` <div>
                                                    <h1>Email for Confirmation</h1>
                                                    <h2>Hello ,</h2>
                                                    <p>For active your acount , Please click in the link</p>
                                                    <a href="http://127.0.0.1:5555/admin/register/confirm/${activationCode}"> Click here !</a>
                                                </div>`
                                        }).then((docs) => {
                                            console.log(docs,"email sended ...");
                                            res.render("confirmAccount",{pageName:"Confirm account",confirmAcount:false})

                                        }).catch(err => {
                                            console.log(err,"not send")
                                            res.redirect("/admin/register")
                                        })
                                }
                                await sendConfirmationEmail(req.body.email,activationCode)
                            // await sendConfirmationEmail(req.body.email,activationCode)
                            // req.flash("error","Please verify your email ...")
                            // req.flash("myuser",{email:req.body.email})
                            // res.redirect("/admin/login")
                            // res.render("confirmAccount",{pageName:"Confirm account",confirmAcount:false})
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
            })
        }
    }).catch(err => console.log(err))

} 

const admin_confirmAccount_get = (req,res) => {
    registerAccount.findOne({activationCode:req.params.activationCode}).then((user) => {
        if (user) {
            user.isActive = true
            user.activationCode = null
            user.save()
            // req.flash("confirmMessage","Your account is successfully active")
            res.render("confirmAccount",{pageName:"Confirm account",confirmAcount:true})

        } else {
            res.redirect("/admin/login")
        }
    })
}

const admin_login_get = (req,res) => {
    res.render("login",{pageName:"Login",
    msg:req.flash("error")[0],
    myuser:req.flash("myuser")[0],
    confirmMessage:req.flash("confirmMessage")[0]})
}
const admin_login_post = (req,res) => {
    registerAccount.findOne({email:req.body.email}).then((verifUser) => {
        if (verifUser) {
            bcrypt.compare(req.body.password,verifUser.password).then((verifPass) => {
                if(verifPass){
                    if (verifUser.isActive) {
                        req.session.userId = verifUser._id
                        res.redirect("/admin")
                    }else{
                        // req.flash("error","Please verify your email ...")
                        // req.flash("myuser",{email:req.body.email})
                        // res.redirect("/admin/login")
                        res.render("confirmAccount",{pageName:"Confirm account",confirmAcount:false})
                    }
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
const admin_forgotPassword_get = (req,res) => {
    res.render("forgotPassword",{pageName:"Forgot Password",failedUserEmail: req.flash("failedUserEmail")[0],forgotPasswordPage: false})
}
const admin_forgotPassword_post = (req,res) => {
        // create activationCode token
        let characters = "0123456789abcdefghijklmnopqrstuvwxyzyxwvutsrqponABCDEFGHIJKLMNOPQRSTUVWXYZYXWVUTSRQPON"
        let forgotPasswordCode = ""
        for (let i = 0; i < 25; i++) {
            forgotPasswordCode += characters[Math.floor(Math.random() * characters.length)]        
        }
        // end activationCode token
        registerAccount.findOne({email:req.body.email}).then((user) => {
            if (user) {
                user.forgotPasswordCode = forgotPasswordCode
                user.save()
                .then( async () => {
                    let sendConfirmationEmail = (email, forgotPasswordCode) => {
                        transport.sendMail({
                            from: "testrimad@gmail.com",
                            to: email,
                            subject: "Confirm your acount",
                            html: ` <div>
                                        <h1>Email for forgot password</h1>
                                        <h2>Hello ,</h2>
                                        <p>For forgot your password , Please click in the link</p>
                                        <a href="http://127.0.0.1:5555/admin/login/forgot-password/${forgotPasswordCode}"> Click here !</a>
                                    </div>`
                            }).then((docs) => {
                                console.log(docs,"email sended ...");
                                res.render("confirmAccount",{pageName:"Forgot Password",confirmAcount:false})
                            }).catch(err => {
                                console.log(err,"not send")
                                res.redirect("/admin/login")
                            })
                    }
                    await sendConfirmationEmail(req.body.email,forgotPasswordCode)
                }).catch((err) => {
                    console.log(err);
                    res.redirect("/admin/login/forgot-password")
                })
                // req.flash("confirmMessage","Your account is successfully active")
                // res.render("confirmAccount",{pageName:"Confirm account",confirmAcount:true})
    
            } else {
                req.flash("failedUserEmail",req.body.email)
                res.redirect('/admin/login/forgot-password')
            }
        })
}
const admin_forgotPasswordCode_get = (req,res) => {
    registerAccount.findOne({forgotPasswordCode:req.params.forgotPasswordCode}).then((user) => {
        if (user) {
            // user.isActive = true
            // user.forgotPasswordCode = null
            // user.save()
            // // req.flash("confirmMessage","Your account is successfully active")
            // res.render("confirmAccount",{pageName:"Confirm account",confirmAcount:true})
            res.render("forgotPassword",{pageName:"Forgot Password",failedUserEmail: req.flash("failedUserEmail")[0],forgotPasswordPage: true})

        } else {
            res.redirect("/admin/login")
        }
    })
}
const admin_forgotPasswordCode_post = (req,res) => {
    registerAccount.findOne({forgotPasswordCode:req.params.forgotPasswordCode}).then((user) => {
        if (user) {
            bcrypt.hash(req.body.password,10).then((hPass) => {
                registerAccount.updateOne({_id:user._id},{
                    isActive: true,
                    forgotPasswordCode: null,
                    password: hPass
                }).then((docs) => {
                    console.log(docs,"forgot done ...");
                    res.render("confirmAccount",{pageName:"Forgot Password",confirmAcount:true})
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
            // user.isActive = true
            // user.forgotPasswordCode = null
            // user.save()
            // // req.flash("confirmMessage","Your account is successfully active")
            // res.render("confirmAccount",{pageName:"Confirm account",confirmAcount:true})

        } else {
            res.redirect("/admin/login")
        }
    })
}

const admin_logout_get = (req,res) => {
    // req.session.destroy(() => {
    //     res.redirect("/admin/login")
    // })
    req.session.userId = ""
    res.redirect("/admin/login")
}

const admin_profile_get = (req,res) => {
    registerAccount.findById(req.session.userId).then((user) => {
        res.render("profile",{
            pageName:"Profile",
            user:user,
            msg_lastPopup:req.flash("last-popup")[0],
            storeNameError:req.flash("storeNameError")[0]
        })
    }).catch(err => console.log(err))
}


const admin_profile_updateImageProfile_post = (req,res) => {
        console.log(req.body.oldProfileImage,"dddddddddddddddddddddddddd");
        if (req.body.oldProfileImage) {
            const path = "./public/uploads/" + req.body.oldProfileImage
            fs.unlink(path,(err) => {
                if (err) {
                    console.log(err,"not deleted ???")
                    res.redirect("/admin/profile")
                } else {
                    console.log("image deleted ...");
                    registerAccount.updateOne({_id:req.session.userId},{
                        image:req.file.filename
                    }).then(() => {
                        req.flash("last-popup","Profile Updated") 
                        res.redirect("/admin/profile")
                    }).catch(err => console.log(err))
                }
            })
        }else{
            registerAccount.updateOne({_id:req.session.userId},{
                image:req.file.filename
            }).then(() => {
                req.flash("last-popup","Profile Updated") 
                res.redirect("/admin/profile")
            }).catch(err => console.log(err))
        }
}
const admin_profile_deleteImageProfile_post = (req,res) => {
    registerAccount.findOne({_id:req.session.userId}).then((user) => {
        const path = "./public/uploads/" + user.image
        fs.unlink(path,(err) => {
            if (err) {
                console.log(err,"not deleted ???")
                res.redirect("/admin/profile")
            } else {
                console.log("image deleted ...");
                user.image = null
                user.save().then(() => {
                        req.flash("last-popup","Profile Deleted") 
                        res.redirect("/admin/profile")
                    }).catch(err => console.log(err))
            }
        })
    }).catch(err => console.log(err,"for delete profile"))
}
const admin_profile_updateUserName_post = (req,res) => {
    registerAccount.updateOne({_id:req.session.userId},{
        userName:req.body.userName
    }).then((user) => {
        req.flash("last-popup","UserName Updated") 
        res.redirect("/admin/profile")
    }).catch(err => console.log(err))
}
const admin_profile_updateStoreName_post = (req,res) => {
    registerAccount.findOne({storeName:req.body.storeName}).then((storeName) => {
        if (storeName || req.body.storeName == "admin") {
            req.flash("storeNameError","storeName is used !!!") 
            res.redirect("/admin/profile")
        } else {
            registerAccount.updateOne({_id:req.session.userId},{
                storeName:req.body.storeName
            }).then((user) => {
                req.flash("last-popup","storeName Updated") 
                res.redirect("/admin/profile")
            }).catch(err => console.log(err))
        }})

}
const admin_profile_updateStoreLogo_post = (req,res) => {
    console.log(req.body.oldStoreLogo,"dddddddddddddddddddddddddd");
    if (req.body.oldStoreLogo) {
        const path = "./public/uploads/" + req.body.oldStoreLogo
        fs.unlink(path,(err) => {
            if (err) {
                console.log(err,"not deleted ???")
                res.redirect("/admin/profile")
            } else {
                console.log("image deleted ...");
                registerAccount.updateOne({_id:req.session.userId},{
                    storeLogo:req.file.filename
                }).then(() => {
                    req.flash("last-popup","StoreLogo Updated") 
                    res.redirect("/admin/profile")
                }).catch(err => console.log(err))
            }
        })
    }else{
        registerAccount.updateOne({_id:req.session.userId},{
            storeLogo:req.file.filename
        }).then(() => {
            req.flash("last-popup","StoreLogo Updated") 
            res.redirect("/admin/profile")
        }).catch(err => console.log(err))
    }
}
const admin_profile_deleteStoreLogo_post = (req,res) => {
    registerAccount.findOne({_id:req.session.userId}).then((user) => {
        console.log(user.storeLogo);
        const path = "./public/uploads/" + user.storeLogo
        fs.unlink(path,(err) => {
            if (err) {
                console.log(err,"not deleted ???")
                res.redirect("/admin/profile")
            } else {
                console.log("image deleted ...");
                user.storeLogo = null
                user.save().then(() => {
                        req.flash("last-popup","StoreLogo Deleted") 
                        res.redirect("/admin/profile")
                    }).catch(err => console.log(err))
            }
        })
    }).catch(err => console.log(err,"for delete logo"))
}
const admin_profile_updateEmail_post = (req,res) => {
    registerAccount.updateOne({_id:req.session.userId},{
        email:req.body.email
    }).then((user) => {
        req.flash("last-popup","Email Changed") 
        res.redirect("/admin/profile")
    }).catch(err => console.log(err))
}
const admin_profile_updatePassword_post = (req,res) => {
        bcrypt.hash(req.body.password,10).then((hPass) => {
                registerAccount.updateOne({_id:req.session.userId},{
                    password:hPass,
                }).then((user) => {
                    req.flash("last-popup","Password Changed") 
                    res.redirect("/admin/profile")
                }).catch(err => console.log(err))
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
}