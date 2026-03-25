export class ChoicePanel {
  constructor(container, onChoice) {
    this.container = container;
    this.onChoice = onChoice;
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

    this.container.classList.add('visible');
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
