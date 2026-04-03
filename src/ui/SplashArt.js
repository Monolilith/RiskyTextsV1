const SPLASH_FILES = {
  angry: 'splash_anger.png',
  annoyed: 'splash_annoyed.png',
  shocked: 'splash_shock.png',
  smug: 'splash_smug.png',
  f_angry: 'splash_f_anger.png',
  f_annoyed: 'splash_f_annoyed.png',
  f_shocked: 'splash_f_shock.png',
  f_smug: 'splash_f_smug.png',
};

export class SplashArt {
  constructor(overlayEl) {
    this.overlay = overlayEl;
    this.imgEl = overlayEl.querySelector('.splash-image');
  }

  show(emotion) {
    const file = SPLASH_FILES[emotion] || `splash_${emotion}.png`;
    const src = `assets/images/${file}`;
    this.imgEl.src = src;
    this.imgEl.alt = emotion;

    return new Promise(resolve => {
      this.imgEl.onload = () => {
        this.overlay.classList.add('active');
        this.overlay.addEventListener('animationend', (e) => {
          if (e.target === this.overlay) {
            this.overlay.classList.remove('active');
            resolve();
          }
        }, { once: true });
      };

      this.imgEl.onerror = () => resolve();
    });
  }
}
