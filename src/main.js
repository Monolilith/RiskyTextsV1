import { DialogueEngine } from './engine/DialogueEngine.js';
import { MessageQueue } from './engine/MessageQueue.js';
import { StateManager } from './engine/StateManager.js';
import { ChatView } from './ui/ChatView.js';
import { ChoicePanel } from './ui/ChoicePanel.js';
import { EndingCard } from './ui/EndingCard.js';
import { TypingIndicator } from './ui/TypingIndicator.js';
import { SoundManager } from './audio/SoundManager.js';

class Game {
  constructor() {
    this.engine = new DialogueEngine();
    this.sound = new SoundManager();
    this.state = null;
    this.queue = null;
    this.chatView = null;
    this.choicePanel = null;
    this.endingCard = null;
    this.typingIndicator = null;
  }

  async init() {
    await this.engine.load('data/story.json');

    const meta = this.engine.getMeta();
    this.state = new StateManager(meta.startNode);

    const chatArea = document.getElementById('chat-area');
    const choicePanelEl = document.getElementById('choice-panel');
    const endingOverlay = document.getElementById('ending-overlay');
    const headerName = document.getElementById('header-name');
    const headerAvatar = document.getElementById('header-avatar');

    headerName.textContent = meta.exName;
    headerAvatar.src = meta.exAvatar;
    headerAvatar.alt = meta.exName;

    this.typingIndicator = new TypingIndicator(chatArea);
    this.chatView = new ChatView(chatArea, meta);

    this.choicePanel = new ChoicePanel(choicePanelEl, (choice) => {
      this._onChoice(choice);
    });

    this.endingCard = new EndingCard(endingOverlay, () => {
      this._restart();
    });

    this.queue = new MessageQueue({
      onShowTyping: () => this.typingIndicator.show(),
      onHideTyping: () => this.typingIndicator.hide(),
      onMessage: (msg) => this._renderMessage(msg),
      onComplete: () => this._onMessagesComplete(),
      onPlaySound: (type) => this.sound.play(type),
    });

    document.addEventListener('click', () => this.sound.init(), { once: true });

    this._playNode(this.state.getCurrentNodeId());
  }

  _playNode(nodeId) {
    this.state.setCurrentNode(nodeId);
    const node = this.engine.getNode(nodeId);
    if (!node) return;

    this.choicePanel.hide();

    const messages = this.engine.getMessages(node);
    this.queue.processMessages(messages);
  }

  _renderMessage(msg) {
    this.chatView.addBubble(msg.sender, msg.type, msg.type === 'image' ? msg.src : msg.text);
  }

  _onMessagesComplete() {
    const nodeId = this.state.getCurrentNodeId();
    const node = this.engine.getNode(nodeId);

    if (this.engine.isEndingNode(node)) {
      const ending = this.engine.getEnding(node);
      this.state.unlockEnding(ending.id);
      setTimeout(() => {
        this.endingCard.show(
          ending,
          this.state.getUnlockCount(),
          this.engine.getMeta().totalEndings
        );
      }, 1000);
      return;
    }

    const choices = this.engine.getChoices(node);
    if (choices.length > 0) {
      this.choicePanel.show(choices);
    }
  }

  async _onChoice(choice) {
    this.sound.play('tap');
    this.choicePanel.hide();

    await this.queue.processPlayerResponses(choice.responses);
    await this._wait(600);

    this._playNode(choice.next);
  }

  _restart() {
    this.queue.abort();
    this.state.reset();
    this.chatView.clear();
    this.endingCard.hide();
    this.choicePanel.hide();
    this.typingIndicator.hide();
    this._playNode(this.state.getCurrentNodeId());
  }

  _wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const game = new Game();
game.init().catch(err => console.error('Failed to initialize game:', err));
