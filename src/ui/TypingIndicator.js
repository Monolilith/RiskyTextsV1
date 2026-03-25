export class TypingIndicator {
  constructor(container) {
    this.container = container;
    this.el = document.createElement('div');
    this.el.className = 'typing-indicator';
    this.el.innerHTML = `
      <div class="typing-bubble">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    this.el.style.display = 'none';
    this.container.appendChild(this.el);
  }

  show() {
    this.container.appendChild(this.el);
    this.el.style.display = 'flex';
    this._scrollIntoView();
  }

  hide() {
    this.el.style.display = 'none';
  }

  _scrollIntoView() {
    this.container.scrollTop = this.container.scrollHeight;
  }
}
