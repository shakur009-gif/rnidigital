// Animated Carousel System
class AnimatedCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 25; // 5 imagens A + 20 imagens numeradas
    this.carouselTrack = document.getElementById("carouselTrack");
    this.indicatorsContainer = document.getElementById("carouselIndicators");
    this.autoPlayInterval = null;
    this.isTransitioning = false;
    this.isAutoPlaying = true;

    this.init();
  }

  init() {
    this.createSlides();
    this.createIndicators();
    this.bindEvents();
    this.startAutoPlay();
    this.updateSlidePosition();
  }

  createSlides() {
    this.carouselTrack.innerHTML = "";

    // Primeiras 5 imagens: Imagem-A1.webp até Imagem-A5.webp
    for (let i = 1; i <= 5; i++) {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";

      const img = document.createElement("img");
      img.src = `assets/img/Imagem-A${i}.webp`;
      img.alt = `Preview Image A${i}`;
      img.loading = "lazy";

      // Handle image load error
      img.onerror = () => {
        img.style.display = "none";
        const placeholder = document.createElement("div");
        placeholder.style.cssText = `
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 1.2rem;
          border-radius: 12px;
        `;
        placeholder.textContent = `Imagem-A${i}`;
        slide.appendChild(placeholder);
      };

      slide.appendChild(img);
      this.carouselTrack.appendChild(slide);
    }

    // Próximas 20 imagens: Imagem-1.webp até Imagem-20.webp
    for (let i = 1; i <= 20; i++) {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";

      const img = document.createElement("img");
      img.src = `assets/img/Imagem-${i}.webp`;
      img.alt = `Preview Image ${i}`;
      img.loading = "lazy";

      // Handle image load error
      img.onerror = () => {
        img.style.display = "none";
        const placeholder = document.createElement("div");
        placeholder.style.cssText = `
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 1.2rem;
          border-radius: 12px;
        `;
        placeholder.textContent = `Imagem-${i}`;
        slide.appendChild(placeholder);
      };

      slide.appendChild(img);
      this.carouselTrack.appendChild(slide);
    }
  }

  createIndicators() {
    this.indicatorsContainer.innerHTML = "";

    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement("div");
      indicator.className = "carousel-indicator";
      if (i === 0) indicator.classList.add("active");

      indicator.addEventListener("click", () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }

  bindEvents() {
    // Pause auto-play on hover
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    carouselWrapper.addEventListener("mouseenter", () => this.stopAutoPlay());
    carouselWrapper.addEventListener("mouseleave", () => this.startAutoPlay());

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

    this.carouselTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.carouselTrack.addEventListener("touchend", (e) => {
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
    this.carouselTrack.style.transform = `translateX(${translateX}%)`;
  }

  updateIndicators() {
    const indicators = this.indicatorsContainer.querySelectorAll(
      ".carousel-indicator"
    );
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide);
    });
  }

  startAutoPlay() {
    if (!this.isAutoPlaying) return;

    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Change slide every 4 seconds
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // Method to toggle auto-play
  toggleAutoPlay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  // Method to reset to first slide
  resetToFirst() {
    this.goToSlide(0);
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AnimatedCarousel();
});
