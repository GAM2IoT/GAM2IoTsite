// Gestion du carrousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.style.display = index === currentSlide ? 'block' : 'none';
    });
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
});

updateCarousel();

// Gestion du panier
const cart = [];

document.getElementById('add-to-cart').addEventListener('click', () => {
    const quantity = document.getElementById('quantity').value;
    const model = document.getElementById('model').value;
    const price = model === 'offre1' ? 300 : 650;

    cart.push({ model, quantity: parseInt(quantity, 10), price });
    updateCartPage();
});

function updateCartPage() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Votre panier est vide.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>${item.model} - Quantité : ${item.quantity} - Prix : ${item.price * item.quantity} €</p>
                <button onclick="removeFromCart(${index})">Supprimer</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartPage();
}

document.getElementById('checkout').addEventListener('click', () => {
    alert('Commande confirmée !');
    cart.length = 0;
    updateCartPage();
});
