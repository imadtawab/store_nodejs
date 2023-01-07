let auth = (req,res,next) => {
    if(req.session.userId){
        next()
    }else{
        res.redirect("/admin/login")
    }
}
module.exports = {auth}