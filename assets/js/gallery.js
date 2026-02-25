// Modern Gallery Carousel
class GalleryCarousel {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".gallery-slide");
    this.totalSlides = this.slides.length;
    this.slidesContainer = document.getElementById("gallerySlides");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.indicatorsContainer = document.getElementById("galleryIndicators");
    this.autoPlayInterval = null;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    this.createIndicators();
    this.bindEvents();
    this.startAutoPlay();
    this.updateSlidePosition();
  }

  createIndicators() {
    this.indicatorsContainer.innerHTML = "";

    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement("div");
      indicator.className = "indicator";
      if (i === 0) indicator.classList.add("active");

      indicator.addEventListener("click", () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.previousSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Pause auto-play on hover
    const galleryContainer = document.querySelector(".gallery-container");
    galleryContainer.addEventListener("mouseenter", () => this.stopAutoPlay());
    galleryContainer.addEventListener("mouseleave", () => this.startAutoPlay());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.previousSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Touch/swipe support
    this.addTouchSupport();
  }

  addTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    this.slidesContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.slidesContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only trigger if horizontal swipe is greater than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    });
  }

  goToSlide(slideIndex) {
    if (this.isTransitioning || slideIndex === this.currentSlide) return;

    this.isTransitioning = true;
    this.currentSlide = slideIndex;
    this.updateSlidePosition();
    this.updateIndicators();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  nextSlide() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlidePosition();
    this.updateIndicators();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  previousSlide() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlidePosition();
    this.updateIndicators();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  updateSlidePosition() {
    const translateX = -this.currentSlide * 100;
    this.slidesContainer.style.transform = `translateX(${translateX}%)`;
  }

  updateIndicators() {
    const indicators = this.indicatorsContainer.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide);
    });
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new GalleryCarousel();
});
