(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.KeyTree = factory());
}(this, (function () { 'use strict';

  class TreeNode {
    constructor(parent, key, values) {
      this.key = key || '';
      this.values = [];
      this.children = [];
      this.parent = parent;
      this.appendValues(values);
    }
    removeAllChildren() {
      this.children = [];
    }
    clearValues() {
      this.values = [];
    }
    getChild(key) {
      for (const c of this.children) {
        if (key === c.key) {
          return c;
        }
      }
      return null;
    }
    ensureChild(key) {
      let child = this.getChild(key);
      if (!child) {
        child = new TreeNode(this, key);
        this.children.push(child);
      }
      return child;
    }
    addChild(key, values) {
      let child = this.getChild(key);
      if (!child) {
        child = new TreeNode(this, key, values);
        this.children.push(child);
      } else {
        child.appendValues(values);
      }
      return child;
    }
    appendValues(values) {
      if (typeof values === 'undefined') return;
      const vlist = Array.isArray(values) ? values : [values];
      this.values = this.values.concat(vlist);
    }
  }

  class KeyTree {
    constructor(options, values) {
      this.sep = (options && options.separator) || '.';
      this.$ = new TreeNode();
      if (values) {
        for (const key in values) {
          this.add(key, values[key]);
        }
      }
    }

    add(key, values) {
      let current = this.$;
      if (key === '') {
        current.appendValues(values);
        return;
      }
      let subKeys = (key || '').trim().split(this.sep);
      for (let i = 0; i < subKeys.length; i++) {
        if (i === (subKeys.length - 1)) {
          current = current.addChild(subKeys[i], values);
        } else {
          current = current.ensureChild(subKeys[i]);
        }
      }
    }

    _getNode(key) {
      let current = this.$;
      if (key !== '') {
        let subKeys = (key || '').trim().split(this.sep);
        for (let i = 0; i < subKeys.length; i++) {
          if (!current) {
            break;
          }
          current = current.getChild(subKeys[i]);
        }
      }
      return current;
    }

    get(key) {
      let node = this._getNode(key);
      return node ? node.values : [];
    }

    getSub(key, grouped) {
      let result = { grouped: {}, ungrouped: [] };
      this._subChildren(key, this._getNode(key), result);
      return grouped ? result.grouped : result.ungrouped;
    }

    _subChildren(keyPath, node, result) {
      if (!node) {
        return;
      }
      result.grouped[keyPath] = node.values;
      result.ungrouped = result.ungrouped.concat(node.values);
      for (const c of node.children) {
        let ckey = `${keyPath}${this.sep}${c.key}`;
        this._subChildren(ckey, c, result);
      }
    }
  }

  return KeyTree;

})));
