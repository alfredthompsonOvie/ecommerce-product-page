"use strict";
const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const navList = document.querySelector(".nav__list");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const thumbnailsContainer = document.querySelector(".product__img__thumbnails");
const thumbnails = document.querySelectorAll(".thumbnail");
const thumbnailWrapper = document.querySelectorAll(".product__img__thumbnail");
const showcaseImg = document.querySelector(".showcase");

const counter = document.querySelector(".counter");
const btnMinus = document.querySelector(".btn__minus");
const btnPlus = document.querySelector(".btn__plus");

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
	"images/image-product-1.jpg",
	"images/image-product-2.jpg",
	"images/image-product-3.jpg",
	"images/image-product-4.jpg",
];
// const galleryThumbnail = [
// 	"images/image-product-1-thumbnail.jpg",
// 	"images/image-product-2-thumbnail.jpg",
// 	"images/image-product-3-thumbnail.jpg",
// 	"images/image-product-4-thumbnail.jpg",
// ];

let currentIndex = 0;
// console.log(gallery.length);\

next.addEventListener("click", () => {
	if (currentIndex === gallery.length - 1) {
		currentIndex = -1;
	}
	currentIndex++;
	showcaseImg.setAttribute("src", gallery[currentIndex]);
});
previous.addEventListener("click", () => {
	if (currentIndex === 0) {
		currentIndex = gallery.length;
	}
	currentIndex--;
	showcaseImg.setAttribute("src", gallery[currentIndex]);
});

// thumbnails.forEach(thumbnail => {
//   let thumbnailIdx = +thumbnail.dataset.index 
//   if (thumbnailIdx === currentIndex) {
//     console.log(thumbnailIdx);
//     console.log(currentIndex);
//     thumbnail.classList.add('activeImg');

//   }
// })
thumbnailsContainer.addEventListener("click", (e) => {
  // const target = e.target.closest('.thumbnail');
  const target = e.target.closest('.product__img__thumbnail');
	if (!target) return;
	removeActive();
	target.classList.add('is--active');
	// currentImg.src = gallery[+target.dataset.index];
	// currentIndex = +target.dataset.index;

	showcaseImg.setAttribute("src", gallery[+e.target.dataset.index]);
  currentIndex = +e.target.dataset.index;
  // console.log(target);
	// console.log("currIdx", currentIndex);
});
const removeActive= ()=>{
  // thumbnails.forEach(thumbnail => thumbnail.classList.remove('is--active')
  // )
  thumbnailWrapper.forEach(thumbnail => thumbnail.classList.remove('is--active')
  )
  }
// thumbnails.forEach(tn=> tn.addEventListener("click", (e) => {
//   console.log(e);
// }))

// ---------------------------------------------
let productQuantity = 0;
counter.textContent = productQuantity;
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
