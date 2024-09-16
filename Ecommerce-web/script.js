let carticon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

carticon.onclick = () => {
  cart.classList.add("active");
};
closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removecartbuttons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removecartbuttons.length; i++) {
    let button = removecartbuttons[i];
    button.addEventListener("click", removecartitems);
  }
  updateTool();
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  let addcart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addcart.length; i++) {
    let button = addcart[i];
    button.addEventListener("click", addcartclicked);
  }
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buybuttonclicked);
}
function buybuttonclicked() {
  alert("your order is placed");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTool();
}
function removecartitems(event) {
  let buttonclicked = event.target;
  buttonclicked.parentElement.remove();
  updateTool();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input <= 0) {
    input.value = 1;
  }
  updateTool();
}

function addcartclicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productimg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productimg);
  updateTool();
}
function addProductToCart(title, price, productimg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartitems = document.getElementsByClassName("cart-content")[0];
  let cartitemsnames = cartitems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartitemsnames.length; i++) {
    if (cartitemsnames[i].innerText == title) {
      alert("You have already this item in cart");
      return;
    }
  }
  let cartBoxContent = `<img src="${productimg}" alt="" class="cart-img" />
  <div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity" />
  </div>
  <i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartitems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removecartitems);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}
function updateTool() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let priceText = priceElement.innerText.replace("$", "").trim();
    let price = parseFloat(priceText);
    let quantity = parseInt(quantityElement.value);
    if (!isNaN(price) && !isNaN(quantity)) {
      total += price * quantity;
    }
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText =
    "$" + total.toFixed(2);
}
