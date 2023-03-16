if(document.querySelector(".container-last-popup")){
  localStorage.removeItem("productsIdsShoppingCard")
  // document.querySelector("section.table-container").remove()
  // document.querySelector("#numberOfShoppingCard").innerText = 0
}
let myIdsArray = localStorage.productsIdsShoppingCard
let storeName = document.getElementById("storeName").value
document.body.innerHTML = `
                            <form style="display:none" id="form" action="/${storeName}/shoppingCard" method="post">
                                <input type="hidden" value='${myIdsArray}' name="shoppingId">
                                <button type='submit'>Submit</button>
                            </form>
                          `

document.querySelector("#form").submit()


