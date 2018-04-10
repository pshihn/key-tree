const KeyTree = require('../');

test('Basic test', () => {
  const tree = new KeyTree();
  tree.add('cars', ['toyota', 'bmw', 'honda', 'merc']);
  tree.add('animals', 'dogs');
  tree.add('cars.models', ['sedan', 'suv']);
  tree.add('cars.years', [2001, 2002]);
  tree.add('cars.models.colors', ['red', 'green', 'blue']);

  let animals = tree.get('animals');
  expect(animals.length).toBe(1);
  expect(animals).toContain('dogs');

  let cars = tree.get('cars');
  expect(cars.length).toBe(4);
  expect(cars).toContain('toyota');
  expect(cars).toContain('merc');

  let models = tree.get('cars.models');
  expect(models.length).toBe(2);
  expect(models).toContain('suv');

  let years = tree.get('cars.years');
  expect(years.length).toBe(2);
  expect(years).toContain(2001);

  let colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(3);
  expect(colors).toContain('red');
  expect(colors).toContain('blue');

  let modelsub = tree.getSub('cars.models');
  expect(modelsub.length).toBe(5);
  expect(modelsub).toContain('sedan');
  expect(modelsub).toContain('green');

  let carSub = tree.getSub('cars');
  expect(carSub.length).toBe(11);
  expect(carSub).toContain('suv');
  expect(carSub).toContain('blue');
  expect(carSub).toContain('toyota');
});

test('Constructor with values', () => {
  let tree = new KeyTree(null, {
    'cars': ['toyota', 'bmw', 'honda', 'merc'],
    'animals': 'dogs',
    'cars.models': ['sedan', 'suv'],
    'cars.years': [2001, 2002]
  })

  let animals = tree.get('animals');
  expect(animals.length).toBe(1);
  expect(animals).toContain('dogs');

  let cars = tree.get('cars');
  expect(cars.length).toBe(4);
  expect(cars).toContain('toyota');
  expect(cars).toContain('merc');

  let models = tree.get('cars.models');
  expect(models.length).toBe(2);
  expect(models).toContain('suv');

  let years = tree.get('cars.years');
  expect(years.length).toBe(2);
  expect(years).toContain(2001);
});

test('Alt separator test', () => {
  let tree = new KeyTree({
    separator: '|'
  }, {
      'cars': ['toyota', 'bmw', 'honda', 'merc'],
      'animals': 'dogs',
      'cars|models': ['sedan', 'suv']
    });
  tree.add('cars|years', [2001, 2002]);
  tree.add('cars|years', [2003, 2004]);
  tree.add('cars|years', 2005);

  let animals = tree.get('animals');
  expect(animals.length).toBe(1);
  expect(animals).toContain('dogs');

  let cars = tree.get('cars');
  expect(cars.length).toBe(4);
  expect(cars).toContain('toyota');
  expect(cars).toContain('merc');

  let models = tree.get('cars|models');
  expect(models.length).toBe(2);
  expect(models).toContain('suv');

  let years = tree.get('cars|years');
  expect(years.length).toBe(5);
  expect(years).toContain(2001);
  expect(years).toContain(2005);
  expect(years).toContain(2004);

  let carSub = tree.getSub('cars');
  expect(carSub.length).toBe(11);
  expect(carSub).toContain('toyota');
  expect(carSub).toContain('sedan');
  expect(carSub).toContain(2001);
  expect(carSub).toContain(2005);
});

test('GetSup test', () => {
  const tree = new KeyTree();
  tree.add('cars', ['toyota', 'bmw', 'honda', 'merc']);
  tree.add('animals', 'dogs');
  tree.add('cars.models', ['sedan', 'suv']);
  tree.add('cars.years', [2001, 2002]);
  tree.add('cars.models.colors', ['red', 'green', 'blue']);

  let cars = tree.get('cars');
  expect(cars.length).toBe(4);
  let models = tree.get('cars.models');
  expect(models.length).toBe(2);
  let colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(3);

  cars = tree.getSup('cars');
  expect(cars.length).toBe(4);

  models = tree.getSup('cars.models');
  expect(models.length).toBe(6);
  expect(models).toContain('sedan');
  expect(models).toContain('bmw');

  colors = tree.getSup('cars.models.colors');
  expect(colors.length).toBe(9);
  expect(colors).toContain('honda');
  expect(colors).toContain('suv');
  expect(colors).toContain('red');
});