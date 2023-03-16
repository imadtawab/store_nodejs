
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
        if (eo_btn.target.parentElement.dataset.modal == "deleteManyModal") {
            sectionModal = document.getElementById(eo_btn.target.parentElement.dataset.modal)
        }
        console.log(sectionModal)
        sectionModal.classList.add("modal-active")
        sectionModal.querySelector(".cancel").onclick = (cancel) => {
            sectionModal.classList.remove("modal-active")
                
            if (document.querySelector("#defaultValue")) {
                document.querySelector("#defaultValue").selected = true
            }
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

// checkbox in table

let parentCheckbox = document.getElementById("parentCheck")
let allCheckbox = document.querySelectorAll(".checkbox input")
let tableForm = document.getElementById("tableForm")
let deleteMany = document.getElementById("deleteMany")
let updateMany = document.getElementById("updateMany")
if (parentCheckbox) {
    parentCheckbox.onchange = (eo) => {
        if (eo.target.checked) {
         allCheckbox.forEach(checkbox => {
             checkbox.checked = true
         });
        }else{
         allCheckbox.forEach(checkbox => {
             checkbox.checked = false
         });
        }
     }
     tableForm.onchange = (eo) => {
         let result = []
         allCheckbox.forEach(checkbox => {
             if(checkbox.checked){
                 result.push(checkbox)
             }
         })
         if (result.length == 0) {
             checkDisabled(true)
         }else{
             checkDisabled(false)
         }
     }
     tableForm.onsubmit = (eo) => {
         eo.preventDefault()
         document.getElementById("event").value = document.activeElement.dataset.event
         if(document.activeElement.dataset.event == "updateMany"){
             document.getElementById("thisStatusForMany").value = document.querySelector("#updateMany select").value
         }
         eo.target.submit()
     }
     updateMany.querySelector("select").onchange = () => {
         updateMany.click()
     }
}

function checkDisabled(event) {
    if (event) {
        updateMany.setAttribute("disabled",true)
        updateMany.querySelector("select").setAttribute("disabled",true)
        deleteMany.setAttribute("disabled",true)
    } else {
        updateMany.removeAttribute("disabled")
        updateMany.querySelector("select").removeAttribute("disabled")
        deleteMany.removeAttribute("disabled")
    }
}





// onOff
let onOff = document.querySelectorAll(".onOff")
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
submitBtn = document.querySelector("#submitBtn")
let passError = false,
ConPassError = false,
emailError = false
function check_confirmPassword() {
    if (confirmPassword.value == password.value) {
        submitBtn ? submitBtn.removeAttribute("disabled") : false
        confirmPassword.parentElement.parentElement.querySelector(".error").classList.add("dn")
        ConPassError = true
        return true
    } else {
        submitBtn ? submitBtn.setAttribute("disabled","disabled") : false
        confirmPassword.parentElement.parentElement.querySelector(".error").classList.remove("dn")
        ConPassError = false
        return false
    }
}
function check_validateEmail() {
    if (/\b([a-zA-Z0-9]){3,25}@gmail.com\b/.test(email.value)) {
        submitBtn ? submitBtn.removeAttribute("disabled") : false
        email.parentElement.parentElement.querySelector(".error").classList.add("dn")
        // emailError = false
        return true
    } else {
        submitBtn ? submitBtn.setAttribute("disabled","disabled") : false
        email.parentElement.parentElement.querySelector(".error").classList.remove("dn")
        // emailError = true
        return false
    }
}
function check_validatePassword() {
    if (/[a-z]+/.test(password.value) && /[A-Z]+/.test(password.value) && /\W+/.test(password.value) && /\d+/.test(password.value) && password.value.length >= 8) {
        submitBtn ? submitBtn.removeAttribute("disabled") : false
        password.parentElement.parentElement.querySelector(".error").classList.add("dn")
        // passError = false
        return true
    } else {
        submitBtn ? submitBtn.setAttribute("disabled","disabled") : false
        password.parentElement.parentElement.querySelector(".error").classList.remove("dn")
        // passError = true
        return false
    }
}
if (location.pathname.startsWith("/admin/login/forgot-password")) {
    confirmPassword.oninput = () => {
        check_validatePassword()
        check_confirmPassword()
    }
    password.oninput = () => {
        check_validatePassword()
        if(confirmPassword.value != ""){
            check_confirmPassword()
        }
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
const deleteProfilImage = document.querySelector("#deleteImageProfile");
if (deleteProfilImage) {
    deleteProfilImage.onclick = (eo) => {
        eo.target.parentElement.parentElement.action = "/admin/profile/delete-imageProfile"
        eo.target.parentElement.parentElement.submit()
    }
}
function defaultBtnActive() {
    ProfileInputImg.click();
}

if(ProfileInputImg){
    ProfileInputImg.oninput = (eo) => {
        eo.target.parentElement.submit()
    }
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

// Profile IMAGE
// img
 // input file
const storeLogo = document.querySelector("#storeLogo");
const deleteLogo = document.querySelector("#deleteLogo");
// div for show
const addLogo = document.querySelector(".box.storeLogo form .add-logo");
function defaultBtnActive() {
    storeLogo.click();
}

if (deleteLogo) {
    deleteLogo.onclick = (eo) => {
        eo.target.parentElement.parentElement.parentElement.action = "/admin/profile/delete-storeLogo"
        eo.target.parentElement.parentElement.parentElement.submit()
    }
}

if(storeLogo){
    storeLogo.oninput = (eo) => {
        eo.target.parentElement.submit()
    }
    // storeLogo.addEventListener("change", function () {
    //     const file = this.files[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onload = function () {
    //         const result = reader.result;
    //         // *solution*
    //         // addLogo.style.backgroundImage =  `url(${result})`;
    //         // addLogo.innerHTML = `<img src="${result}"/>`
    //         let nn = document.createElement("img")
    //         nn.setAttribute("src",result)
    //         addLogo.parentElement.prepend(nn)
    //         addLogo.remove()
    //       };
    //       reader.readAsDataURL(file);
    //     }
    //   });
}

// passError = false,
// ConPassError = false,
// emailError = false





let next = true
// Profile Change
let userName_change = document.querySelector(".profile-page .info .userName .change")
let storeName_change = document.querySelector(".profile-page .info .storeName .change")
let email_change = document.querySelector(".profile-page .info .email .change")
let password_change = document.querySelector(".profile-page .info .password .change")
let confirmPassword_change = document.querySelector(".profile-page .info .confirmPassword .change")
let changeInfoBtn = document.querySelectorAll(".profile-page .info .par-box .change")


if(document.querySelector(".profile-page")){
    let defaultValue_userName = document.querySelector(".profile-page .info .userName input").value
    let defaultValue_storeName = document.querySelector(".profile-page .info .storeName input").value
let defaultValue_email = document.querySelector(".profile-page .info .email input").value
    userName_change.onclick = (change) => {
        resetChange(change,defaultValue_userName)
    }    
    storeName_change.onclick = (change) => {
        resetChange(change,defaultValue_storeName)
    }
    email_change.onclick = (change) => {
        resetChange(change,defaultValue_email,check_validateEmail)
    }
    password_change.onclick = (change) => {
        resetChange(change,"",check_validatePassword,check_confirmPassword)
    }

function resetChange(change,defaultValue,check_validation,second_check) {
    if(next){
        next = false
        let submitBtnChange = change.target.parentElement.querySelector(".submit-btn")
        let myInput = change.target.parentElement.parentElement.querySelector("input")
        let closeBtn = change.target.parentElement.querySelector(".close")

        myInput.removeAttribute("readonly")
        change.target == password_change ? confirmPassword.removeAttribute("readonly") : false
        change.target.classList.add("dn")
        submitBtnChange.classList.remove("dn")
        closeBtn.classList.remove("dn")

        closeBtn.onclick= (eo) => {
            change.target.classList.remove("dn")
            submitBtnChange.classList.add("dn")
            closeBtn.classList.add("dn")
            myInput.setAttribute("readonly","readonly")
            change.target == password_change ? confirmPassword.setAttribute("readonly","readonly") : false
            myInput.value = defaultValue
            change.target == password_change ? confirmPassword.value = defaultValue : false
            
            next = true
        }
        // myInput.oninput = () => {
        //     console.log(second_check());
        // }
        if (change.target != password_change) {
            console.log("ff");
            // myInput.oninput = async () => {
            myInput.parentElement.onsubmit = () => {
                check_validation()
                if (check_validation()) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            // myInput.oninput = () => {
            myInput.parentElement.parentElement.parentElement.parentElement.onsubmit = () => {
                check_validation()
                if (check_validation()) {
                    second_check()
                }
                
                
                if (check_validation() && second_check()) {
                    return true
                } else {
                    return false
                }
            }
        }
        
    }
}
// if(document.querySelector(".profile-page")){
//     userName_change.onclick = (change) => {
//         if(next){
//             changeFocus(change)
//             change.target.classList.add("dn")
//             change.target.parentElement.querySelector(".submit-btn").classList.remove("dn")
//             change.target.parentElement.querySelector(".close").classList.remove("dn")
//             change.target.parentElement.querySelector(".close").onclick= (eo) => {
//                 change.target.classList.remove("dn")
//                 change.target.parentElement.querySelector(".submit-btn").classList.add("dn")
//                 change.target.parentElement.querySelector(".close").classList.add("dn")
//                 change.target.parentElement.parentElement.querySelector("input").setAttribute("readonly","readonly")
//             }
//             // changeInfoBtn.forEach((btn) => {
//             //     btn.onclick = (eo) => {
//             //         changeFocus(change)
//             //         console.log("email__");
//             //     }
//             // })
//         }
        
//         next = false
//         change.target.parentElement.parentElement.querySelector("input").oninput = (eo) => {
//             if (eo.target.value.length < 3) {
//                 next = false
//             } else {
//                 next = true
//             }
//             console.log(next)
//         }
        
//     }
//     email_change.onclick = (change) => {
//         if(next){
//             changeFocus(change)
//             // changeInfoBtn.forEach((btn) => {
//             //     btn.onclick = (eo) => {
//             //         changeFocus(change)
//             //         console.log("email__");
//             //     }
//             // })
//         }
        
//         next = false
//         change.target.parentElement.querySelector("input").oninput = () => {
//             check_validateEmail()
//             if (emailError) {
//                 next = false
//             } else {
//                 next = true
//             }
//             console.log(next)
//         }
        
//     }
    
//     password_change.onclick = (change) => {
//         console.log("pass")
//         if(next){
//             changeFocus(change)
//             confirmPassword_change.parentElement.querySelector("input").readOnly = false
//             // changeInfoBtn.forEach((btn) => {
//             //     btn.onclick = (eo) => {
//             //         changeFocus(change)
//             //         console.log("pass___");
    
//             //     }
//             // })
//             console.log("pass_");
//         }
        
//         next = false
//         change.target.parentElement.querySelector("input").oninput = () => {
//             passError = true
//             ConPassError = true
//             check_validatePassword()
//             check_confirmPassword()
//             if (passError && ConPassError) {
//                 next = false
//             } else {
//                 next = true
//             }
//             console.log(next)
//         }
//         confirmPassword_change.parentElement.querySelector("input").oninput = () => {
//             passError = true
//             ConPassError = true
//             check_validatePassword()            
//             check_confirmPassword()
//             if (passError || ConPassError) {
//                 next = false
//             }
//              if(!passError && !ConPassError){
//                 next = true
//             }
//             console.log(next)
//         }
        
//     }
    
//     function changeFocus(change) {
//         changeInfoBtn.forEach((btn) => {
//             btn.parentElement.parentElement.querySelector("input").setAttribute("readonly","readonly")
//         })
//         change.target.parentElement.parentElement.querySelector("input").readOnly = false
//         change.target.parentElement.parentElement.querySelector("input").focus()
//     }
//     document.querySelector(".profile-page").onsubmit = () => {
//         if (passError,ConPassError,emailError) {
//             return false
//         }else{

//             return true
//         }
//     }
}

// filter product
let filterBtn = document.getElementById("filter"),
    selectFilter = document.querySelector(".select-filter"),
    searchByName = document.querySelector(".select-filter #searchByName"),
    searchByCollection = document.querySelector(".select-filter #searchByCollection"),
    searchByStatus = document.querySelector(".select-filter #searchByStatus"),
    // date
    from_searchByDate = document.querySelector(".select-filter #from_searchByDate"),
    at_searchByDate = document.querySelector(".select-filter #at_searchByDate"),
    // menu search by name
    AllSearchName = document.querySelectorAll(".menu-search-name .search-name")

let productStatus = document.querySelectorAll(".row-product .status .select"),
    productCollection = document.querySelectorAll(".row-product .all-collection"),
    productName = document.querySelectorAll(".row-product .product .all-name"),
    productDate = document.querySelectorAll(".row-product .date"),
    rowProdcut = document.querySelectorAll(".row-product");

 
   
    // click in name for search
    AllSearchName.forEach((name) => {
        name.onclick = (eo) => {
          searchByName.value = eo.target.innerText
        //   functionForFilterSearch()
          AllSearchName.forEach((name) => {
            name.classList.add("dn")
        })
                      // dn menu in blur
searchByName.onblur = () => {
    AllSearchName.forEach((name) => {
        name.classList.add("dn")
    })
  }
        }
      })
    // click in name for search
if (filterBtn) {
    if (sessionStorage.getItem("active-filter") == "true") {
        selectFilter.classList.add("active-filter")
    }
    filterBtn.onclick = () => {
        selectFilter.classList.toggle("active-filter")

        if (sessionStorage.getItem("active-filter") == "true") {
        sessionStorage.setItem("active-filter","false")
        } else {
        sessionStorage.setItem("active-filter","true")
        }
    }
    selectFilter.oninput = () => {
        // ## menuSearch
        AllSearchName.forEach((name) => {
            name.classList.add("dn")
        })
        productStatus.forEach((product) => {
            product.parentElement.parentElement.classList.remove("NotValidStatus")
            product.parentElement.parentElement.classList.remove("dn")
            if(searchByStatus.value == "all"){
                product.parentElement.parentElement.classList.remove("NotValidStatus")
            }else{
                if(product.dataset.status == searchByStatus.value){
                    // if(product.classList.contains(searchByStatus.value)){
                    product.parentElement.parentElement.classList.remove("NotValidStatus")
                }else{
                    product.parentElement.parentElement.classList.add("NotValidStatus")
                }
            }
        })

        productCollection.forEach((product) => {
            product.parentElement.parentElement.classList.remove("NotValidCollection")
            product.parentElement.parentElement.classList.remove("dn")
            let validCollection = false
                product.querySelectorAll(".collection").forEach((coll) => {
                    coll.classList.remove("bg")
                    if (coll.innerText.toLowerCase() == searchByCollection.value) {
                        validCollection = true
                        coll.classList.add("bg")
                    }                 
                    })
            if(searchByCollection.value == "all"){
                product.parentElement.parentElement.classList.remove("NotValidCollection")
            }else{
                if(validCollection){
                    product.parentElement.parentElement.classList.remove("NotValidCollection")
                }else{
                    console.log("zzzzzzz");
                    product.parentElement.parentElement.classList.add("NotValidCollection")
                    // product.parentElement.classList.add("NotValidCollection")
                }
            }
        })
        // productName.forEach((product) => {
        //     if(searchByName.value == ""){
        //         product.parentElement.parentElement.parentElement.classList.remove("NotValidName")
        //     }else{
        //         if(product.innerHTML.includes(searchByName.value)){
        //             product.parentElement.parentElement.parentElement.classList.remove("NotValidName")
        //         }else{
        //             product.parentElement.parentElement.parentElement.classList.add("NotValidName")
        //         }
        //     }
        // })
        productName.forEach((product) => {
            product.parentElement.parentElement.classList.remove("NotValidName")
            product.parentElement.parentElement.classList.remove("dn")
            if(searchByName.value == ""){
                product.querySelectorAll(".name").forEach((name) => {
                    name.classList.remove("bg")
                })
                product.parentElement.parentElement.classList.remove("NotValidName")
                // menuSearch
                AllSearchName.forEach((name) => {
                    if (name.dataset.id == product.parentElement.parentElement.dataset.id) {
                      name.classList.add("dn")
                    }
                  })
            }else{

                // /////////////////////////////////////////////////////////////
                const calculateSimilarity = (str1 = '', str2 = '') => {
                  let longer = str1;
                  let shorter = str2;
                  if (str1.length < str2.length) {
                     longer = str2; shorter = str1;
                  }
                  let longerLength = longer.length;
                  if (longerLength == 0) {
                     return 1.0;
                  }
               return +((longerLength - matchDestructively(longer, shorter)) / parseFloat(longerLength) * 100).toFixed(2);
               };
               const matchDestructively = (str1 = '', str2 = '') => {
                  str1 = str1.toLowerCase();
                  str2 = str2.toLowerCase();
                  let arr = new Array();
                  for (let i = 0; i <= str1.length; i++) {
                     let lastValue = i;
                     for (let j = 0; j <= str2.length; j++) {
                        if (i == 0){
                           arr[j] = j;
                        }else if(j > 0){
                           let newValue = arr[j - 1];
                           if(str1.charAt(i - 1) != str2.charAt(j - 1))
                           newValue = Math.min(Math.min(newValue, lastValue), arr[j]) + 1;
                           arr[j - 1] = lastValue; lastValue = newValue;
                        }
                     }
                     if (i > 0) arr[str2.length] = lastValue;
                  }
                  return arr[str2.length];
               };
            //    console.log(calculateSimilarity(product.innerText,searchByName.value),product.innerText,"+",searchByName.value);
                ////////////////////////////////////////////////////////////////
                let validPercentage = false
                let validIncludes = false
                // console.log("##########################");
                product.querySelectorAll(".name").forEach((name) => {
                    name.classList.remove("bg")
                    if (calculateSimilarity(name.innerText,searchByName.value) >= 30) {
                        validPercentage = true
                        name.classList.add("bg")
                    }
                    if (name.innerText.includes(searchByName.value)) {
                        validIncludes = true
                        name.classList.add("bg")
                    }
                    // console.log("% : " + calculateSimilarity(name.innerText,searchByName.value) + " => " + validPercentage);
                    // console.log("first : " + name.innerText.includes(searchByName.value) + " => " + validIncludes);
                    // console.log("---------------------------------");
                })
                // console.log("##########################");

                if(validPercentage || validIncludes){
                    // console.log(calculateSimilarity(product.innerText,searchByName.value),product.innerText,"+",searchByName.value);
                    // console.log("******************" + product + "****************");
                    product.parentElement.parentElement.classList.remove("NotValidName")
                    AllSearchName.forEach((name) => {
                        if (name.dataset.id == product.parentElement.parentElement.dataset.id) {
                          name.classList.remove("dn")
                        ///////////////////////////////////////////////
                        menuSearchPosition()
                        
                        ///////////////////////////////////////////////
                        }
                      })
                }else{

                    product.parentElement.parentElement.classList.add("NotValidName")
                    AllSearchName.forEach((name) => {
                        if (name.dataset.id == product.parentElement.parentElement.dataset.id) {
                          name.classList.add("dn")
                        }
                      })
                }
                 // if(product.innerHTML.includes(searchByName.value)){
                //     product.parentElement.classList.remove("NotValidName")
                // }else{
                //     product.parentElement.classList.add("NotValidName")
                // }
            }
        })
        productDate.forEach((product) => {
            product.parentElement.classList.remove("NotValidDate")
            product.parentElement.classList.remove("dn")
            let minValue = from_searchByDate.value.split("-").join(""),
                maxValue = at_searchByDate.value.split("-").join(""),
                constValue = product.innerText.slice(0,10).split("-").join("")
            
            if(!from_searchByDate.value && !at_searchByDate.value){
                product.parentElement.classList.remove("NotValidDate")
                console.log("not date ♥");

            }else if(from_searchByDate.value && !at_searchByDate.value){
                console.log("yes from & not at ♥");
                if (minValue <= constValue) {
                    product.parentElement.classList.remove("NotValidDate")
                }else{
                    product.parentElement.classList.add("NotValidDate")
                }
                
            }else if(!from_searchByDate.value && at_searchByDate.value){
                console.log("not from & yes at ♥");
                if (maxValue >= constValue) {
                    product.parentElement.classList.remove("NotValidDate")
                }else{
                    product.parentElement.classList.add("NotValidDate")
                }
                
            }else if(from_searchByDate.value && at_searchByDate.value){
                console.log("date ♥");
                if (minValue <= constValue && maxValue >= constValue) {
                    product.parentElement.classList.remove("NotValidDate")
                }else{
                    product.parentElement.classList.add("NotValidDate")
                }
                
            }else{
                product.parentElement.classList.add("NotValidDate")
            }

                console.log(product.innerText.slice(0,10).split("-").join("") ,  from_searchByDate.value.split("-").join("") , at_searchByDate.value.split("-").join("") );
            //     if(product.innerText.slice(0,10) == searchByDate.value){
            //         product.parentElement.classList.remove("NotValidDate")
            //     }else{
            // //         console.log("zzzzzzz");
            //         product.parentElement.classList.add("NotValidDate")
            // //         // product.parentElement.classList.add("NotValidCollection")
            //     }



            // if(searchByDate.value == ""){
            //     product.parentElement.classList.remove("NotValidDate")
            // }else{
            //     if(product.innerText.slice(0,10) == searchByDate.value){
            //         product.parentElement.classList.remove("NotValidDate")
            //     }else{
            // //         console.log("zzzzzzz");
            //         product.parentElement.classList.add("NotValidDate")
            // //         // product.parentElement.classList.add("NotValidCollection")
            //     }
            // }
        })
        
        let lastValid = 0
        rowProdcut.forEach((product) => {
            if(!product.classList.contains("NotValidStatus") &&
                !product.classList.contains("NotValidCollection") &&
                !product.classList.contains("NotValidName") &&
                !product.classList.contains("NotValidDate")
            ){
                product.classList.remove("dn")
                product.classList.remove("bg")
            }else{
                product.classList.add("dn")
                product.classList.add("bg")
            }
            if (product.className != "row-product") {
                lastValid++
            }
            // console.log("###################ggg");
            // console.log(product.className , "== row-product => " , product.className == "row-product",lastValid);
            if (lastValid == rowProdcut.length) {
                document.getElementById("any-prodyct-err").classList.remove("dn")
              }else{
                document.getElementById("any-prodyct-err").classList.add("dn")
              }
              if (document.activeElement != searchByName) {
                AllSearchName.forEach((name) => {
                  name.classList.add("dn")
              })
              }

              menuSearchPosition()
             
            // if (document.querySelectorAll(".row-product.NotValidName").length == rowProdcut.length) {
            //     document.getElementById("any-prodyct-err").classList.remove("dn")
            //   }else{
            //     document.getElementById("any-prodyct-err").classList.add("dn")
            //   }
        })
    }
}

function menuSearchPosition() {
    document.querySelector(".menu-search-name").style.left = `${searchByName.getBoundingClientRect().left}px`
document.querySelector(".menu-search-name").style.top = `${searchByName.getBoundingClientRect().bottom + 3.5}px`
document.querySelector(".menu-search-name").style.width = `${searchByName.getBoundingClientRect().width}px`

window.onscroll = () => {
document.querySelector(".menu-search-name").style.left = `${searchByName.getBoundingClientRect().left + 2}px`
document.querySelector(".menu-search-name").style.top = `${searchByName.getBoundingClientRect().bottom + 3.5}px`
document.querySelector(".menu-search-name").style.width = `${searchByName.getBoundingClientRect().width}px`

}
}

// menu img && notification
if (document.querySelector(".par-menu-img")) {

    let menu = document.querySelector(".par-menu-img .menu"),
    imgMenu = document.querySelector(".par-menu-img .img")


// imgMenu.onclick = () => {
    

//     document.body.onclick = (eo) => {
//         if (eo.target != document.querySelector(".par-menu-img .menu li") && eo.target != imgMenu) {
//             menu.classList.remove("active")
//         }
//     }
//     menu.classList.toggle("active")
// }

// notification
    
    let notificationMenu = document.querySelector(".container-notification .parent-notification"),
    notificationIcon = document.querySelector("#notification-icon")

    
    // notificationIcon.onclick = () => {
        
        
        document.body.onclick = (eo) => {
            if (eo.target == notificationIcon) {
                notificationMenu.classList.toggle("active")
            }else{

                notificationMenu.classList.remove("active")
            }

            if (eo.target == imgMenu) {
                menu.classList.toggle("active")
            }else{
    
                menu.classList.remove("active")
            }
        }
}
// }

// show error
if(document.querySelector(".show-top-error")){
    setTimeout(() => {
        document.querySelector(".show-top-error").remove()
    }, 5000);
}
      