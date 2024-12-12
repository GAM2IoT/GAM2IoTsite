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

document.getElementById("add-to-cart").addEventListener("click", function() {
    const quantity = document.getElementById("quantity").value;
    const model = document.getElementById("model").value;

    // Récupérer le panier actuel (ou créer un nouveau tableau s'il n'existe pas)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ajouter l'article au panier
    cart.push({
        model: model,
        quantity: parseInt(quantity)
    });

    // Stocker le panier mis à jour dans le localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Article ajouté au panier !");
});


document.getElementById('checkout').addEventListener('click', () => {
    alert('Commande confirmée !');
    cart.length = 0;
    updateCartPage();
});
