// Countdown Timer
function startCountdown() {
  let timeLeft = 5 * 60; // 5 minutos em segundos
  const countdownElement = document.getElementById("countdown");

  const timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Formata o tempo com zero à esquerda
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    countdownElement.textContent = formattedTime;

    timeLeft--;

    // Quando o tempo acabar
    if (timeLeft < 0) {
      clearInterval(timer);
      countdownElement.textContent = "EXPIRED";
      countdownElement.style.backgroundColor = "#333";
      countdownElement.style.color = "#fff";

      // Opcional: adicionar uma animação ou ação quando expirar
      countdownElement.style.animation = "none";
    }

    // Alerta visual quando restam 30 segundos
    if (timeLeft === 30) {
      countdownElement.style.backgroundColor = "#ff0000";
      countdownElement.style.animation = "pulse 0.5s infinite";
    }
  }, 1000);
}

// Inicia o countdown quando a página carrega
document.addEventListener("DOMContentLoaded", startCountdown);
