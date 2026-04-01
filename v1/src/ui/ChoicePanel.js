export class ChoicePanel {
  constructor(container, onChoice, onScrollRequest) {
    this.container = container;
    this.onChoice = onChoice;
    this.onScrollRequest = onScrollRequest;
    this.headerEl = container.querySelector('.choice-header');
    this.buttonsEl = container.querySelector('.choice-buttons');
  }

  show(choices) {
    this.buttonsEl.innerHTML = '';

    choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.label;
      btn.addEventListener('click', () => {
        this._disable();
        this.onChoice(choice, index);
      });
      this.buttonsEl.appendChild(btn);
    });

    this.onScrollRequest();
    this.container.classList.add('visible');

    this.container.addEventListener('transitionend', () => {
      this.onScrollRequest();
    }, { once: true });
  }

  hide() {
    this.container.classList.remove('visible');
  }

  _disable() {
    const buttons = this.buttonsEl.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
    });
  }
}
