export class MessageQueue {
  constructor({ onShowTyping, onHideTyping, onMessage, onComplete, onPlaySound }) {
    this.onShowTyping = onShowTyping;
    this.onHideTyping = onHideTyping;
    this.onMessage = onMessage;
    this.onComplete = onComplete;
    this.onPlaySound = onPlaySound;
    this.processing = false;
    this._aborted = false;
  }

  abort() {
    this._aborted = true;
  }

  async processMessages(messages) {
    this.processing = true;
    this._aborted = false;

    for (const msg of messages) {
      if (this._aborted) return;

      if (msg.sender === 'ex') {
        this.onShowTyping();
        await this._wait(msg.delay || 1200);
        if (this._aborted) return;
        this.onHideTyping();
      }

      this.onMessage(msg);
      this.onPlaySound(msg.sender === 'ex' ? 'receive' : 'send');

      if (msg.sender === 'player') {
        await this._wait(msg.delay || 400);
      }
    }

    this.processing = false;

    if (!this._aborted) {
      this.onComplete();
    }
  }

  async processPlayerResponses(responses) {
    const playerMessages = responses.map(text => ({
      sender: 'player',
      type: 'text',
      text
    }));

    this.processing = true;
    this._aborted = false;

    for (const msg of playerMessages) {
      if (this._aborted) return;
      await this._wait(400);
      if (this._aborted) return;
      this.onMessage(msg);
      this.onPlaySound('send');
    }

    this.processing = false;
  }

  _wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
