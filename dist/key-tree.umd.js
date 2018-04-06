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
      const node = this._getNode(key);
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

    remove(key, value) {
      const node = this._getNode(key);
      let ret = false;
      if (node) {
        while (true) {
          let ix = -1;
          for (let i = 0; i < node.values.length; i++) {
            if (node.values[i] == value) {
              ix = i;
              break;
            }
          }
          if (ix >= 0) {
            node.values.splice(ix, 1);
            ret = true;
          } else {
            break;
          }
        }
      }
      return ret;
    }

    removeKey(key) {
      if (key) {
        const node = this._getNode(key);
        let ret = false;
        if (node) {
          ret = true;
          const parent = node.parent;
          let ix = -1;
          for (let i = 0; i < parent.children.length; i++) {
            let c = parent.children[i];
            if (c == node) {
              ix = i;
              break;
            }
          }
          if (ix >= 0) {
            parent.children.splice(ix, 1);
          }
        }
        return ret;
      } else {
        throw 'Cannot remove the root key';
      }
    }

    removeChildren(key) {
      let ret = false;
      const node = this._getNode(key);
      if (node) {
        node.removeAllChildren();
        ret = true;
      }
      return ret;
    }

    clearKey(key, clearChildren) {
      const node = this._getNode(key);
      if (node) {
        this._clearNodeValues(node, clearChildren);
      }
    }

    _clearNodeValues(node, clearChildren) {
      node.clearValues();
      if (clearChildren) {
        for (const c of node.children) {
          this._clearNodeValues(c, clearChildren);
        }
      }
    }
  }

  return KeyTree;

})));
