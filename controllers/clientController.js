const allProducts = require("../models/addProductSchema")
const allOrders = require("../models/newOrderSchema")
// const visitor = require("../models/numberVisitors")

// ##############################



// ##############################



const client_home_get = (req,res,next) => {
    allProducts.find().then((result) => {
        res.render("home",{pageName:"Home",allProducts:result})
    // if (!req.session.visitor) {
        // req.session.visitor = "visitor"
        // console.log(req.session,"aaaaaaaa!!!!")
    // }
    }).catch(err => console.log(err))

}
const client_productDetails_get = (req,res) => {
    allProducts.findById(req.params.id).then((result) => {
        res.render("productDetailsClient",{
            pageName:result.title,
            product:result,
            msg_lastPopup:req.flash("last-popup")[0]
        })
    }).catch(err => console.log(err))
}

const client_productDetails_post = (req,res) => {
    
    let date = new Date()
    function checkDate(mydate) {
        return mydate > 9 ? mydate : "0"+mydate
    }
    let addIn = `${checkDate(date.getFullYear())}-${checkDate(date.getMonth() + 1)}-${checkDate(date.getDate())} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}`
    allProducts.findById(req.body.productId).then((product) => {
        new allOrders({
            product: product,
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
            req.flash("last-popup","Successful order") 
            res.redirect(`/${req.body.productId}`)
          }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
module.exports = {
    client_home_get,
    client_productDetails_get,
    client_productDetails_post
}