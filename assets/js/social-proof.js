// Social Proof Notifications System
class SocialProofNotifications {
  constructor() {
    this.container = document.getElementById("socialProofNotifications");
    this.notifications = [];
    this.isActive = true;
    this.intervalId = null;

    // American names database (50 men, 10 women)
    this.names = [
      // Men (50)
      "James Wilson",
      "Michael Johnson",
      "Robert Brown",
      "David Davis",
      "William Miller",
      "Richard Garcia",
      "Thomas Rodriguez",
      "Christopher Martinez",
      "Daniel Anderson",
      "Matthew Taylor",
      "Anthony Thomas",
      "Mark Jackson",
      "Donald White",
      "Steven Harris",
      "Paul Martin",
      "Andrew Thompson",
      "Joshua Garcia",
      "Kenneth Martinez",
      "Kevin Robinson",
      "Brian Clark",
      "George Rodriguez",
      "Timothy Lewis",
      "Ronald Lee",
      "Jason Walker",
      "Edward Hall",
      "Jeffrey Allen",
      "Ryan Young",
      "Jacob King",
      "Gary Wright",
      "Nicholas Lopez",
      "Eric Hill",
      "Jonathan Scott",
      "Stephen Green",
      "Larry Adams",
      "Justin Baker",
      "Raymond Gonzalez",
      "Samuel Nelson",
      "Brandon Carter",
      "Patrick Mitchell",
      "Jack Perez",
      "Dennis Roberts",
      "Jerry Turner",
      "Tyler Phillips",
      "Aaron Campbell",
      "Jose Parker",
      "Henry Evans",
      "Adam Edwards",
      "Douglas Collins",
      "Nathan Stewart",
      "Zachary Sanchez",
      // Women (10)
      "Sarah Johnson",
      "Emily Davis",
      "Jessica Wilson",
      "Ashley Brown",
      "Amanda Miller",
      "Jennifer Garcia",
      "Lisa Anderson",
      "Michelle Taylor",
      "Kimberly Thomas",
      "Donna Jackson",
    ];

    this.messages = [
      "just paid for VIP access",
      "joined the VIP group",
      "purchased premium access",
      "completed payment",
      "acquired VIP access",
      "confirmed purchase",
      "paid via Apple Pay",
      "became a VIP member",
    ];

    this.init();
  }

  init() {
    // Inicia as notificações após 3 segundos da página carregada
    setTimeout(() => {
      this.startNotifications();
    }, 3000);

    // Pausa notificações quando usuário está interagindo com vídeo
    this.setupVideoInteraction();
  }

  setupVideoInteraction() {
    const video = document.getElementById("vslVideo");
    if (video) {
      // Social proof continua funcionando independente do estado do vídeo
      // Removido os event listeners que pausavam as notificações
    }
  }

  startNotifications() {
    if (!this.isActive) return;

    // Primeira notificação
    this.showNotification();

    // Configura intervalo aleatório entre 8-15 segundos
    this.scheduleNextNotification();
  }

  scheduleNextNotification() {
    if (!this.isActive) return;

    const delay = this.getRandomDelay(8000, 15000);

    this.intervalId = setTimeout(() => {
      if (this.isActive) {
        this.showNotification();
        this.scheduleNextNotification();
      }
    }, delay);
  }

  getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showNotification() {
    if (!this.isActive) return;

    const name = this.getRandomName();
    const message = this.getRandomMessage();

    const notification = this.createNotification(name, message);
    this.container.appendChild(notification);

    // Remove a notificação após 5 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);

    // Limita o número máximo de notificações visíveis
    this.limitVisibleNotifications();
  }

  createNotification(name, message) {
    const notification = document.createElement("div");
    notification.className = "notification";

    // Gera iniciais do nome
    const initials = this.getInitials(name);

    notification.innerHTML = `
      <div class="notification-avatar">${initials}</div>
      <div class="notification-content">
        <div class="notification-name">${name}</div>
        <div class="notification-message">${message}</div>
      </div>
    `;

    return notification;
  }

  getRandomName() {
    return this.names[Math.floor(Math.random() * this.names.length)];
  }

  getRandomMessage() {
    return this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  getInitials(name) {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  }

  limitVisibleNotifications() {
    const notifications = this.container.querySelectorAll(".notification");
    if (notifications.length > 3) {
      notifications[0].remove();
    }
  }

  // Métodos de pausa e retomada removidos - social proof funciona continuamente

  // Método público para parar completamente
  stop() {
    this.isActive = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Watching Counter System
class WatchingCounter {
  constructor() {
    this.counter = document.getElementById("watchingCounter");
    this.numberElement = document.getElementById("watchingNumber");
    this.video = document.getElementById("vslVideo");
    this.currentCount = 0;
    this.isActive = false;
    this.intervalId = null;
    this.animationId = null;

    this.init();
  }

  init() {
    if (!this.counter || !this.numberElement || !this.video) return;

    // Escuta eventos do vídeo
    this.video.addEventListener("play", () => this.startCounter());
    this.video.addEventListener("pause", () => this.pauseCounter());
    this.video.addEventListener("ended", () => this.stopCounter());
  }

  startCounter() {
    if (this.isActive) return;

    this.isActive = true;
    this.currentCount = this.getRandomStartCount();
    this.updateDisplay();
    this.showCounter();
    this.startIncrementing();
  }

  pauseCounter() {
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  stopCounter() {
    this.isActive = false;
    this.hideCounter();
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getRandomStartCount() {
    return Math.floor(Math.random() * 9) + 27; // Entre 27 e 35 pessoas
  }

  showCounter() {
    this.counter.classList.add("show");
  }

  hideCounter() {
    this.counter.classList.remove("show");
  }

  startIncrementing() {
    if (!this.isActive) return;

    // Incrementa a cada 8-15 segundos para ser mais realista
    const delay = this.getRandomDelay(8000, 15000);

    this.intervalId = setTimeout(() => {
      if (this.isActive) {
        this.incrementCount();
        this.startIncrementing();
      }
    }, delay);
  }

  getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  incrementCount() {
    if (!this.isActive) return;

    // 70% chance de subir, 30% chance de descer (mais realista)
    const shouldIncrement = Math.random() < 0.7;

    let change;
    if (shouldIncrement) {
      // Incrementos menores e mais realistas
      if (this.currentCount < 40) {
        change = Math.floor(Math.random() * 2) + 1; // +1 a +2
      } else if (this.currentCount < 70) {
        change = Math.floor(Math.random() * 2) + 1; // +1 a +2
      } else {
        change = 1; // +1 apenas
      }
    } else {
      change = -1; // Sempre -1 quando desce
    }

    const newCount = Math.max(12, Math.min(87, this.currentCount + change));

    // Anima a mudança do número
    this.animateCountChange(this.currentCount, newCount);
    this.currentCount = newCount;
  }

  animateCountChange(from, to) {
    const duration = 800; // 0.8 segundos (mais suave)
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function mais suave
      const easeOut = 1 - Math.pow(1 - progress, 2);
      const currentValue = Math.round(from + (to - from) * easeOut);

      this.numberElement.textContent = currentValue;

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      }
    };

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.animationId = requestAnimationFrame(animate);
  }

  updateDisplay() {
    this.numberElement.textContent = this.currentCount;
  }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new SocialProofNotifications();
  new WatchingCounter();
});
