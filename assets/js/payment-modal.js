// Payment Modal System
class PaymentModal {
  constructor() {
    this.modal = document.getElementById("paymentModal");
    this.closeBtn = document.getElementById("paymentModalClose");
    this.cardBtn = document.getElementById("cardPaymentBtn");
    this.otherBtn = document.getElementById("otherPaymentBtn");
    this.ctaButton = document.getElementById("testModalBtn");

    this.init();
  }

  init() {
    console.log("PaymentModal init - Modal:", this.modal);
    console.log("PaymentModal init - CTA Button:", this.ctaButton);

    if (!this.modal || !this.ctaButton) {
      console.error("PaymentModal: Missing required elements");
      return;
    }

    // Event listeners
    this.ctaButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("CTA button clicked");
      this.showModal();
    });

    this.closeBtn.addEventListener("click", () => {
      this.hideModal();
    });

    this.cardBtn.addEventListener("click", () => {
      this.handleCardPayment();
    });

    this.otherBtn.addEventListener("click", () => {
      this.handleOtherPayment();
    });

    // Close modal when clicking outside
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.hideModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("show")) {
        this.hideModal();
      }
    });
  }

  showModal() {
    console.log("showModal called");
    console.log("Modal element:", this.modal);
    if (this.modal) {
      this.modal.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      console.log("Modal should be visible now");
    } else {
      console.error("Modal element not found");
    }
  }

  hideModal() {
    this.modal.classList.remove("show");
    document.body.style.overflow = ""; // Restore scrolling
  }

  handleCardPayment() {
    // Redireciona para o Buy Me a Coffee
    window.location.href = "https://buymeacoffee.com/rnidigital/e/513653";
  }

  handleOtherPayment() {
    // Redireciona para o Telegram com mensagem pré-formatada
    window.location.href =
      "https://t.me/VyresAdmin";
  }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new PaymentModal();
});
