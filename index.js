import { menuArray } from '/data.js'

const menuItems = document.getElementById("menu-array");
const totalPriceDiv = document.getElementById("total-price");
const paymentContainer = document.getElementById("payment-container");

let orderAdded = false;
let totalPrice = 0;

function insertItems() {
    return menuArray.map((item, index) => `
        <div class="menu-item" data-index="${index}">
            <div class="emoji">
                <span class="menu-emoji">${item.emoji}</span>
            </div>
            <div class="emoji-details">
                <span class="menu-name">${item.name}</span>
                <span class="menu-ingredients">${item.ingredients}</span>
                <span class="menu-price">$${item.price}</span>
            </div>
            <button class="add-icon-btn" data-index="${index}">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <div>
            <hr class="custom-line">
        </div>
    `).join('');
}

function renderImage() {
    menuItems.innerHTML = insertItems();
}

function insertOrder(item) {
    totalPrice += item.price;
    return `
        <div class="menu-deatils">
            <span class="order-name">${item.name}</span>
            <span class="order-price">$${item.price}</span>
        </div>
    `;
}

function renderTotal() {
    totalPriceDiv.innerHTML = `
    <div>
        <hr class="custom-line">
    </div>
    <div class="total-price-details">
        <div class="total-price-text">Total Price:</div>
        <div class="total-price-value">$${totalPrice}</div>
    </div>
    <button class="complete-order-btn">
        Complete order
    </button>
    `;
}

function renderOrder(index) {
    const item = menuArray[index];
    if (!orderAdded) {
        menuItems.innerHTML += '<div class="order-title">Your Order</div>';
        orderAdded = true;
    }
    menuItems.innerHTML += insertOrder(item);
    renderTotal();
}

menuItems.addEventListener('click', function (e) {
    const button = e.target.closest('.add-icon-btn');
    if (button) {
        const index = button.dataset.index;
        renderOrder(index);
    }
});

function renderCardForm() {
    const cardFormHTML = `
<div class="card-payment-container">
    <div class="card-payment-header">
        <h2>Enter Card Details</h2>
    </div>
    <form class="card-payment-form" id="card-form">
        <div class="form-group">
            <input type="text" id="card-name" name="card-name" placeholder="Enter your name" required>
        </div>
        <div class="form-group">
            <input type="text" id="card-number" name="card-number" placeholder="Enter your card number" required>
        </div>
        <div class="form-group">
            <input type="text" id="card-cvv" name="card-cvv" placeholder="Enter your CVV" required>
        </div>
        <button type="submit" class="payment-button">Pay</button>
    </form>
</div>
    `;
    paymentContainer.innerHTML = cardFormHTML;

    const cardForm = document.getElementById('card-form');
    cardForm.addEventListener('submit', function (e) {
        e.preventDefault();
        renderThanksMessage();
    });
}

totalPriceDiv.addEventListener('click', function (e) {
    const button = e.target.closest('.complete-order-btn');
    if (button) {
        renderCardForm();
    }
});

function renderThanksMessage() {
    paymentContainer.innerHTML = `
        <div id="thank-you" class="thank-you-message">
            Thanks, ${document.getElementById('card-name').value}! Your order is on its way!
        </div>
    `;
}

renderImage();
