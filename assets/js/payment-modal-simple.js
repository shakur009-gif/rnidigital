// Payment Modal System - Versão Simplificada
document.addEventListener("DOMContentLoaded", function () {
  console.log("Payment Modal Simple - DOM loaded");

  const modal = document.getElementById("paymentModal");
  const ctaButton = document.getElementById("testModalBtn");
  const closeBtn = document.getElementById("paymentModalClose");
  const cardBtn = document.getElementById("cardPaymentBtn");
  const otherBtn = document.getElementById("otherPaymentBtn");

  console.log("Elements found:", {
    modal: !!modal,
    ctaButton: !!ctaButton,
    closeBtn: !!closeBtn,
    cardBtn: !!cardBtn,
    otherBtn: !!otherBtn,
  });

  if (!modal || !ctaButton) {
    console.error("Required elements not found");
    return;
  }

  // CTA Button click
  ctaButton.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("CTA button clicked - showing modal");
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  // Close button click
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      console.log("Close button clicked - hiding modal");
      modal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  // Card payment button
  if (cardBtn) {
    cardBtn.addEventListener("click", function () {
      console.log("Card payment clicked");
      window.location.href = "https://buymeacoffee.com/rnidigital/e/513653";
    });
  }

  // Other payment button
  if (otherBtn) {
    otherBtn.addEventListener("click", function () {
      console.log("Other payment clicked");
      window.location.href =
        "https://t.me/VyresAdmin";
    });
  }

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      console.log("Modal background clicked - hiding modal");
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      console.log("Escape key pressed - hiding modal");
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  console.log("Payment Modal Simple - Initialized successfully");
});
