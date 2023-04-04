"use strict";
const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const navList = document.querySelector(".nav__list");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const showcaseImg = document.querySelector("#showcase");
const productImgContainer = document.querySelector(".product__img");
const thumbnailsContainer = document.querySelector("#product__img__thumbnails");
const thumbnailWrapper = document.querySelectorAll(
	".product__img__thumbnail--product"
);


const counter = document.querySelector(".counter");
const btnMinus = document.querySelector(".btn__minus");
const btnPlus = document.querySelector(".btn__plus");

const addToCart = document.querySelector(".addToCart__cta");
const cartList = document.querySelector(".cartList");
const cartEmptyMsg = document.querySelector(".cart__empty--msg");
const checkoutBtn = document.querySelector(".checkout__cta");
const deleteCartItem = document.querySelector(".delete--cartItem");
const cartBtn = document.querySelector(".btn--cart");
const cartContainer = document.querySelector(".cart");
const cartWrapper = document.querySelector(".cartWrapper");
const numOfItems = document.querySelector(".numOfItems");

const lightBox = document.querySelector(".lightBox");
const closeLightBox = document.querySelector(".lightBox__closeBtn");
const lightBoxShowcase = document.querySelector("#lightBoxShowcase");
const lightBoxNextBtn = document.querySelector("#lightBoxNextBtn");
const lightBoxPreviousBtn = document.querySelector("#lightBoxPreviousBtn");
const thumbnailsContainerLightBox = document.querySelector(
	"#product__img__thumbnails--lightBox"
);
const lightBoxThumbnailWrapper = document.querySelectorAll(
	".product__img__thumbnail--lightBox"
);

openMenu.addEventListener("click", () => {
	openMenu.classList.add("hide");
	closeMenu.classList.remove("hide");
	navList.classList.remove("hide");
});
closeMenu.addEventListener("click", () => {
	openMenu.classList.remove("hide");
	closeMenu.classList.add("hide");
	navList.classList.add("hide");
});

// !Gallery
const gallery = [
	{ img: "images/image-product-1.jpg", idx: 0 },
	{ img: "images/image-product-2.jpg", idx: 1 },
	{ img: "images/image-product-3.jpg", idx: 2 },
	{ img: "images/image-product-4.jpg", idx: 3 },
];
// const galleryThumbnail = [
// 	"images/image-product-1-thumbnail.jpg",
// 	"images/image-product-2-thumbnail.jpg",
// 	"images/image-product-3-thumbnail.jpg",
// 	"images/image-product-4-thumbnail.jpg",
// ];

let currentIndex = 0;
const previewNextImg = () => {
	if (currentIndex === gallery.length - 1) {
		currentIndex = -1;
	}
	currentIndex++;
	showcaseImg.setAttribute("src", gallery[currentIndex].img);
	lightBoxShowcase.setAttribute("src", gallery[currentIndex].img);
	removeActive();
	isActive(currentIndex);
};
const previewPreviousImg = () => {
	if (currentIndex === 0) {
		currentIndex = gallery.length;
	}
	currentIndex--;
	showcaseImg.setAttribute("src", gallery[currentIndex].img);
	lightBoxShowcase.setAttribute("src", gallery[currentIndex].img);
	removeActive();
	isActive(currentIndex);
};
next.addEventListener("click", previewNextImg);
previous.addEventListener("click", previewPreviousImg);

lightBoxNextBtn.addEventListener("click", previewNextImg);
lightBoxPreviousBtn.addEventListener("click", previewPreviousImg);

setInterval(previewNextImg, 3000);

const displayThumbnailImage = (e) => {
	const target = e.target.closest(".product__img__thumbnail");
	if (!target) return;
	removeActive();
	target.classList.add("is--active");

	showcaseImg.setAttribute("src", gallery[+e.target.dataset.index].img);
	lightBoxShowcase.setAttribute("src", gallery[+e.target.dataset.index].img);
	currentIndex = +e.target.dataset.index;
	isActive(currentIndex)
};
thumbnailsContainer.addEventListener("click", displayThumbnailImage);

thumbnailsContainerLightBox.addEventListener("click", (e) => {
	const target = e.target.closest(".product__img__thumbnail--lightBox");
	if (!target) return;
	removeActive();
	target.classList.add("is--active");

	showcaseImg.setAttribute("src", gallery[+e.target.dataset.index].img);
	lightBoxShowcase.setAttribute("src", gallery[+e.target.dataset.index].img);
	currentIndex = +e.target.dataset.index;
	isActive(currentIndex)
})

const removeActive = () => {
	thumbnailWrapper.forEach((thumbnail) =>
		thumbnail.classList.remove("is--active")
	);
	lightBoxThumbnailWrapper.forEach((thumbnail) =>
		thumbnail.classList.remove("is--active")
	);
};

// active product img
const isActive = (idx) => {
	thumbnailWrapper.forEach((thumbnail) => {
		if (+thumbnail.dataset.index === idx) {
			thumbnail.classList.add("is--active");
		}
	});
	lightBoxThumbnailWrapper.forEach((thumbnail) => {
		if (+thumbnail.dataset.index === idx) {
			thumbnail.classList.add("is--active");
		}
	});
};

lightBox.classList.add("hideLightBox");
closeLightBox.addEventListener("click", () => {
	lightBox.classList.add("hideLightBox");
});
productImgContainer.addEventListener("click", () => {
	lightBox.classList.remove("hideLightBox");
});

// ---------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
//! CART
let productQuantity = 0;

counter.textContent = productQuantity;
const cart = [];

btnMinus.addEventListener("click", () => {
	if (productQuantity === 0) {
		return 0;
	}
	productQuantity--;
	counter.textContent = productQuantity;
});
btnPlus.addEventListener("click", () => {
	productQuantity++;
	counter.textContent = productQuantity;
});
addToCart.addEventListener("click", () => {
	cart.unshift({
		productQuantity,
		price: `${125 * productQuantity}`,
	});

	productQuantity = 0;
	counter.textContent = productQuantity;
	numOfItems.classList.remove("is--cartEmpty");
	numOfItems.textContent = cart.length;
});

const showCart = () => {
	if (cartWrapper.classList.contains("is--cartActive")) {
		cartWrapper.classList.remove("is--cartActive");
		if (!cart.length) return;

		cartEmptyMsg.classList.add("is--cartEmpty");
		cartList.classList.remove("is--cartEmpty");
		checkoutBtn.classList.remove("is--cartEmpty");
		
		cartList.innerHTML = "";
		cart.forEach((item) => {
			cartList.insertAdjacentHTML(
				"beforeend",
				`
			<li class="cartItem">
										<img src="images/image-product-1-thumbnail.jpg" alt="" class="product__img--cart">
										<section class="product--details">
											<p>Autumn Limited Edition...</p>
											<p class="cost">
												$125.00 x <span class="">${item.productQuantity}</span> <strong class="bill">$${
					125 * item.productQuantity
				}.00</strong>
											</p>
										</section>
										<button type="button" class="delete--cartItem">
											<img src="images/icon-delete.svg" alt="">
										</button>
									</li>
			`
			);
		});

		return;
	}
	cartWrapper.classList.add("is--cartActive");
	// numOfItems.classList.add("is--cartActive");
};
cartWrapper.addEventListener("click", (e) => {
	if (e.target.closest(".cart")) return;

	cartWrapper.classList.add("is--cartActive");
	// numOfItems.classList.add("is--cartActive");
});
cartBtn.addEventListener("click", showCart);


// if(deleteBtn)
// deleteCartItem.addEventListener("click", () => {
// 	console.log("clicked");
// })
