import './style.css';
import { gsap } from "gsap";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
"use strict";
function init() {
	const openMenu = document.querySelector(".openMenu");
	const closeMenu = document.querySelector(".closeMenu");
	const navListMobile = document.querySelector(".nav__list--mobile");
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
	const checkout = document.querySelector("#checkout");

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
	// ! Open mobile nav---------------------------------------------------------

	const mobileNavTl = gsap.timeline({
		// paused: true,
		onReverseComplete: () => {
			openMenu.classList.remove("hide");
			closeMenu.classList.add("hide");
			navListMobile.classList.add("hide");
			gsap.to([".nav__list", ".list__item"], {
				clearProps: "all",
			});
		},
		onComplete: () => {
			gsap.to([".nav__list", ".list__item"], {
				clearProps: "all",
			});
		},
		onStart: () => {
			openMenu.classList.add("hide");
			closeMenu.classList.remove("hide");
			navListMobile.classList.remove("hide");
		},
		defaults: {
			ease: "power4.out",
			duration: 1,
		},
	});
	mobileNavTl
		.from(".nav__list--mobile", {
			xPercent: -100,
			ease: "power4.out",
		})
		.from(
			".list__item--mobile",
			{
				yPercent: 100,
				autoAlpha: 0.01,
				stagger: 0.2,
			},
			"-=.3"
		);
	mobileNavTl.reversed(true)
	function toggleMenu() {
		mobileNavTl.reversed(!mobileNavTl.reversed());
	}
	openMenu.addEventListener("click", toggleMenu);
	closeMenu.addEventListener("click", toggleMenu);

	// !Gallery-----------------------------------------------------------------
	const gallery = [
		{ img: "images/image-product-1.jpg", idx: 0 },
		{ img: "images/image-product-2.jpg", idx: 1 },
		{ img: "images/image-product-3.jpg", idx: 2 },
		{ img: "images/image-product-4.jpg", idx: 3 },
	];

	let currentIndex = 0;
	const previewCurrentImg = () => {
		showcaseImg.setAttribute("src", gallery[currentIndex].img);
		// gsap.fromTo(showcaseImg, {
		// 	x: 10,
		// }, { x: 0 })
		gsap.fromTo(showcaseImg, {
			clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
		}, {
			clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
			duration: 1.5
		})
		lightBoxShowcase.setAttribute("src", gallery[currentIndex].img);
		gsap.fromTo(lightBoxShowcase, {
			x: 10,

		}, { x: 0 })
		removeActive();
		isActive(currentIndex);
	};
	const previewNextImg = () => {
		if (currentIndex === gallery.length - 1) {
			currentIndex = -1;
		}
		currentIndex++;
		previewCurrentImg();
	};
	const previewPreviousImg = () => {
		if (currentIndex === 0) {
			currentIndex = gallery.length;
		}
		currentIndex--;
		previewCurrentImg();
	};
	next.addEventListener("click", previewNextImg);
	previous.addEventListener("click", previewPreviousImg);

	lightBoxNextBtn.addEventListener("click", previewNextImg);
	lightBoxPreviousBtn.addEventListener("click", previewPreviousImg);

	setInterval(previewNextImg, 3000);

	const getThumbnail = (thumbnail) => {
		if (!thumbnail) return;
		removeActive();
		thumbnail.classList.add("is--active");

		showcaseImg.setAttribute("src", gallery[+thumbnail.dataset.index].img);

		// !animation-------------------------------------------------------------
		// !animation-------------------------------------------------------------
	
		gsap.fromTo(showcaseImg, {
			clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
		}, {
			clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
			duration: 1.5
		})
	
		lightBoxShowcase.setAttribute("src", gallery[+thumbnail.dataset.index].img);
		currentIndex = +thumbnail.dataset.index;
		isActive(currentIndex);
	};

	thumbnailsContainer.addEventListener("click", (e) => {
		const target = e.target.closest(".product__img__thumbnail");
		getThumbnail(target);
	});

	thumbnailsContainerLightBox.addEventListener("click", (e) => {
		const target = e.target.closest(".product__img__thumbnail--lightBox");
		getThumbnail(target);
	});

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

	//! CART------------------------------------------------------------------------
	let productQuantity = 0;

	counter.textContent = productQuantity;
	let cart = [];

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
	const updateBasket = () => {
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
												$125.00 x <span class="">${item.productQuantity}</span> <strong class="bill">$${125 * item.productQuantity
				}.00</strong>
											</p>
										</section>
										<button type="button" class="delete--cartItem" data-id="${item.id}">
											<img src="images/icon-delete.svg" alt="">
										</button>
									</li>
			`
			);
		});
	};
	let id = 0; //!use uuid or some id generator-------------------------------
	addToCart.addEventListener("click", () => {
		if (productQuantity === 0) return;
		cart.unshift({
			productQuantity,
			price: `${125 * productQuantity}`,
			id,
		});
		id++;
		productQuantity = 0;
		counter.textContent = productQuantity;

		if (cart.length === 0) {
			numOfItems.classList.add("is--cartEmpty");
			return;
		}
		numOfItems.classList.remove("is--cartEmpty");
		numOfItems.textContent = cart.length;
		updateBasket();
	});

	const showCart = () => {
		if (cartWrapper.classList.contains("is--cartActive")) {
			cartWrapper.classList.remove("is--cartActive");
			gsap.from(cartWrapper, {
				autoAlpha: 0.01,
				x: 30,
			})
			if (!cart.length) return;

			cartEmptyMsg.classList.add("is--cartEmpty");
			cartList.classList.remove("is--cartEmpty");
			checkoutBtn.classList.remove("is--cartEmpty");
			return;
		}
		gsap.to(cartWrapper, {
			autoAlpha: 0.01,
			x: 30,
			onComplete: () => {
				cartWrapper.classList.add("is--cartActive");
				gsap.to(cartWrapper, {
					clearProps: true
				})
			}
		})
	};
	cartBtn.addEventListener("click", showCart);

	cartWrapper.addEventListener("click", (e) => {
		if (e.target.closest(".cart")) return;
		if (e.target.closest(".delete--cartItem")) return;
		// console.log("cartWrapper");

		// cartWrapper.classList.add("is--cartActive");
		gsap.to(cartWrapper, {
			autoAlpha: 0.01,
			x: 30,
			onComplete: () => {
				cartWrapper.classList.add("is--cartActive");
				gsap.to(cartWrapper, {
					clearProps: true
				})
			}
		})
	});

	// ! cart delete logic----------------------------------------------------------
	cartContainer.addEventListener("click", (e) => {
		const target = e.target.closest(".delete--cartItem");
		if (!target) return;

		cart = cart.filter((item) => item.id !== +target.dataset.id);
		if (cart.length === 0) {
			cartEmptyMsg.classList.remove("is--cartEmpty");
			cartList.classList.add("is--cartEmpty");
			checkoutBtn.classList.add("is--cartEmpty");

			numOfItems.classList.add("is--cartEmpty");
		} else {
			numOfItems.classList.remove("is--cartEmpty");
			updateBasket();
		}
		numOfItems.textContent = cart.length;
	});
	// ! cart checkout logic--------------------------------------------------------
	checkout.addEventListener("click", (e) => {
		console.log("checkout");
	});
	// ! page animation-------------------------------------------------------------
	function animatePage() {
		const tl = gsap.timeline({
			defaults: {
				ease: "power3.out",
				duration: 1.5
			}
		});

		tl
			.from(["nav .grid__contents"], {
				autoAlpha: 0.01,
			})
			.fromTo([".hamburger"], {
				autoAlpha: 0.01,
			}, {
				autoAlpha: 1,
			}, "<")
			.fromTo([".brand"], {
				clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
			}, {
				clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)"
			})
			.from(".list__item", {
				y: 30,
				autoAlpha: 0.01,
				stagger: 0.2
			}, "<.8")
			.fromTo([".btn--cart", ".avatar"], {
				xPercent: -50,
				autoAlpha: 0.01,
				// stagger: 0.2
			}, {
				xPercent: 0,
				autoAlpha: 1,
				stagger: 0.2
			}, "<.8")
			.from(".product__img", {
				autoAlpha: 0.01,
				xPercent: -20,
			})
			.fromTo(".subheading", {
				clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
			}, {
				clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)"
			})
			.from([".heading"], {
				yPercent: 80,
				autoAlpha: 0.01,
				stagger: 0.2,
			}, "-=.8")
			.fromTo(".product__details", {
				y: 20,
				clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
			}, {
				y: 0,
				clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
			})
			.from([
				".product__price--current > *",
				".product__price--oldPrice",
			
			], {
				xPercent: -100,
				autoAlpha: 0.01,
				stagger: 0.3
			}, "<0.8")
			.from([
				".quantity__counter",
				".addToCart__cta"
			], {
				yPercent: 50,
				autoAlpha: 0.01,
				stagger: 0.2,
			})
			.from([".product__img__thumbnails > *"], {
				yPercent: 50,
				autoAlpha: 0.01,
				stagger: 0.2,
			}, "<")
			.from(".controls > *", {
				autoAlpha: 0.01,
				stagger: 0.2,
			}, "<")
	}
	animatePage()

}

window.addEventListener("DOMContentLoaded", init);

