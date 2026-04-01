export class DustMotes {
  constructor(container, { count = 12, interval = 1800 } = {}) {
    this.container = container;
    this.count = count;
    this.interval = interval;
    this._spawn();
    this._timer = setInterval(() => this._spawn(), this.interval);
  }

  _spawn() {
    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    for (let i = 0; i < this.count; i++) {
      const mote = document.createElement('div');
      mote.className = 'dust-mote';

      const size = 1.5 + Math.random() * 2.5;
      const x = Math.random() * 100;
      const drift = (Math.random() - 0.5) * 40;
      const duration = 4 + Math.random() * 5;
      const delay = Math.random() * this.interval / 1000;
      const brightness = 0.3 + Math.random() * 0.5;

      mote.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        bottom: -4px;
        --mote-drift: ${drift}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: 0;
        filter: brightness(${brightness});
      `;

      this.container.appendChild(mote);
      mote.addEventListener('animationend', () => mote.remove());
    }
  }

  destroy() {
    clearInterval(this._timer);
  }
}
