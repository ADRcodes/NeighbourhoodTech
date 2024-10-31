// enable carousel scrolling
function scrollCarousel(direction) {
  const carousel = document.querySelector(".carousel");
  const scrollAmount = 600; // This is for scroll distance when we tap it.

  if (direction === "left") {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  } else if (direction === "right") {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}
