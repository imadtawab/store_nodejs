const allProducts = require("../models/addProductSchema")
const allOrders = require("../models/newOrderSchema")
const registerAccount = require("../models/registerSchema")
const visitor = require("../models/numberVisitors")
// const cookieSession = require("cookie-session")
// const { Cookie } = require("express-session")
// const visitor = require("../models/numberVisitors")


// ##############################



// ##############################



const client_home_get = (req,res) => {
    registerAccount.findOne({storeName:req.params.subdomain}).then( (user) => {
        if(user){
            allProducts.find({userID : user._id}).then((result) => {
                res.render("home",{pageName:"Home",
                allProducts:result,
                storeName:req.params.subdomain,
                storeLogo:user.storeLogo,
                filter:{
                    collection : "all collection"
                }
            })
            }).catch(err => console.log(err))
  
        }else {
            res.redirect("/")
        }
    }).catch(err => console.log(err))


}
// const client_home_post = (req,res) => {
//     console.log("eee",req.query,"bbb");
//     registerAccount.findOne({storeName:req.params.subdomain}).then((user) => {
//         if(user){
//             allProducts.find({type : req.query.collection}).then((result) => {
//                 console.log("dddddddddddddddddddddddddddddddd");
//                 res.render("home",{pageName:"Home",allProducts:result,storeName:req.params.subdomain})
//             }).catch(err => console.log(err))
//         }else {
//             res.redirect("/")
//         }
//     }).catch(err => console.log(err))

// }
const client_productDetails_get = (req,res) => {
    registerAccount.findOne({storeName:req.params.subdomain}).then((user) => {
        if(user){
                allProducts.findById(req.params.id).then((result) => {
                    // console.log(req.session,"????????????????????");
                    res.render("productDetailsClient",{
                        pageName:result.title,
                        product:result,
                        msg_lastPopup:req.flash("last-popup")[0],
                        storeName:req.params.subdomain,
                        storeLogo:user.storeLogo
                    })
                }).catch(err =>{
                    res.redirect(`/${req.params.subdomain}`)
                    console.log(err)
                })
                     

        }else {
            res.redirect("/")
        }
    }).catch(err => console.log(err))

}

const client_productDetails_post = (req,res) => {
    registerAccount.findOne({storeName:req.params.subdomain}).then((user) => {
        if(user){
            let addIn = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
            allProducts.findById(req.body.productId).then((product) => {
                new allOrders({
                    userID: product.userID,
                    products: product,
                    fullName: req.body.fullName,
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    shoe_size: req.body.shoes_size,
                    color: req.body.colors,
                    clothe_size: req.body.clothes_size,
                    quantite: req.body.quantite,
                    total: req.body.total,
                    status: [{statue:"pending",in: addIn}],
                    addedIn: addIn
                  }).save().then((result) => {
                    // console.log(result + "eeeeeeeeeeeeeeee")
                    registerAccount.findById(result.userID).then((user) => {
                        let arrOrder = user.newOrder
                        arrOrder.push(result)
                        registerAccount.updateOne({id: user._id},{
                            newOrder: arrOrder
                        }).then((doc) => {
                            console.log(doc + "user Order Update ............");
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                    req.flash("last-popup","Successful order")
                    res.redirect(`/${req.params.subdomain}/${req.body.productId}`)
                  }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }else {
            res.redirect("/")
        }
    }).catch(err => console.log(err))
    let date = new Date()
    function checkDate(mydate) {
        return mydate > 9 ? mydate : "0"+mydate
    }

}

const client_redirectToShoppingCard_get = (req,res) => {
    registerAccount.findOne({storeName:req.params.subdomain}).then((user) => {
        if(user){
            console.log(user,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                res.render("redirectToShoppingCard",{
                    storeName:req.params.subdomain,
                    storeLogo:user.storeLogo,
                    msg_forRemoveStorage:req.flash("forRemoveStorage")[0]})
            
        
        }else {
            res.redirect("/")
        }
    }).catch(err => console.log(err))
}
const client_shoppingCard_post  = (req,res) => {
    registerAccount.findOne({storeName:req.params.subdomain}).then((user) => {
        if(user){
            if (req.body.shoppingId != "undefined") {
                let allIds =[]
                JSON.parse(req.body.shoppingId).forEach(prod => {
                    allIds.push(prod._id)
                });
                console.log(JSON.parse(req.body.shoppingId),"aaa",allIds);
                allProducts.find({"_id" : allIds}).then((docs) => {
                    // allProducts.find({userID : user._id}).then((user) => {
                        console.log(user.storeLogo,"nnnnnnnnnnnnnnnnnnnnnnnn");
                        res.render("shoppingCard",{
                            shoppingCard:docs,
                            shoppingCard_empty:false,
                            storeName:req.params.subdomain,
                            storeLogo:user.storeLogo,
                            msg_lastPopup:req.flash("last-popup")[0]})
                    // }).catch(err => console.log(err))
               
                    console.log(docs , "finaly ♥♥♥☻");
                }).catch(err => console.log(err))
            }else{
                allProducts.find({userID : user._id}).then(() => {
                    res.render("shoppingCard",{
                        shoppingCard_empty:"Your shopping card is empty",
                        storeName:req.params.subdomain,
                        storeLogo:user.storeLogo,
                        msg_lastPopup:req.flash("last-popup")[0]})
                }).catch(err => console.log(err))
    
            }
        }else {
            res.redirect("/")
        }
    }).catch(err => console.log(err))


}
const client_shoppingCard_get =  (req,res) => {
    registerAccount.findOne({storeName:req.params.subdomain}).then((user) => {
        if(user){
            res.redirect(`/${req.params.subdomain}/redirectToShoppingCard`)
        }else {
            res.redirect("/")
        }
    }).catch(err => console.log(err))
}
const client_shoppingCardBuy_post = (req,res) => {
    registerAccount.findOne({storeName:req.params.subdomain}).then((user) => {
        if(user){
            let date = new Date()
            function checkDate(mydate) {
                return mydate > 9 ? mydate : "0"+mydate
            }
            let addIn = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
        
            // start
            let allShopping = JSON.parse(req.body.allShoppingProducts)
            let totalPrice = 0
            let totalQuantite = 0
            let allIds =[]
            console.log(allShopping);

            allShopping.forEach(prod => {
                allIds.push(prod._id)
            });
            console.log("aaa",allIds);
            allProducts.find({"_id" : allIds}).then((result) => {
                let docs = result
                docs.forEach((ord) => {
                    allShopping.forEach(prod => {
                        console.log("aaaaaaaaaaaaaaaa",ord,+ord.price,+prod.quantite,"aaaaaaaaaaaaaaa");
                        if (ord._id == prod._id) {
                            totalPrice = totalPrice + ( +ord.price * +prod.quantite )
                            totalQuantite = totalQuantite + prod.quantite
                            ord.quantite = prod.quantite
                            // allProducts.updateOne({"_id" : prod._id},{
                            //     quantite : prod.quantite
                            // }).then((result) => {
                            //     console.log(result,"nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
                            // }).catch(err => console.log(err))
                        }
                    });
                })
                console.log(totalPrice,totalQuantite);
                console.log("ddddddddddd", docs , "finaly !!!!!!!!!!",user._id);
                
                // start
                new allOrders({
                    userID: user._id,
                    products: docs,
                    fullName: req.body.fullName,
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    // shoe_size: req.body.shoes_size,
                    // color: req.body.colors,
                    // clothe_size: req.body.clothes_size,
                    quantite: totalQuantite,
                    total: totalPrice,
                    status: [{statue:"pending",in: addIn}],
                    addedIn: addIn
                  }).save().then((result) => {
                    console.log(result + "eeeeeeeeeeeeeeee")
                    registerAccount.findById(result.userID).then((user) => {
                        let arrOrder = user.newOrder
                        arrOrder.push(result)
                        registerAccount.updateOne({id: user._id},{
                            newOrder: arrOrder
                        }).then((doc) => {
                            console.log(doc + "user Order Update ............");
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                    req.flash("last-popup","Successful order")
                    req.flash("forRemoveStorage","success")
                    res.redirect(`/${req.params.subdomain}/redirectToShoppingCard`)
                  }).catch(err => console.log(err))
                // end
            }).catch(err => console.log(err))
        }else {
            res.redirect("/")
        }
    }).catch(err => console.log(err))

 

}

module.exports = {
    client_home_get,
    // client_home_post,
    client_productDetails_get,
    client_productDetails_post,
    client_redirectToShoppingCard_get,
    client_shoppingCard_post,
    client_shoppingCard_get,
    client_shoppingCardBuy_post
}