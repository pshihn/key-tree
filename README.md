# key-tree 🔑🌲
* Simple keyed tree data structure
* 850 bytes gzipped

## Usage

A tree where each node has a string as a key, and an array of values. Nodes can simply be refered by their qualified path.
Nodes at any level can easily be accessed/mutated using their key path. 

``` javascript
const tree = new KeyTree();
tree.add('cars', ['toyota', 'bmw', 'honda', 'ford']);
tree.add('cars.models.colors', ['red', 'green', 'blue']);
tree.add('cars.models', ['sedan', 'suv']);
```

You can get specific values at the node or all the values under the node (all children).
``` javascript
tree.get('cars.models'); // ['sedan', 'suv']
tree.getSub('cars.models'); // ['sedan', 'suv', 'red', 'green', 'blue']
```

### Example use case

I recently used this to map a set of observer callbacks. So if *_a.b.c_* is modified then invoke the appropriate callbacks. But if *_a.b_* is modified, invoke callbacks associated with _a.b_, _a.b.c_, _a.b.d_.


## Install

Download the latest from [dist folder](https://github.com/pshihn/key-tree/tree/master/dist)

or from npm:
```
npm install --save key-tree
```

## API

This defines a KeyTree class

#### constructor([options, values])
Basic tree
```js
const tree = new KeyTree();
```
_options_ is an optional argument that can be used to define a custom delimiter for key paths. Default is '.'
```js
const tree = new KeyTree({ separator: '|' });
tree.add('cars|models', 'sedan');
```
_values_ is an optional argument to seed the tree
```js
let tree = new KeyTree(null, {
  'cars': ['toyota', 'bmw', 'honda', 'merc'],
  'animals': 'dogs',
  'cars.models': ['sedan', 'suv']
})
```

#### add(keyPath, value)
Add value(s) to the node at the specified keyPath.
_value_ can be a single object or an array of objects.

```js
tree.add('cars.models', 'sedan');
tree.add('cars.models', ['suv', 'atv'];
```

### get(keyPath)
Returns an array of values at the specified keyPath. An empty array is returned if there are no values.

### getSub(keyPath [, grouped])
Returns all the values at the specified key path and the values of all the children of that node.
By default, the result is a combined array.

if _grouped_ is specified and is set to true, the result is an object grouped by various key paths.

### remove(keyPath, value)
Removes the specified value from the specified keyPath.
Returns _true_ if value existed and was removed.

### removeKey(keyPath)
Removes the node at the specified keyPath and all its children.
Returns _true_ if there was a node at the path

### removeChildren(keyPath)
Remove all the children of a node. 

### clearKey(keyPath [, clearChildren])
Clear all the values associated with the specified node. 
Optionally, if _clearChildren_ is set to true, all the children values are also cleared.

## License
[MIT License](https://github.com/pshihn/key-tree/blob/master/LICENSE) (c) [Preet Shihn](https://twitter.com/preetster)
