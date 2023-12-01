// nav and sidebar controls

var sideBar = document.querySelector(".sidebar");
var sideMenu = document.querySelector(".side-menu");
var hamburgerIcon = document.querySelector(".hamburger-menu-icon");
var closeIcon = document.querySelector(".close-btn");

hamburgerIcon.addEventListener("click", () => {
    sideBar.classList.remove("hidden");
})

closeIcon.addEventListener("click", () => {
    sideBar.classList.add("hidden");
})

document.addEventListener("click", (event) => {
    if (!sideMenu.contains(event.target) && event.target !== hamburgerIcon) {
        sideBar.classList.add("hidden");
    }
    if (!cart.contains(event.target) && event.target !== cartIcon) {
        cart.classList.add("cart-hidden");
        cartIcon.classList.remove("brigthness");
    }
})

// cart click handle

var cartIcon = document.querySelector(".cart-icon");
var cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("cart-hidden");
    cartIcon.classList.toggle("brigthness");
})


// hero image controls

var productHeroImage = document.querySelector(".product-hero-img");
var thumbGallery = document.querySelector(".thumb-gallery");
var thumbImages = document.querySelectorAll(".thumbnail-img");

var nextIcon = document.querySelector(".forward-icon");
var previousIcon = document.querySelector(".backward-icon");

thumbImages.forEach((item) => {
    item.addEventListener("click", onthumbclick);
})

function onthumbclick(event) {
    thumbImages.forEach(img => img.classList.remove("active"));

    event.target.classList.add("active");

    productHeroImage.src = event.target.src.replace("-thumbnail", "");
}

nextIcon.addEventListener("click", handleIconNextClick);
previousIcon.addEventListener("click", handleIconPreviousClick);

function handleIconNextClick() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }

    setHeroImage(imageIndex);
}

function handleIconPreviousClick() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }

    setHeroImage(imageIndex);
}


function getCurrentImageIndex() {
    var imageIndex = parseInt(productHeroImage.src.split("\\").pop().split("/").pop().replace(".jpg", "").replace("image-product-", ""));
    return imageIndex;
}

function setHeroImage(imageIndex) {
    productHeroImage.src = 'images/image-product-' + (imageIndex) + '.jpg';

    thumbImages.forEach(img => {
        img.classList.remove("active");
    })

    thumbImages[imageIndex - 1].classList.add("active");
}

// ligthbox

var overLay = document.querySelector(".overlay");
var ligthbox = document.querySelector(".lightbox");

let lightboxGallery;
let ligthboxHeroImage;

productHeroImage.addEventListener("click", onProductHeroImageClick);

function onProductHeroImageClick() {
    if (window.innerWidth >= 720) {
        if (overLay.childElementCount == 1) {
            var newNode = ligthbox.cloneNode(true);
            overLay.appendChild(newNode);

            var closeOverlayBtn = document.querySelector(".overlay-close-btn");
            closeOverlayBtn.addEventListener("click", onCloseOverlayBtnClick);

            lightboxGallery = overLay.querySelectorAll(".thumbnail-img");
            ligthboxHeroImage = overLay.querySelector(".product-hero-img")
            lightboxGallery.forEach(img => {
                img.addEventListener("click", onLightboxThumbclick)
            })

            var overlayNextIcon = overLay.querySelector(".forward-icon");
            var overlayPreviousIcon = overLay.querySelector(".backward-icon");

            overlayNextIcon.addEventListener("click", handleOverlayIconNextClick);
            overlayPreviousIcon.addEventListener("click", handleOverlayIconPreviousClick);

        }
        overLay.classList.remove("overlay-hidden");
    }
}


function onCloseOverlayBtnClick() {
    overLay.classList.add("overlay-hidden");
}

function onLightboxThumbclick(event) {
    lightboxGallery.forEach(img => img.classList.remove("active"));

    event.target.classList.add("active");

    ligthboxHeroImage.src = event.target.src.replace("-thumbnail", "");
}

function handleOverlayIconNextClick() {
    let imageIndex = getCurrentOverlayImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }

    setOverlayHeroImage(imageIndex);
}

function handleOverlayIconPreviousClick() {
    let imageIndex = getCurrentOverlayImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }

    setOverlayHeroImage(imageIndex);
}


function getCurrentOverlayImageIndex() {
    var imageIndex = parseInt(ligthboxHeroImage.src.split("\\").pop().split("/").pop().replace(".jpg", "").replace("image-product-", ""));
    return imageIndex;
}

function setOverlayHeroImage(imageIndex) {
    ligthboxHeroImage.src = 'images/image-product-' + (imageIndex) + '.jpg';

    lightboxGallery.forEach(img => {
        img.classList.remove("active");
    })

    lightboxGallery[imageIndex - 1].classList.add("active");
}


// product increment/decrement, cart and add to cart functions 

var incrementBtn = document.querySelector(".product-increment-btn");
var decrementBtn = document.querySelector(".product-decrement-btn");
var numberOfProducts = document.querySelector(".product-count");

var addToCartBtn = document.querySelector(".add-to-cart-btn")
var popupCount = document.querySelector(".popup-count");
var emptyCartMsg = document.querySelector(".empty-cart-msg");
var cartItems = document.querySelector(".cart-items");
var cartCheckoutBtn = document.querySelector(".cart-btn-section");


incrementBtn.addEventListener("click", onIncrementBtnClick);
decrementBtn.addEventListener("click", onDecrementBtnClick);

addToCartBtn.addEventListener("click", onAddtoCartBtnClick)


function onIncrementBtnClick() {
    numberOfProducts.innerHTML++;
}

function onDecrementBtnClick() {
    if (numberOfProducts.innerHTML > 1) {
        numberOfProducts.innerHTML--;
    }
}

function onAddtoCartBtnClick() {
    popupCount.innerHTML = numberOfProducts.innerHTML;

    updateCartItems();
}

function updateCartItems() {
    emptyCartMsg.classList.add("empty-msg-hidden");
    cartItems.innerHTML = '<div class="cart-item-thumbnail"><img src="images/image-product-1-thumbnail.jpg" alt="" srcset=""></div><div class="cart-item-description"><p class="cart-item-name">Fall Limited Edition Sneakers</p><div class="cart-item-edit-section"><div class="cart-item-price-section"><p class="cart-item-price"></p><p class="multiply-sign">x</p><p class="number-of-items"></p><p class="price-total"></p></div><img class="delete-img" src="images/icon-delete.svg" alt="" srcset=""></div></div>';
    cartCheckoutBtn.classList.remove("checkout-btn-hidden");

    updateCartMaths();
}


function updateCartMaths() {
    var ProductPrice = document.querySelector(".product-price");
    var cartItemPrice = document.querySelector(".cart-item-price");
    var cartNumberOfItems = document.querySelector(".number-of-items");
    var cartPriceTotal = document.querySelector(".price-total");
    var deleteBtn = document.querySelector(".delete-img");

    cartItemPrice.innerText = ProductPrice.innerText;
    cartNumberOfItems.innerText = numberOfProducts.innerText;

    var CartItemPriceDigit = parseInt(cartItemPrice.innerText.split("$").pop());
    var total = CartItemPriceDigit * cartNumberOfItems.innerText;

    cartPriceTotal.innerText = "$" + total + ".00";

    deleteBtn.addEventListener("click", () => {
        if (cartNumberOfItems.innerText > 1) {
        cartNumberOfItems.innerText = cartNumberOfItems.innerText - 1;
        total = CartItemPriceDigit * cartNumberOfItems.innerText;
        cartPriceTotal.innerText = "$" + total + ".00";
        popupCount.innerText = cartNumberOfItems.innerText;
        } else {
            emptyCartMsg.classList.remove("empty-msg-hidden");
            cartCheckoutBtn.classList.add("checkout-btn-hidden");
            cartItems.innerHTML = "";
            popupCount.innerText = "";
        }
    });

}
