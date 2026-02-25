// Security Protection System
class SecurityProtection {
  constructor() {
    this.init();
  }

  init() {
    // Apenas executa em desktop
    if (this.isMobile()) return;

    this.preventInspection();
    this.preventRightClick();
    this.preventKeyboardShortcuts();
    this.preventDevTools();
    this.obfuscateCode();
    this.detectAutomation();
    this.addWatermark();
  }

  // Detecta se é dispositivo móvel
  isMobile() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      window.innerWidth <= 768 ||
      "ontouchstart" in window
    );
  }

  // Previne clique direito (apenas desktop)
  preventRightClick() {
    if (this.isMobile()) return;

    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      // Removido alerta - apenas previne ação
    });
  }

  // Previne atalhos de teclado para inspeção (apenas desktop)
  preventKeyboardShortcuts() {
    if (this.isMobile()) return;

    document.addEventListener("keydown", (e) => {
      // F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+A
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "s") ||
        (e.ctrlKey && e.key === "a")
      ) {
        e.preventDefault();
        // Removido alerta - apenas previne ação
      }
    });
  }

  // Detecta tentativas de abrir DevTools (apenas desktop)
  preventDevTools() {
    if (this.isMobile()) return;

    let devtools = { open: false, orientation: null };
    const threshold = 160;

    setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          // Removido alerta - apenas detecta
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  // Detecta ferramentas de automação (apenas desktop)
  detectAutomation() {
    if (this.isMobile()) return;

    // Detecta Selenium, Puppeteer, etc.
    if (
      window.navigator.webdriver ||
      window.domAutomation ||
      window.domAutomationController ||
      window.callPhantom ||
      window._phantom ||
      window.phantom
    ) {
      // Removido alerta - apenas detecta
    }

    // Detecta extensões de automação
    if (
      window.chrome &&
      window.chrome.runtime &&
      window.chrome.runtime.onConnect
    ) {
      const originalOnConnect = window.chrome.runtime.onConnect;
      window.chrome.runtime.onConnect = function () {
        // Removido console.warn - apenas detecta
        return originalOnConnect.apply(this, arguments);
      };
    }
  }

  // Ofusca código sensível
  obfuscateCode() {
    // Remove comentários e espaços desnecessários
    const scripts = document.querySelectorAll("script[src]");
    scripts.forEach((script) => {
      if (
        script.src.includes("social-proof") ||
        script.src.includes("payment")
      ) {
        script.setAttribute(
          "integrity",
          "sha384-" + this.generateHash(script.src)
        );
      }
    });
  }

  // Adiciona marca d'água invisível
  addWatermark() {
    const watermark = document.createElement("div");
    watermark.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
      background: transparent;
      font-size: 0;
      color: transparent;
    `;
    watermark.textContent = "HOTHUB_SECURITY_" + Date.now();
    document.body.appendChild(watermark);
  }

  // Previne inspeção de elementos
  preventInspection() {
    // Remove atributos que facilitam inspeção apenas para social proof
    const elements = document.querySelectorAll("*");
    elements.forEach((el) => {
      if (el.id && el.id.includes("social")) {
        el.setAttribute("data-protected", "true");
      }
    });
  }

  // Verifica se elemento é protegido (desabilitado para não interferir com modal)
  isProtected(selector) {
    return false; // Desabilitado para permitir funcionamento do modal
  }

  // Gera hash para integridade
  generateHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  // Funções de alerta removidas para melhor performance

  // Proteção de cópia removida para melhor performance em mobile
}

// Inicializa proteção de segurança
document.addEventListener("DOMContentLoaded", () => {
  new SecurityProtection();
});

// Proteção adicional contra debug (apenas desktop)
(function () {
  "use strict";

  // Detecta se é mobile
  function isMobile() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      window.innerWidth <= 768 ||
      "ontouchstart" in window
    );
  }

  // Apenas executa em desktop
  if (isMobile()) return;

  // Detecta console aberto
  let devtools = { open: false };
  const threshold = 160;

  setInterval(() => {
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      if (!devtools.open) {
        devtools.open = true;
        // Apenas limpa console, sem alertas
        console.clear();
      }
    } else {
      devtools.open = false;
    }
  }, 500);
})();
