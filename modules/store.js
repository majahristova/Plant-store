
import { fetchingProducts } from "../firebase.js";
import { addToCart, getCartItems, setupCartItemAnimation } from "./cart.js";

async function initiateStore() {
  try {
    const data = await fetchingProducts();
    console.log(data);
    const cartItems = getCartItems();
    const cartCount = document.getElementById("cart-count");
    cartCount.innerText = cartItems?.length || null;
    displayProduct(data);
    setupCartItemAnimation();
  } catch (error) {
    console.log(error);
  }
}

initiateStore();

function displayProduct(data) {
  const maincontainer = document.querySelector("#plant-container");

  for (let i = 0; i < data.length; i++) {

    const showImage = document.createElement("img");
    showImage.classList.add("showImage");

    // Create elements for product info
    const smallDivForProduct = document.createElement("div");
    smallDivForProduct.classList.add("smalldivForPlantContainer");

    const nameForProduct = document.createElement("h1");
    nameForProduct.classList.add("nameForProduct");

    const priceForProduct = document.createElement("h3");
    priceForProduct.classList.add("priceForProduct");
  

    const leftInStorage = document.createElement("h5");
    leftInStorage.classList.add("leftInStorageText");
    // Create an "Add to cart" button element
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("addToCartButton");
    addToCartButton.innerText = "Add to cart";
    if (data[i].saldo <= 0) {
      addToCartButton.disabled = true;
    }
    addToCartButton.id = data[i].name + "button";
    addToCartButton.addEventListener("click", () => {
      if (data[i].saldo <= 0) {
        alert("Out of stock");
        addToCartButton.disabled = true;
      } else {
        // Add the product to the cart
        console.log("Adding product to cart:", data[i]);
        addToCart(data[i]);
      }
    });
    // Attach a click event handler to the button
    // Add the product info and button to the page

    maincontainer.appendChild(smallDivForProduct);
    smallDivForProduct.appendChild(nameForProduct);
    smallDivForProduct.appendChild(priceForProduct);
    smallDivForProduct.appendChild(showImage);
    smallDivForProduct.appendChild(leftInStorage);
    smallDivForProduct.appendChild(addToCartButton);
    // Set the content of the product info elements
    nameForProduct.innerText = data[i].name;
    priceForProduct.innerText = data[i].price + " kr";
    showImage.src = data[i].img;
    leftInStorage.innerText = "Left in storage = " + data[i].saldo;
  }
}
