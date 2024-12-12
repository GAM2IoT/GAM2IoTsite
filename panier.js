// Configuration des prix et des images pour chaque offre
const offerDetails = {
    offre1: {
        price: 300,
        image: "C:\\Users\\Gwénaël\\OneDrive\\Bureau\\BUT\\Instrum avancée\\Projetpuissance\\capteur 1.png"
    },
    offre2: {
        price: 650,
        image: "C:\\Users\\Gwénaël\\OneDrive\\Bureau\\BUT\\Instrum avancée\\Projetpuissance\\capteur 2.png"
    }
};

// Récupération des données du panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartTableBody = document.querySelector("#cart-table tbody");
const cartTableHead = document.querySelector("#cart-table thead"); // Sélectionne l'en-tête

// Sélection des éléments du résumé
const offerPriceEl = document.getElementById("offer-price");
const shippingCostEl = document.getElementById("shipping-cost");
const totalPriceEl = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-button");

// Fonction pour mettre à jour le localStorage et le tableau
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    populateCart();
}

// Fonction pour supprimer un élément du panier
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Fonction pour générer une ligne dans le tableau pour chaque article
function populateCart() {
    cartTableBody.innerHTML = ""; // Réinitialiser le contenu du tableau
    let totalOfferPrice = 0;
    let totalShippingCost = 0;

    if (cart.length === 0) {
        // Masque l'en-tête si le panier est vide
        cartTableHead.style.display = "none";
        cartTableBody.innerHTML = '<tr><td colspan="7">Votre panier est vide.</td></tr>';
    } else {
        // Affiche l'en-tête si le panier contient des articles
        cartTableHead.style.display = "table-header-group";

        cart.forEach((item, index) => {
            const offer = offerDetails[item.model];
            const quantity = item.quantity;

            // Calcul des prix
            const priceOffer = offer.price;
            const shippingCost = 10;
            const totalPrice = priceOffer * quantity + shippingCost;

            // Mise à jour des totaux pour le résumé
            totalOfferPrice += priceOffer * quantity;
            totalShippingCost += shippingCost;

            // Création d'une ligne pour chaque article
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${offer.image}" alt="Image du capteur"></td>
                <td>${item.model === "offre1" ? "OFFRE 1 : L'essentiel" : "OFFRE 2 : Premium"}</td>
                <td>${quantity}</td>
                <td>${priceOffer} €</td>
                <td>${shippingCost} €</td>
                <td>${totalPrice} €</td>
                <td><button onclick="removeFromCart(${index})">Supprimer</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        // Affichage des données dans le résumé des prix
        offerPriceEl.textContent = `Prix de l'offre : ${totalOfferPrice} €`;
        shippingCostEl.textContent = `Frais de port : ${totalShippingCost} €`;
        totalPriceEl.textContent = `Prix total : ${totalOfferPrice + totalShippingCost} €`;
    }
}

// Ajout de l'événement au bouton Commander
checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Merci pour votre commande !");
        cart = [];
        updateCart();
    } else {
        alert("Votre panier est vide.");
    }
});

// Initialisation du tableau
populateCart();
