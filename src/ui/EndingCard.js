export class EndingCard {
  constructor(container, onRestart) {
    this.container = container;
    this.onRestart = onRestart;
  }

  show(ending, unlockCount, totalEndings) {
    this.container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'ending-card-inner';

    const img = document.createElement('img');
    img.className = 'ending-image';
    img.src = ending.image;
    img.alt = ending.title;
    card.appendChild(img);

    const title = document.createElement('h2');
    title.className = 'ending-title';
    title.textContent = `You got: ${ending.title}`;
    card.appendChild(title);

    const adjectives = document.createElement('p');
    adjectives.className = 'ending-adjectives';
    adjectives.textContent = ending.adjectives.join(' · ');
    card.appendChild(adjectives);

    const summary = document.createElement('p');
    summary.className = 'ending-summary';
    summary.textContent = ending.summary;
    card.appendChild(summary);

    const progress = document.createElement('div');
    progress.className = 'ending-progress';

    const dots = document.createElement('div');
    dots.className = 'ending-dots';
    for (let i = 0; i < totalEndings; i++) {
      const dot = document.createElement('span');
      dot.className = `ending-dot ${i < unlockCount ? 'unlocked' : ''}`;
      dots.appendChild(dot);
    }
    progress.appendChild(dots);

    const progressText = document.createElement('p');
    progressText.className = 'ending-progress-text';
    progressText.textContent = `Endings discovered: ${unlockCount} / ${totalEndings}`;
    progress.appendChild(progressText);

    card.appendChild(progress);

    const restartBtn = document.createElement('button');
    restartBtn.className = 'restart-btn';
    restartBtn.textContent = 'Try Again';
    restartBtn.addEventListener('click', () => this.onRestart());
    card.appendChild(restartBtn);

    this.container.appendChild(card);
    this.container.classList.add('visible');
  }

  hide() {
    this.container.classList.remove('visible');
    this.container.innerHTML = '';
  }
}
