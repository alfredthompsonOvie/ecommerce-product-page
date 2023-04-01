"use strict";
const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const navList = document.querySelector(".nav__list");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const thumbnailsContainer = document.querySelector(".thumbnailsContainer");
const showcaseImg = document.querySelector(".showcase--img");

openMenu.addEventListener("click", () => {
  openMenu.classList.add("hide")
  closeMenu.classList.remove("hide");
  navList.classList.remove("hide");
});
closeMenu.addEventListener("click", () => {
  openMenu.classList.remove("hide")
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
// console.log(gallery.length);
next.addEventListener('click', () => {
  if (currentIndex === gallery.length - 1) {
    currentIndex = -1
  }
  currentIndex++
  showcaseImg.setAttribute('src', gallery[currentIndex]);
})
previous.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = gallery.length
  }
  currentIndex--
  showcaseImg.setAttribute('src', gallery[currentIndex]);
})
thumbnailsContainer.addEventListener('click', (e) => {
  showcaseImg.setAttribute('src', gallery[+e.target.dataset.index]);
  currentIndex = +e.target.dataset.index
  console.log("currIdx", currentIndex);
})
// thumbnails.forEach(tn=> tn.addEventListener("click", (e) => {
//   console.log(e);
// }))