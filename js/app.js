setInterval(nextSlide, 3000);

function nextSlide() {
  let activeSlide = document.querySelector(".carousel-item.active");
  activeSlide.classList.remove("active");
  let nextSlide = activeSlide.nextElementSibling;
  if (!nextSlide) {
    nextSlide = document.querySelector(".carousel-inner .carousel-item");
  }
  nextSlide.classList.add("active");
}
