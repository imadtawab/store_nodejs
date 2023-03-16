
let storeName = document.getElementById("storeName").value
let aaa

// Top_Size
let topsSize = document.querySelectorAll(".top-sizes input[type='checkbox']");
topsSize.forEach((topSize) => {
  topSize.onclick = (eo) => {
    topsSize.forEach((topSize) => {
      topSize.checked = false;
    });
    eo.target.checked = true;
  };
});
// Shoe_Size
let shoesSize = document.querySelectorAll(".shoe-sizes input[type='checkbox']");
shoesSize.forEach((shoeSize) => {
  shoeSize.onclick = (eo) => {
    shoesSize.forEach((shoeSize) => {
      shoeSize.checked = false;
    });
    eo.target.checked = true;
  };
});

// colors
let colors = document.querySelectorAll(".colors .color");
colors.forEach((color) => {
  color.onclick = (eo) => {
    colors.forEach((color) => {
      color.checked = false;
    });
    eo.target.checked = true;
  };
});

// Show_Main-Image
let allImgs = document.querySelectorAll(".all-imgs .img img");
allImgs.forEach((img) => {
  img.onclick = (eo) => {
    allImgs.forEach((img) => {
      img.parentElement.classList.remove("active");
    });
    document.querySelector(".main-img img").src = eo.target.src;
    img.parentElement.classList.add("active");
  };
});

// Quantite
if (document.querySelector("#subTotal")) {
  let quantite = document.querySelector(".quantite");
  let inputQuantite = document.querySelector(".quantite input");

  if (window.location.pathname != `/${storeName}/shoppingCard`) {
    quantite.onclick = (eo) => {
      eo.preventDefault();
      if (eo.target.classList.contains("minus") && inputQuantite.value > 1) {
        inputQuantite.value--;
        console.log("minus");
      } else if (
        eo.target.classList.contains("plus") &&
        inputQuantite.value < 10
      ) {
        inputQuantite.value++;
        console.log("plus");
      }
      // Calculate TOTAL
      calculateTotal();
    };
    function calculateTotal() {
      let subTotal = document.querySelector(
        "#subTotal .price .number"
      ).innerText;
      let shipping = document.querySelector(
        "#shipping .price .number"
      ).innerText;
      let total = document.querySelector("#total .price .number");
      total.innerText = inputQuantite.value * subTotal + +shipping;
      document.getElementById("topTotal").value =
        inputQuantite.value * subTotal + +shipping;
    }
    calculateTotal();
  }
}

// Last Popup
if (document.querySelector(".container-last-popup")) {
  document.querySelector(".container-last-popup .cancel").onclick = (eo) => {
    // console.log(eo,"fffff");
    eo.target.parentElement.parentElement.remove();
    // window.location.pathname = `/${storeName}/redirectToShoppingCard`
  };
}


if (localStorage.productsIdsShoppingCard) {
  // Default Number Product In Shopping Card (LocalStorage)
  let array_productsIdsShoppingCard = JSON.parse(localStorage.productsIdsShoppingCard)
  document.querySelector("#numberOfShoppingCard").innerText = array_productsIdsShoppingCard.length;
  allShoppingProducts()
}
if (window.location.pathname == `/${storeName}/shoppingCard`) {
  // Default Content (LocalStorage)
  let array_productsIdsShoppingCard = JSON.parse(localStorage.productsIdsShoppingCard)
  let myRows = document.querySelectorAll(".row-product")
  myRows.forEach((row) => {
    array_productsIdsShoppingCard.forEach((prod) => {
      if (row.dataset.id == prod._id) {
        row.querySelector(".quantite .sous-quantite .prod_quantite").value = prod.quantite
        row.querySelector(".last-total").innerText = +row.querySelector(".last-total").dataset.price * prod.quantite
        row.querySelector(".last-total").innerHTML += "<span>MAD</span>"
      }
    })
  })
  // 
  totalQantite() 
  totalPrice()
  function totalQantite() {
    let lastQantite = 0
    let allQuantite = document.querySelectorAll(".row-product .quantite .prod_quantite")
    allQuantite.forEach(quantite => {
      lastQantite = +lastQantite + +quantite.value
    })
    document.getElementById("lastQantite").innerText = lastQantite
    allShoppingProducts()
  }
  function totalPrice() {
    let lastPrice = 0
    let allPrice = document.querySelectorAll(".row-product .last-total")
    allPrice.forEach(price => {
      lastPrice = +lastPrice + +price.innerText.split("MAD").join("")
    })
    document.getElementById("lastPrice").innerText = lastPrice
    document.getElementById("lastPrice").innerHTML += '<span style="margin-left: 4px; font-size: 13px">MAD</span>'
    allShoppingProducts()
    document.querySelector("#total .price .number").innerText = lastPrice
  }
// quantite of Shopping Card
  let allQunatite = document.querySelectorAll(".quantite .sous-quantite");
  allQunatite.forEach((btn) => {
    btn.onclick = (eo) => {
      if (
        eo.target.parentElement.classList.contains("minus") &&
        eo.target.parentElement.parentElement.parentElement.querySelector(
          ".prod_quantite"
        ).value > 1
      ) {
        eo.target.parentElement.parentElement.parentElement.querySelector(
          ".prod_quantite"
        ).value--;
        productTotal(eo);
      } else if (
        eo.target.parentElement.classList.contains("plus") &&
        eo.target.parentElement.parentElement.parentElement.querySelector(
          ".prod_quantite"
        ).value < 10
      ) {
        eo.target.parentElement.parentElement.parentElement.querySelector(".prod_quantite").value++;
        productTotal(eo);
      }
      
      totalQantite();
      totalPrice()
      updateQunatiteInLocalStorage(eo)
    };
  });
 
  function updateQunatiteInLocalStorage(eo) {
    let array_productsIdsShoppingCard = JSON.parse(localStorage.productsIdsShoppingCard);
    array_productsIdsShoppingCard.forEach(prod => {
      console.log(prod._id, eo.target.parentElement.parentElement.parentElement.parentElement.dataset.id);
      if (prod._id == eo.target.parentElement.parentElement.parentElement.parentElement.dataset.id) {
        prod.quantite = +eo.target.parentElement.parentElement.parentElement.querySelector(".prod_quantite").value
      } 
    });
    localStorage.setItem("productsIdsShoppingCard",JSON.stringify(array_productsIdsShoppingCard))
    allShoppingProducts()
  }
  function productTotal(eo) {
    eo.target.parentElement.parentElement.parentElement.parentElement.querySelector(
      ".last-total"
    ).innerHTML =
      eo.target.parentElement.parentElement.parentElement.querySelector(
        ".prod_quantite"
      ).value *
      eo.target.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".last-total"
      ).dataset.price;
    eo.target.parentElement.parentElement.parentElement.parentElement.querySelector(
      ".last-total"
    ).innerHTML += "<span>MAD</span>";
  

    allShoppingProducts()
} 
  // Delete Product In LocalStorage
  myRows.forEach((row) => {
      let deleteBtn = row.querySelector(".action .delete i")
      deleteBtn.onclick = (eo) => {
        deleteProductInLocalStorage(row,eo)
      }
  })

  function deleteProductInLocalStorage(row,eo) {
    let indexOfProd
    array_productsIdsShoppingCard.forEach((prod,index) => {
      if (prod._id == eo.target.parentElement.parentElement.parentElement.dataset.id) {
        indexOfProd = index
      }
    })
    array_productsIdsShoppingCard.splice(indexOfProd,1)
    localStorage.setItem("productsIdsShoppingCard",JSON.stringify(array_productsIdsShoppingCard));
    eo.target.parentElement.parentElement.parentElement.remove()
    if (array_productsIdsShoppingCard.length==0) {
      localStorage.removeItem("productsIdsShoppingCard")
      window.location.pathname = `/${storeName}/redirectToShoppingCard`
    }
    totalQantite() 
    totalPrice()
    document.querySelector("#numberOfShoppingCard").innerText = array_productsIdsShoppingCard.length;
    allShoppingProducts()
  }
}

function allShoppingProducts() {
  if (window.location.pathname == `/${storeName}/shoppingCard`) {
    document.getElementById("allShoppingProducts").value = localStorage.productsIdsShoppingCard

  }
}

if (document.querySelectorAll(".add-shopping-card")){
  // shopping card
let addShoppingCardBtns = document.querySelectorAll(".add-shopping-card");
let addheartBtns = document.querySelectorAll(".mycard .heart");

  addShoppingCardBtns.forEach((btn) => {
    btn.onclick = () => {
      if (!btn.classList.contains("added")) {
        btn.classList.add("added");
        // ::::::::::::::::::::::::
        addIdsProductsInLocalStorage(btn,1);
        // ::::::::::::::::::::::::
        setTimeout(() => {
          btn.classList.remove("added");
        }, 2000);
      }
    };
  });
  addheartBtns.forEach((btn) => {
    btn.onclick = (eo) => {
      eo.target.parentElement.classList.toggle("active")
    }
  })

function addIdsProductsInLocalStorage(btn,quantite) {
  if (localStorage.getItem("productsIdsShoppingCard")) {
    let array_productsIdsShoppingCard = JSON.parse(localStorage.productsIdsShoppingCard);
    let resultOfArray = array_productsIdsShoppingCard.filter((id) => id._id == btn.dataset.id);
    if (!resultOfArray.length) {
      // array_productsIdsShoppingCard.push(btn.dataset.id);
      array_productsIdsShoppingCard.push({ _id: btn.dataset.id,quantite:quantite });
      localStorage.setItem("productsIdsShoppingCard",JSON.stringify(array_productsIdsShoppingCard));
      console.log("save !!");
    } else {
      console.log("il exist déjâ");
    }
  } else {
    console.log("not valid");
    let array_productsIdsShoppingCard = [];
    // array_productsIdsShoppingCard.push(btn.dataset.id);
    array_productsIdsShoppingCard.push({ _id: btn.dataset.id,quantite:quantite });
    localStorage.setItem("productsIdsShoppingCard",JSON.stringify(array_productsIdsShoppingCard));
    console.log("save !!");
  }
  document.querySelector("#numberOfShoppingCard").innerText = JSON.parse(localStorage.productsIdsShoppingCard).length;
}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////7



let 
    // filterBtn = document.getElementById("filter"),
    selectFilter = document.querySelector(".select-filter"),
    searchByName = document.querySelector("#searchByName"),
    searchByCollection = document.querySelector("#searchByCollection")
    // ,searchByStatus = document.querySelector(".select-filter #searchByStatus")
let 
    // productStatus = document.querySelectorAll(".status .select"),
    productCollection = document.querySelectorAll(".cards .mycard .collection"),
    productName = document.querySelectorAll(".cards .mycard .product-name")
    rowProdcut = document.querySelectorAll(".cards .mycard")

    let AllSearchName = document.querySelectorAll(".menu-search-name .search-name")


    AllSearchName.forEach((name) => {
      name.onclick = (eo) => {
        searchByName.value = eo.target.innerText
        functionForFilterSearch()
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

    if (searchByName) {
  // if (filterBtn) {
    // filterBtn.onclick = () => {
    //     selectFilter.classList.toggle("active-filter")
    // }
    // selectFilter.querySelector(".submit-filter").onclick = (eo) => {
    //   eo.preventDefault()
    //   selectFilter.submit()
    // }
    // filter product

selectFilter.onsubmit = (eo) => {
      eo.preventDefault()
        // productStatus.forEach((product) => {
        //     if(searchByStatus.value == "all"){
        //         product.parentElement.parentElement.classList.remove("NotValidStatus")
        //     }else{
        //         if(product.classList.contains(searchByStatus.value)){
        //             product.parentElement.parentElement.classList.remove("NotValidStatus")
        //         }else{
        //             product.parentElement.parentElement.classList.add("NotValidStatus")
        //         }
        //     }
        // })
        functionForFilterSearch()
        AllSearchName.forEach((name) => {
          name.classList.add("dn")
      })
      if (document.querySelectorAll(".cards .mycard.NotValidName").length == rowProdcut.length) {
        document.getElementById("any-prodyct-err").classList.remove("dn")
      }else{
        document.getElementById("any-prodyct-err").classList.add("dn")
      }
    }

}
selectFilter.oninput = (eo) => {
  productCollection.forEach((product) => {
    if(searchByName.value == ""){
      product.parentElement.classList.remove("NotValidName")
      AllSearchName.forEach((name) => {
        if (name.dataset.id == product.parentElement.dataset.id) {
          name.classList.add("dn")
        }
      })
  }
    if(searchByCollection.value == "all collection"){
        product.parentElement.classList.remove("NotValidCollection")
        // product.parentElement.classList.remove("NotValidCollection")
    }else{

        if(product.innerHTML == searchByCollection.value){
            product.parentElement.classList.remove("NotValidCollection")
            // product.parentElement.classList.remove("NotValidCollection")
        }else{
            product.parentElement.classList.add("NotValidCollection")
            // product.parentElement.classList.add("NotValidCollection")
        }
    }
})
productName.forEach((product) => {
    if(searchByName.value == ""){
        // product.parentElement.classList.remove("NotValidName")
        AllSearchName.forEach((name) => {
          if (name.dataset.id == product.parentElement.dataset.id) {
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
       console.log(calculateSimilarity(product.innerHTML,searchByName.value),product.innerHTML,"+",searchByName.value);
        ////////////////////////////////////////////////////////////////
        let percentage = calculateSimilarity(product.innerHTML,searchByName.value)

        // let percentage = calculateSimilarity(fffffffff,searchByName.value)
        if(percentage >= 30 || product.innerHTML.includes(searchByName.value)){
            // product.parentElement.classList.remove("NotValidName")
          AllSearchName.forEach((name) => {
            if (name.dataset.id == product.parentElement.dataset.id) {
              name.classList.remove("dn")
            }
          })
        }else{
            // product.parentElement.classList.add("NotValidName")
            AllSearchName.forEach((name) => {
              if (name.dataset.id == product.parentElement.dataset.id) {
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
rowProdcut.forEach((product) => {

    if(
      // !product.classList.contains("NotValidStatus") &&
        !product.classList.contains("NotValidCollection") &&
        !product.classList.contains("NotValidName")){
        product.classList.remove("dn")
    }else{
        product.classList.add("dn")
    }
    // rowProdcut.forEach((prod) => {
    //   if (!prod.classList.contains("NotValidName")) {
    //     document.getElementById("any-prodyct-err").classList.remove("dn")
    //   }else{
    //     document.getElementById("any-prodyct-err").classList.add("dn")
    //   }
    // })
    if (document.querySelectorAll(".cards .mycard.NotValidName").length == rowProdcut.length) {
      document.getElementById("any-prodyct-err").classList.remove("dn")
    }else{
      document.getElementById("any-prodyct-err").classList.add("dn")
    }
    if (document.activeElement != searchByName) {
      AllSearchName.forEach((name) => {
        name.classList.add("dn")
    })
    }
    
})

}



function functionForFilterSearch() {
  productCollection.forEach((product) => {
    if(searchByCollection.value == "all collection"){
        product.parentElement.classList.remove("NotValidCollection")
        // product.parentElement.classList.remove("NotValidCollection")
    }else{
        if(product.innerHTML == searchByCollection.value){
            product.parentElement.classList.remove("NotValidCollection")
            // product.parentElement.classList.remove("NotValidCollection")
        }else{
            product.parentElement.classList.add("NotValidCollection")
            // product.parentElement.classList.add("NotValidCollection")
        }
    }
})
productName.forEach((product) => {
    if(searchByName.value == ""){
        product.parentElement.classList.remove("NotValidName")
        AllSearchName.forEach((name) => {
          if (name.dataset.id == product.parentElement.dataset.id) {
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
       console.log(calculateSimilarity(product.innerHTML,searchByName.value),product.innerHTML,"+",searchByName.value);
        ////////////////////////////////////////////////////////////////
        let percentage = calculateSimilarity(product.innerHTML,searchByName.value)

        // let percentage = calculateSimilarity(fffffffff,searchByName.value)
        if(percentage >= 30 || product.innerHTML.includes(searchByName.value)){
            product.parentElement.classList.remove("NotValidName")
          AllSearchName.forEach((name) => {
            if (name.dataset.id == product.parentElement.dataset.id) {
              name.classList.remove("dn")
            }
          })
        }else{
            product.parentElement.classList.add("NotValidName")
            AllSearchName.forEach((name) => {
              if (name.dataset.id == product.parentElement.dataset.id) {
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
rowProdcut.forEach((product) => {
    if(
      // !product.classList.contains("NotValidStatus") &&
        !product.classList.contains("NotValidCollection") &&
        !product.classList.contains("NotValidName")){
        product.classList.remove("dn")
    }else{
        product.classList.add("dn")
    }
    if (document.querySelectorAll(".cards .mycard.NotValidName").length == rowProdcut.length) {
      document.getElementById("any-prodyct-err").classList.remove("dn")
    }else{
      document.getElementById("any-prodyct-err").classList.add("dn")
    }
})
}




