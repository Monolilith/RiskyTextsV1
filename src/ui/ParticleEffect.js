export class ParticleEffect {
  constructor(container) {
    this.container = container;
  }

  emit(count = 12) {
    const rect = this.container.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const size = 4 + Math.random() * 6;
      const xStart = Math.random() * rect.width;
      const xDrift = (Math.random() - 0.5) * 60;
      const duration = 0.8 + Math.random() * 0.6;
      const delay = Math.random() * 0.15;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${xStart}px;
        bottom: 0;
        --drift: ${xDrift}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: 0;
      `;

      this.container.appendChild(particle);
      particle.addEventListener('animationend', () => particle.remove());
    }
  }
}
