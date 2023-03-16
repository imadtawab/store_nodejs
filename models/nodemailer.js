const nodemailer = require("nodemailer")

// const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "testrimad@gmail.com",
//         pass: "uthjvmlvdrxuiwgj",
//     },
// });
module.exports.transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "testrimad@gmail.com",
        pass: "uthjvmlvdrxuiwgj",
    },
});


// module.exports.sendConfirmationEmail = (email, activationCode) => {
//     transport.sendMail({
//         from: "testrimad@gmail.com",
//         to: email,
//         subject: "Confirm your acount",
//         html: ` <div style="backgroun-color: #fff; color:#555">
//                     <h1>Email for Confirmation</h1>
//                     <h2>Hello ,</h2>
//                     <p>For active your acount , Please click in the link</p>
//                     <a href="http://127.0.0.1:5555/admin/register/confirm/${activationCode}"> Click here !</a>
//                 </div>`
//         }).then((docs) => {
//             console.log(docs,"email sended ...");
//         }).catch(err => console.log(err,"not send"))
// }