export class SoundManager {
  constructor() {
    this.sounds = {};
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    this.sounds.receive = new Audio('assets/sounds/message_receive.wav');
    this.sounds.send = new Audio('assets/sounds/message_send.wav');
    this.sounds.tap = new Audio('assets/sounds/choice_tap.wav');

    Object.values(this.sounds).forEach(audio => {
      audio.preload = 'auto';
      audio.volume = 0.5;
    });

    this.initialized = true;
  }

  play(type) {
    if (!this.initialized) this.init();

    const sound = this.sounds[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }
}
