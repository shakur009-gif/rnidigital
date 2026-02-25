// Video Controls for VSL Section
class VideoController {
  constructor() {
    this.video = document.getElementById("vslVideo");
    this.playBtn = document.getElementById("playBtn");
    this.playOverlay = document.getElementById("playOverlay");
    this.isPlaying = false;

    this.init();
  }

  init() {
    this.bindEvents();
    this.setupVideo();
  }

  setupVideo() {
    // Ensure video is muted initially (required by browsers for autoplay)
    this.video.muted = true;
    this.video.volume = 0; // Start with no volume

    // Add click event to video for play/pause
    this.video.addEventListener("click", () => this.togglePlay());

    // Hide overlay when video ends
    this.video.addEventListener("ended", () => this.showOverlay());

    // Show overlay when video is paused
    this.video.addEventListener("pause", () => {
      if (!this.video.ended) {
        this.showOverlay();
      }
    });
  }

  bindEvents() {
    this.playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.playVideo();
    });
  }

  playVideo() {
    if (this.video.paused) {
      // Unmute the video and set volume to 100%
      this.video.muted = false;
      this.video.volume = 1.0;

      // Play the video
      this.video
        .play()
        .then(() => {
          this.isPlaying = true;
          this.hideOverlay();
        })
        .catch((error) => {
          console.error("Error playing video:", error);
          // If autoplay fails, show user interaction message
          this.showUserInteractionMessage();
        });
    }
  }

  pauseVideo() {
    if (!this.video.paused) {
      this.video.pause();
      this.isPlaying = false;
    }
  }

  togglePlay() {
    if (this.video.paused) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }

  hideOverlay() {
    this.playOverlay.classList.add("hidden");
  }

  showOverlay() {
    this.playOverlay.classList.remove("hidden");
    this.isPlaying = false;
  }

  showUserInteractionMessage() {
    // Create a temporary message to inform user about autoplay policy
    const message = document.createElement("div");
    message.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 8px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px;
      text-align: center;
      z-index: 20;
      max-width: 300px;
    `;
    message.innerHTML = `
      <p>Click the play button to start the video with sound</p>
    `;

    this.playOverlay.appendChild(message);

    // Remove message after 3 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 3000);
  }

  // Public methods for external control
  getVideoElement() {
    return this.video;
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

// Initialize video controller when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new VideoController();
});
