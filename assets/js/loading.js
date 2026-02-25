// Loading Screen Controller
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
    this.minLoadingTime = 2000; // Mínimo 2 segundos de loading
    this.startTime = Date.now();
    this.isInitialized = false;

    this.init();
  }

  init() {
    // Start loading immediately since age verification is removed
    this.startLoading();
  }

  startLoading() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Garante que o loading seja mostrado por pelo menos 2 segundos
    window.addEventListener("load", () => {
      const elapsedTime = Date.now() - this.startTime;
      const remainingTime = Math.max(0, this.minLoadingTime - elapsedTime);

      setTimeout(() => {
        this.hideLoading();
      }, remainingTime);
    });

    // Fallback caso a página demore muito para carregar
    setTimeout(() => {
      this.hideLoading();
    }, 5000); // Máximo 5 segundos
  }

  showLoading() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.remove("hidden");
    }
  }

  hideLoading() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("hidden");

      // Remove o elemento do DOM após a animação
      setTimeout(() => {
        if (this.loadingScreen && this.loadingScreen.parentNode) {
          this.loadingScreen.parentNode.removeChild(this.loadingScreen);
        }
      }, 500);
    }
  }
}

// Inicializa o loading imediatamente
document.addEventListener("DOMContentLoaded", () => {
  window.loadingScreen = new LoadingScreen();
});
