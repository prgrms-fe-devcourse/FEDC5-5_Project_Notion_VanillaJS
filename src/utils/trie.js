class Node {
  constructor(value = "") {
    this.value = value;
    this.end = false;
    this.children = new Map();
    this.idx = null;
  }
}

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(id, title) {
    let currentNode = this.root;
    for (const letter of title) {
      if (!currentNode.children.has(letter)) {
        currentNode.children.set(letter, new Node(currentNode.value + letter)); // {o : pro}
      }
      currentNode = currentNode.children.get(letter);
    }
    currentNode.end = true;
    currentNode.idx = id;
  }

  exists(title) {
    let currentNode = this.root;
    for (let letter of title) {
      if (letter.charCodeAt(0) === 160) {
        letter = " ";
      }
      if (!currentNode.children.has(letter)) {
        return false;
      }
      currentNode = currentNode.children.get(letter);
    }
    return currentNode;
  }

  autoComplete(title) {
    if (!title) {
      return [];
    }
    let currentNode = searchTrie.exists(title);
    if (!currentNode) {
      return [];
    }
    let result = [];

    if (currentNode.idx) {
      result.push([currentNode.idx, currentNode.value]);
    }

    let queue = [currentNode];
    while (queue.length > 0) {
      let q = queue.shift();
      for (const next of q.children) {
        queue.push(next[1]);
        if (next[1].end) {
          result.push([next[1].idx, next[1].value]);
        }
      }
    }
    return result;
  }

  init() {
    searchTrie.root.children = new Map();
  }
}

export const searchTrie = new Trie();
