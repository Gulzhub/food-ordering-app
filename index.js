import { menuArray } from "./data.js";

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) handleAddtoCart(parseInt(e.target.dataset.add));
  else if (e.target.dataset.remove)
    handleRemoveFromCart(parseInt(e.target.dataset.remove));
  else if (e.target.classList.contains("order-btn")) {
    document.getElementById("payment-modal").classList.remove("hidden");
    renderModal();
  }
});

let cartItems = [];

function handleAddtoCart(itemId) {
  console.log(itemId);
  const item = menuArray.find((food) => food.id === itemId);
  cartItems.push(item);

  renderCart();
}

function handleRemoveFromCart(index) {
  cartItems.splice(index, 1);
  renderCart();
}

function renderCart() {
  console.log(cartItems);
  const billSection = document.querySelector(".bill");
  if (cartItems.length === 0) {
    billSection.style.display = "none";
    return;
  }

  billSection.style.display = "block";

  const cartHTML = cartItems
    .map(
      (item, index) =>
        `
     <div class="bill-card">
            <div class="bill-item">
              <h3 class="item-name">${item.name}</h3>
              <p class="remove" data-remove='${index}'>remove</p>
            </div>
            <div class="bill-amt">$${item.price}</div>
          </div>
     `
    )
    .join("");
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  billSection.innerHTML = `
   <h2>Your order</h2>
   ${cartHTML}
    <hr class="bill-margin" />
          <div class="total-price">
            <h3 class="item-name">Total price:</h3>
            <div class="total-bill-amt">$${total}</div>
          </div>
          <button class="order-btn">Complete order</button>
  `;
}

function getMenuItems() {
  let menuItems = ``;

  menuArray.forEach((item) => {
    menuItems += `
                <div class="menu-item" id=${item.id}>
          <div class="item">
            <p class="emoji" >${item.emoji}</p>
            <div class="item-details">
              <h2 class="item-name">${item.name}</h2>
              <p class="ingredients">${item.ingredients.join(",")}</p>
              <p class="price">$${item.price}</p>
            </div>
          </div>
          <div class="add" data-add="${item.id}">+</div>
        </div>
        <hr />
        `;
  });

  return menuItems;
}

function render() {
  document.getElementById("menu").innerHTML = getMenuItems();
}
render();

function renderModal() {
  document
    .getElementById("payment-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const thankYouMessage = document.createElement("p");
      thankYouMessage.className = "thank-you";
      thankYouMessage.textContent = `Thanks, ${name}! Your order is on its way!`;
      cartItems = [];
      const billSection = document.querySelector(".bill");
      billSection.innerHTML = "";
      billSection.appendChild(thankYouMessage);

      document.getElementById("payment-modal").classList.add("hidden");
    });
}
