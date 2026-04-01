const STORAGE_KEY = 'riskytext_endings';

export class StateManager {
  constructor(startNode) {
    this.startNode = startNode;
    this.currentNodeId = startNode;
    this.unlockedEndings = this._loadEndings();
  }

  _loadEndings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  _saveEndings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.unlockedEndings));
  }

  setCurrentNode(nodeId) {
    this.currentNodeId = nodeId;
  }

  getCurrentNodeId() {
    return this.currentNodeId;
  }

  unlockEnding(endingId) {
    if (!this.unlockedEndings.includes(endingId)) {
      this.unlockedEndings.push(endingId);
      this._saveEndings();
    }
  }

  getUnlockedEndings() {
    return [...this.unlockedEndings];
  }

  getUnlockCount() {
    return this.unlockedEndings.length;
  }

  isEndingUnlocked(endingId) {
    return this.unlockedEndings.includes(endingId);
  }

  reset() {
    this.currentNodeId = this.startNode;
  }
}
