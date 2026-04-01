export class SoundManager {
  constructor() {
    this.sounds = {};
    this.initialized = false;
    this.bgm = null;
    this.bgmPlaying = false;
  }

  init() {
    if (this.initialized) return;

    this.sounds.receive = new Audio('assets/sounds/message_receive.wav');
    this.sounds.send = new Audio('assets/sounds/message_send.wav');
    this.sounds.tap = new Audio('assets/sounds/choice_tap.wav');
    this.sounds.splash_angry = new Audio('assets/sounds/splash_angry.wav');
    this.sounds.splash_annoyed = new Audio('assets/sounds/splash_annoyed.wav');
    this.sounds.splash_shocked = new Audio('assets/sounds/splash_shocked.wav');
    this.sounds.splash_smug = new Audio('assets/sounds/splash_smug.wav');

    Object.values(this.sounds).forEach(audio => {
      audio.preload = 'auto';
      audio.volume = 0.5;
    });

    this.bgm = new Audio('assets/sounds/bgm.wav');
    this.bgm.loop = true;
    this.bgm.volume = 0.15;
    this.bgm.preload = 'auto';

    const muted = localStorage.getItem('bgmMuted') === 'true';
    if (!muted) {
      this.bgm.play().catch(() => {});
      this.bgmPlaying = true;
    }

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

  toggleBgm() {
    if (!this.initialized) this.init();

    if (this.bgmPlaying) {
      this.bgm.pause();
      this.bgmPlaying = false;
      localStorage.setItem('bgmMuted', 'true');
    } else {
      this.bgm.play().catch(() => {});
      this.bgmPlaying = true;
      localStorage.setItem('bgmMuted', 'false');
    }
    return this.bgmPlaying;
  }

  isBgmPlaying() {
    return this.bgmPlaying;
  }
}
