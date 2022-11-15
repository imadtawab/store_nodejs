
let aaaa
// selects
let selects = document.querySelectorAll(".select .status i")
let options = document.querySelectorAll(".select .options")
selects.forEach(select => {
    select.onclick = (eo) => {
        let my_select = eo.target.parentElement.parentElement
        options.forEach(options => {
            if(options != my_select.querySelector(".options"))
            options.classList.add("dn")
        });
        my_select.querySelector(".options").classList.toggle("dn")
        // ########################################
        my_select.querySelector(".options").style.left = `${eo.target.getBoundingClientRect().left}px`
        my_select.querySelector(".options").style.top = eo.target.getBoundingClientRect().bottom - 361 < 0 ? `0px` : `${eo.target.getBoundingClientRect().bottom - 361}px`
        document.querySelector(".table-container").onscroll = () => {
            my_select.querySelector(".options").style.left = `${eo.target.getBoundingClientRect().left}px`
            my_select.querySelector(".options").style.top = eo.target.getBoundingClientRect().bottom - 361 < 0 ? `0px` : `${eo.target.getBoundingClientRect().bottom - 361}px`
        }
        window.onscroll = () => {
            my_select.querySelector(".options").style.left = `${eo.target.getBoundingClientRect().left}px`
            my_select.querySelector(".options").style.top = eo.target.getBoundingClientRect().bottom - 361 < 0 ? `0px` : `${eo.target.getBoundingClientRect().bottom - 361}px`
        }
        // ########################################
        document.body.onclick = (eo) => {
            if (eo.target != options && eo.target != select) {
                my_select.querySelector(".options").classList.add("dn")
            }
        }
        my_select.querySelectorAll(".options .option").forEach((item) => {
            item.onclick = (opt) => {
                // modal
                let my_modal = document.querySelector("#status_my_modal")
                let confirmBtn = my_modal.querySelector(".confirm-btn")
                
                my_modal.classList.add("modal-active")


                
                my_modal.querySelector(".cancel").onclick = (cancel) => {
                    my_modal.classList.remove("modal-active")
                    my_select.querySelector(".options").classList.add("dn")
                }
                confirmBtn.onclick = (cancel) => {
                    my_modal.classList.remove("modal-active")
                    my_select.querySelector(".options").classList.add("dn")
                }
                // add href in a btn 
                confirmBtn.href = `${confirmBtn.dataset.link}/changeStatus?id=${my_select.dataset.productid}&status=${opt.target.dataset.status}`
                
            }
        })
    }
});

// modal
let btnModal = document.querySelectorAll("[data-modal]")
btnModal.forEach((btn) => {
    btn.addEventListener("click",(eo_btn) => {
        console.log(eo_btn.target)
        let sectionModal = document.getElementById(eo_btn.target.dataset.modal)
        console.log(sectionModal)
        sectionModal.classList.add("modal-active")
        sectionModal.querySelector(".cancel").onclick = (cancel) => {
            sectionModal.classList.remove("modal-active")
        }
        sectionModal.querySelector(".confirm-btn").onclick = (cancel) => {
            sectionModal.classList.remove("modal-active")
        }
    })
})
// select status
if(document.querySelector("#selectStatus")){
    document.querySelector("#selectStatus").onchange=(eo) => {
        eo.target.removeAttribute("class")
        eo.target.classList.add(eo.target.value)
    }
}

// Prices
let subPrice = document.getElementById("sub_price"),
discount = document.getElementById("discount"),
price = document.getElementById("price")

if(subPrice && discount && price){

subPrice.onchange = (eo) => {
    ckeckIfEmpty()
    price.value = Math.round(subPrice.value - ( subPrice.value * discount.value / 100))
}
discount.onchange = (eo) => {
    ckeckIfEmpty()
    price.value = Math.round(subPrice.value - ( subPrice.value * discount.value / 100))
}
function ckeckIfEmpty() {
    price.value == "" ? price.value = "0" : false
    subPrice.value == "" ? subPrice.value = "0" : false
    discount.value == "" ? discount.value = "0" : false
}
}




//////////////
// Show_Main-Image
let allImgs = document.querySelectorAll(".all-imgs .img img")
allImgs.forEach(img => {
    img.onclick = (eo) => {
        allImgs.forEach(img => {
            img.parentElement.classList.remove("active")
        })
        document.querySelector(".main-img img").src = eo.target.src
        img.parentElement.classList.add("active")
    }
});

/////////////





// closed_sidebar
if(document.querySelector(".page")){
    document.querySelector(".close-sidebar").onclick = () => {
        document.querySelector(".page").classList.add("closed-sidebar")
    }
    document.querySelector(".over-shadow").onclick = () => {
        document.querySelector(".page").classList.add("closed-sidebar")
    }
    // open_sidebar
    document.querySelector(".open-sidebar").onclick = () => {
        document.querySelector(".page").classList.remove("closed-sidebar")
    }
    
}
// Check_Active_Page
document.querySelectorAll(".sidebar ul li a").forEach(function(a) {
    if(a.pathname == location.pathname){
        a.parentElement.classList.add("active")
    }else{
        a.parentElement.classList.remove("active")
    }
})


// select_Status
let selectsStatus = document.querySelectorAll(".orders .status select")
selectsStatus.forEach((select) => {
    select.onchange = (eo) => {
        eo.target.setAttribute("class",eo.target.value)
    }
})
// selectsStatus.forEach((select) =>{
//     select.setAttribute("class",select.value)
// })





// onOff
let onOff = document.querySelectorAll(".onOff")
let aa
onOff.forEach((item) => {
    item.onclick = (eo) => {
        eo.target.classList.toggle("on")
        eo.target.parentElement.parentElement.classList.toggle("active")
        if (!eo.target.parentElement.parentElement.classList.contains("active")) {
            eo.target.parentElement.parentElement.querySelectorAll(".props input[type='checkbox']").forEach((prop) => {
                prop.checked = false
            }) 
        }
    }
})



// Delete_Image
let deleteImg
const mychild = document.querySelectorAll(".parent-img:not(.dn)").length
let child = mychild
let addImages = document.querySelectorAll(".addImages input[name='images']")
let parentImage = document.querySelector(".addImages")

    if(parentImage){
        parentImage.addEventListener("click",(eo) => {
            if(eo.target.classList.contains("inputImg")){
                eo.target.addEventListener("change", function () {
                    const file = this.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = function () {
                        let result = reader.result;
                        console.log("done!!")
                        if(document.querySelector(`label[for="${eo.target.id}"] img`)){
                            document.querySelector(`label[for="${eo.target.id}"] img`).remove()
                        }
                        if (!eo.target.parentElement.querySelector("label").classList.contains("valid")) {
                            document.querySelectorAll(".addImages .parent-img")[child].classList.remove("dn")
                            child++
                            console.log(eo.target);
                        }
                       console.log(eo.target.parentElement.querySelector("label").classList.contains("valid"));
    
                        document.querySelector(`label[for="${eo.target.id}"]`).innerHTML+=`<img src="${result}" alt="">`
                        document.querySelector(`label[for="${eo.target.id}"]`).classList.add("valid")
    
                        
                        deleteImgs()
                      };
                      reader.readAsDataURL(file);
                    }
                  });
                //   window.file.accept = "image/*";
            }
        })
    }

function deleteImgs() {
    deleteImg = document.querySelectorAll(".parent-img .close")
                    // delete_image
                    deleteImg.forEach((item) => {
                        item.onclick=function(eo){
                            console.log(aaaa=eo.target)
                            eo.target.parentElement.parentElement.remove()
                        }
                    })
                    
}
deleteImgs()









// Register
let password = document.getElementById("password"),
confirmPassword = document.getElementById("confirmPassword"),
email = document.getElementById("email"),
form = document.querySelector(".register form"),
submitBtn = document.querySelector("form #submitBtn")
let passError = false,
ConPassError = false,
emailError = false
function check_confirmPassword() {
    if (confirmPassword.value == password.value) {
        submitBtn.removeAttribute("disabled")
        confirmPassword.parentElement.parentElement.querySelector(".error").classList.add("dn")
        ConPassError = false
    } else {
        submitBtn.setAttribute("disabled","")
        confirmPassword.parentElement.parentElement.querySelector(".error").classList.remove("dn")
        ConPassError = true
    }
}
function check_validateEmail() {
    if (/\b([a-zA-Z0-9]){3,25}@gmail.com\b/.test(email.value)) {
        submitBtn.removeAttribute("disabled")
        email.parentElement.parentElement.querySelector(".error").classList.add("dn")
        emailError = false
    } else {
        submitBtn.setAttribute("disabled","")
        email.parentElement.parentElement.querySelector(".error").classList.remove("dn")
        emailError = true
    }
}
function check_validatePassword() {
    if (/[a-z]+/.test(password.value) && /[A-Z]+/.test(password.value) && /\W+/.test(password.value) && /\d+/.test(password.value) && password.value.length >= 8) {
        submitBtn.removeAttribute("disabled")
        password.parentElement.parentElement.querySelector(".error").classList.add("dn")
        passError = false
    } else {
        submitBtn.setAttribute("disabled","")
        password.parentElement.parentElement.querySelector(".error").classList.remove("dn")
        passError = true
    }
}
if(document.querySelector(".register") && location.pathname == "/admin/register"){




        confirmPassword.oninput = () => {
            check_validatePassword()
            check_confirmPassword()
        }
        email.oninput = () => {
            check_validateEmail()
        }
        password.oninput = () => {
            check_validatePassword()
            if(confirmPassword.value != ""){
                check_confirmPassword()
            }
        }



}


// Profile IMAGE
// img
const ProfileInputImg = document.querySelector("#changeImgProfile");
const ProfileImg = document.querySelector("#profileImg");
function defaultBtnActive() {
    ProfileInputImg.click();
}

if(ProfileInputImg){
    ProfileInputImg.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function () {
            const result = reader.result;
            // *solution*
            profileImg.style.backgroundImage =  `url(${result})`;
          };
          reader.readAsDataURL(file);
        }
      });
}

// passError = false,
// ConPassError = false,
// emailError = false




let next = true
// Profile Change
let userName_change = document.querySelector(".profile-page .info .userName .change")
let email_change = document.querySelector(".profile-page .info .email .change")
let password_change = document.querySelector(".profile-page .info .password .change")
let confirmPassword_change = document.querySelector(".profile-page .info .confirmPassword .change")
let changeInfoBtn = document.querySelectorAll(".profile-page .info .par-box .change")

if(document.querySelector(".profile-page")){
    userName_change.onclick = (change) => {
        if(next){
            changeFocus(change)
            // changeInfoBtn.forEach((btn) => {
            //     btn.onclick = (eo) => {
            //         changeFocus(change)
            //         console.log("email__");
            //     }
            // })
        }
        
        next = false
        change.target.parentElement.querySelector("input").oninput = (eo) => {
            if (eo.target.value.length < 3) {
                next = false
            } else {
                next = true
            }
            console.log(next)
        }
        
    }
    email_change.onclick = (change) => {
        if(next){
            changeFocus(change)
            // changeInfoBtn.forEach((btn) => {
            //     btn.onclick = (eo) => {
            //         changeFocus(change)
            //         console.log("email__");
            //     }
            // })
        }
        
        next = false
        change.target.parentElement.querySelector("input").oninput = () => {
            check_validateEmail()
            if (emailError) {
                next = false
            } else {
                next = true
            }
            console.log(next)
        }
        
    }
    
    password_change.onclick = (change) => {
        console.log("pass")
        if(next){
            changeFocus(change)
            confirmPassword_change.parentElement.querySelector("input").readOnly = false
            // changeInfoBtn.forEach((btn) => {
            //     btn.onclick = (eo) => {
            //         changeFocus(change)
            //         console.log("pass___");
    
            //     }
            // })
            console.log("pass_");
        }
        
        next = false
        change.target.parentElement.querySelector("input").oninput = () => {
            passError = true
            ConPassError = true
            check_validatePassword()
            check_confirmPassword()
            if (passError && ConPassError) {
                next = false
            } else {
                next = true
            }
            console.log(next)
        }
        confirmPassword_change.parentElement.querySelector("input").oninput = () => {
            passError = true
            ConPassError = true
            check_validatePassword()            
            check_confirmPassword()
            if (passError || ConPassError) {
                next = false
            }
             if(!passError && !ConPassError){
                next = true
            }
            console.log(next)
        }
        
    }
    
    function changeFocus(change) {
        changeInfoBtn.forEach((btn) => {
            btn.parentElement.querySelector("input").setAttribute("readonly","readonly")
        })
        change.target.parentElement.querySelector("input").readOnly = false
        change.target.parentElement.querySelector("input").focus()
    }
    document.querySelector("form.profile-page").onsubmit = () => {
        if (passError,ConPassError,emailError) {
            return false
        }else{

            return true
        }
    }
}


// function ckeckProfileValidation(change) {
//     if (change.target.parentElement.querySelector("input") == document.getElementById("email")) {
//         email.oninput = (params) => {
//             check_validateEmail()
//         }
//     }else if (change.target.parentElement.querySelector("input") == document.getElementById("password")) {
//         password.oninput = (params) => {
//             check_validatePassword()
//         }
//     }
//     if(!emailError){
//         changeInfoBtn.forEach((btn) => {
//             btn.parentElement.querySelector("input").setAttribute("readonly","readonly")
//         })
//         email.readOnly = false
//         email.focus()
//     }

//     // if(!passError){
//     //     changeInfoBtn.forEach((btn) => {
//     //         btn.parentElement.querySelector("input").setAttribute("readonly","readonly")
//     //     })
//     //     password.readOnly = false
//     //     password.focus()
//     // }
//     // if(!ConPassError){
//     //     changeInfoBtn.forEach((btn) => {
//     //         btn.parentElement.querySelector("input").setAttribute("readonly","readonly")
//     //     })
//     //     confirmPassword.readOnly = false
//     //     confirmPassword.focus()
//     // }
// }

let filterBtn = document.getElementById("filter"),
    selectFilter = document.querySelector(".select-filter"),
    searchByName = document.querySelector(".select-filter #searchByName"),
    searchByCollection = document.querySelector(".select-filter #searchByCollection"),
    searchByStatus = document.querySelector(".select-filter #searchByStatus")
let productStatus = document.querySelectorAll(".status .select"),
    productCollection = document.querySelectorAll(".collection"),
    productName = document.querySelectorAll(".product .name")
    rowProdcut = document.querySelectorAll(".row-product")
if (filterBtn) {
    filterBtn.onclick = () => {
        selectFilter.classList.toggle("active-filter")
    }
    selectFilter.oninput = () => {
        productStatus.forEach((product) => {
            if(searchByStatus.value == "all"){
                product.parentElement.parentElement.classList.remove("NotValidStatus")
            }else{
                if(product.classList.contains(searchByStatus.value)){
                    product.parentElement.parentElement.classList.remove("NotValidStatus")
                }else{
                    product.parentElement.parentElement.classList.add("NotValidStatus")
                }
            }
        })
        productCollection.forEach((product) => {
            if(searchByCollection.value == "all"){
                product.parentElement.parentElement.parentElement.classList.remove("NotValidCollection")
                product.parentElement.classList.remove("NotValidCollection")
            }else{
                if(product.innerHTML == searchByCollection.value){
                    product.parentElement.parentElement.parentElement.classList.remove("NotValidCollection")
                    product.parentElement.classList.remove("NotValidCollection")
                }else{
                    product.parentElement.parentElement.parentElement.classList.add("NotValidCollection")
                    product.parentElement.classList.add("NotValidCollection")
                }
            }
        })
        productName.forEach((product) => {
            if(searchByName.value == ""){
                product.parentElement.parentElement.parentElement.classList.remove("NotValidName")
            }else{
                if(product.innerHTML.includes(searchByName.value)){
                    product.parentElement.parentElement.parentElement.classList.remove("NotValidName")
                }else{
                    product.parentElement.parentElement.parentElement.classList.add("NotValidName")
                }
            }
        })
        rowProdcut.forEach((product) => {
            if(!product.classList.contains("NotValidStatus") &&
                !product.classList.contains("NotValidCollection") &&
                !product.classList.contains("NotValidName")){
                product.classList.remove("dn")
            }else{
                product.classList.add("dn")
            }
        })
    }
}



// menu img
if (document.querySelector(".par-menu-img")) {
    let menu = document.querySelector(".par-menu-img .menu"),
    imgMenu = document.querySelector(".par-menu-img .img")

    
imgMenu.onclick = () => {
    
    document.body.onclick = (eo) => {
        if (eo.target != document.querySelector(".par-menu-img .menu li") && eo.target != imgMenu) {
            menu.classList.remove("active")
        }
    }
    menu.classList.toggle("active")
}
}

// show error
if(document.querySelector(".show-top-error")){
    setTimeout(() => {
        document.querySelector(".show-top-error").remove()
    }, 5000);
}