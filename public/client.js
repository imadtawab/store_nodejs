// Top_Size
let topsSize = document.querySelectorAll(".top-sizes input[type='checkbox']");
topsSize.forEach((topSize) => {
    topSize.onclick = (eo) => {
        topsSize.forEach((topSize) => {
            topSize.checked = false
    });
    eo.target.checked = true
  };
});
// Shoe_Size
let shoesSize = document.querySelectorAll(".shoe-sizes input[type='checkbox']");
shoesSize.forEach((shoeSize) => {
    shoeSize.onclick = (eo) => {
        shoesSize.forEach((shoeSize) => {
            shoeSize.checked = false
    });
    eo.target.checked = true
  };
});

// colors
let colors = document.querySelectorAll(".colors .color")
colors.forEach((color) => {
  color.onclick = (eo) => {
    colors.forEach((color) => {
      color.checked = false
    });
    eo.target.checked = true
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
let quantite = document.querySelector(".quantite");
let inputQuantite = document.querySelector(".quantite input");

if(quantite){
  quantite.onclick = (eo) => {
    eo.preventDefault();
    if (eo.target.classList.contains("minus") && inputQuantite.value > 1) {
      inputQuantite.value--;
      console.log("minus");
    } else if (eo.target.classList.contains("plus") && inputQuantite.value < 10) {
      inputQuantite.value++;
      console.log("plus");
    }
    // Calculate TOTAL
    calculateTotal();
    

  };
  
  function calculateTotal() {
    let subTotal = document.querySelector("#subTotal .price .number").innerText;
    let shipping = document.querySelector("#shipping .price .number").innerText;
    let total = document.querySelector("#total .price .number");
    total.innerText = inputQuantite.value * subTotal + +shipping;
    document.getElementById("topTotal").value =
      inputQuantite.value * subTotal + +shipping;
  }
  calculateTotal();
}

// Last Popup
if(document.querySelector('.container-last-popup')){
  document.querySelector('.container-last-popup .cancel').onclick = (eo) => {
    eo.target.parentElement.parentElement.remove()
  }
}