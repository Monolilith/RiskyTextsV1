export class DialogueEngine {
  constructor() {
    this.storyData = null;
    this.meta = null;
    this.nodes = null;
  }

  async load(url) {
    const response = await fetch(url);
    this.storyData = await response.json();
    this.meta = this.storyData.meta;
    this.nodes = this.storyData.nodes;
  }

  getMeta() {
    return this.meta;
  }

  getNode(nodeId) {
    const node = this.nodes[nodeId];
    if (!node) {
      console.error(`Node not found: ${nodeId}`);
      return null;
    }
    return node;
  }

  getStartNodeId() {
    return this.meta.startNode;
  }

  isEndingNode(node) {
    return node.type === 'ending';
  }

  getEnding(node) {
    return node.ending || null;
  }

  getChoices(node) {
    return node.choices || [];
  }

  getMessages(node) {
    return node.messages || [];
  }
}
