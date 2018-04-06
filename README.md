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

You can get all values unde a node or specific values at that node
``` javascript
tree.get('cars.models'); // ['sedan', 'suv']
tree.getSub('cars.models'); // ['sedan', 'suv', 'red', 'green', 'blue']
```

### Example use case

I recently used this to map a series of observer callbacks. So if *_a.b.c_* is modified then invoke the appropriate callbacks. But if *_a.b_* is modified, invoke callbacks associated with _a.b_, _a.b.c_, _a.b.d_.


## Install

Download the latest from [dist folder](https://github.com/pshihn/key-tree/tree/master/dist)

or from npm:
```
npm install --save key-tree
```

## API

This defined a KeyTree class

### constructor([options, values])
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
