// Code Obfuscation and Protection
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

  // Ofusca strings sensíveis
  const sensitiveData = {
    paymentUrl: "https://buymeacoffee.com/cyresadmin/e/453955",
    telegramUrl:
      "https://t.me/CyresAdminnn?text=Hello!%20I%20would%20like%20to%20buy%0A%0AContent:%20Access%20to%20the%20VIP%20group%20of%20Cp,%20Teens%20and%20all%20other%20leaked%20content%0ADescription:%0AExclusive%20high%20quality%20content%20%E2%80%A2%20Lifetime%20access%20%E2%80%A2%20Instant%20delivery%0ABonus:%20Two%20folders%20of%20the%20mega%20link%20of%20cp%0A%0APrice:%20$%2019",
    price: "$19.99",
    oldPrice: "$55",
  };

  // Função para decodificar dados ofuscados
  function decodeData(encoded) {
    return atob(encoded);
  }

  // Dados ofuscados em base64
  const encodedData = {
    payment: btoa(sensitiveData.paymentUrl),
    telegram: btoa(sensitiveData.telegramUrl),
    price: btoa(sensitiveData.price),
    oldPrice: btoa(sensitiveData.oldPrice),
  };

  // Intercepta tentativas de acesso aos dados
  Object.defineProperty(window, "sensitiveData", {
    get: function () {
      // Removido console.warn para melhor performance
      return null;
    },
    set: function () {
      // Removido console.warn para melhor performance
    },
  });

  // Protege funções críticas
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  };

  // Intercepta console em produção
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    console.log = function () {};
    console.warn = function () {};
    console.error = function () {};
  }

  // Detecta tentativas de debug (removido para melhor performance)

  // Protege contra minificação reversa
  const originalEval = window.eval;
  window.eval = function (code) {
    if (
      (typeof code === "string" && code.includes("payment")) ||
      code.includes("social")
    ) {
      // Removido console.warn para melhor performance
      return;
    }
    return originalEval.call(this, code);
  };

  // Verificações de integridade removidas para melhor performance

  // Verificação removida para melhor performance

  // Exporta dados seguros
  window.getSecureData = function (key) {
    if (encodedData[key]) {
      return decodeData(encodedData[key]);
    }
    return null;
  };
})();
