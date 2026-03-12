let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCountEl = document.getElementById("cart-count");
if (cartCountEl) cartCountEl.textContent = cart.length;

// Modal elements
const modal = document.getElementById("quantity-modal");
const modalName = document.getElementById("modal-product-name");
const qtyDisplay = document.getElementById("qty-display");
const confirmAdd = document.getElementById("confirm-add");
const closeModal = document.getElementById("close-modal");
const qtyIncrease = document.getElementById("qty-increase");
const qtyDecrease = document.getElementById("qty-decrease");

let selectedProduct = null;
let selectedStock = 0;
let selectedQty = 1;

// Open modal
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product");

        selectedProduct = {
            name: productCard.querySelector("h3").textContent,
            price: parseFloat(productCard.querySelector(".price").textContent.replace("£", "")),
            img: productCard.querySelector("img").src,
            stock: parseInt(productCard.dataset.stock)
        };

        selectedStock = selectedProduct.stock;
        selectedQty = 1;

        modalName.textContent = selectedProduct.name;
        qtyDisplay.textContent = selectedQty;

        modal.style.display = "flex";
    });
});

// Quantity controls
qtyIncrease.onclick = () => {
    if (selectedQty < selectedStock) {
        selectedQty++;
        qtyDisplay.textContent = selectedQty;
    }
};

qtyDecrease.onclick = () => {
    if (selectedQty > 1) {
        selectedQty--;
        qtyDisplay.textContent = selectedQty;
    }
};

// Confirm add
confirmAdd.onclick = () => {
    selectedProduct.quantity = selectedQty;

    cart.push(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    if (cartCountEl) cartCountEl.textContent = cart.length;

    modal.style.display = "none";
};

// Close modal
closeModal.onclick = () => {
    modal.style.display = "none";
};

// Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.filter;

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        products.forEach(product => {
            if (category === "all" || product.dataset.category === category) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
});