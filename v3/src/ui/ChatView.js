export class ChatView {
  constructor(container, meta) {
    this.container = container;
    this.meta = meta;
  }

  addBubble(sender, type, content) {
    if (type === 'image') {
      this._addImageBubble(sender, content);
    } else {
      this._addTextBubble(sender, content);
    }
    this._scrollToBottom();
  }

  _addTextBubble(sender, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `message-row ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = `bubble bubble-${sender}`;
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    this.container.appendChild(wrapper);
    this._lastBubble = bubble;
  }

  addReaction(emoji) {
    if (!this._lastBubble) return;
    const reaction = document.createElement('span');
    reaction.className = 'bubble-reaction';
    reaction.textContent = emoji;
    this._lastBubble.appendChild(reaction);
    this._scrollToBottom();
  }

  _addImageBubble(sender, src) {
    const wrapper = document.createElement('div');
    wrapper.className = `message-row ${sender}`;

    const caption = document.createElement('div');
    caption.className = 'image-caption';
    caption.textContent = `${this.meta.exName} sent a photo`;

    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-bubble';

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Photo';
    img.loading = 'lazy';

    imgContainer.appendChild(img);
    wrapper.appendChild(caption);
    wrapper.appendChild(imgContainer);
    this.container.appendChild(wrapper);
  }

  clear() {
    const typing = this.container.querySelector('.typing-indicator');
    this.container.innerHTML = '';

    const divider = document.createElement('div');
    divider.className = 'date-divider';
    divider.textContent = 'Today';
    this.container.appendChild(divider);

    if (typing) {
      this.container.appendChild(typing);
    }
  }

  _scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }
}
