const KeyTree = require('../');

test('Remove value test', () => {
  const tree = new KeyTree();
  tree.add('cars', ['toyota', 'bmw', 'honda', 'merc']);
  tree.add('animals', 'dogs');
  tree.add('cars.models', ['sedan', 'suv']);
  tree.add('cars.years', [2001, 2002]);
  tree.add('cars.models.colors', ['red', 'green', 'blue']);

  let cars = tree.get('cars');
  expect(cars.length).toBe(4);
  expect(cars).toContain('merc');
  let colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(3);
  expect(colors).toContain('red');

  tree.remove('cars', 'merc');
  cars = tree.get('cars');
  expect(cars.length).toBe(3);
  expect(cars).toContain('toyota');
  expect(cars).toContain('bmw');
  expect(cars).toContain('honda');

  tree.remove('cars.models.colors', 'red');
  colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(2);
  expect(colors).toContain('green');
  expect(colors).toContain('blue');
});

test('Remove key', () => {
  const tree = new KeyTree();
  tree.add('cars', ['toyota', 'bmw', 'honda', 'merc']);
  tree.add('animals', 'dogs');
  tree.add('cars.models', ['sedan', 'suv']);
  tree.add('cars.years', [2001, 2002]);
  tree.add('cars.models.colors', ['red', 'green', 'blue']);

  let cars = tree.get('cars');
  expect(cars.length).toBe(4);
  let colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(3);
  let models = tree.get('cars.models');
  expect(models.length).toBe(2);
  let years = tree.get('cars.years');
  expect(years.length).toBe(2);

  tree.removeKey('cars.models.colors');
  colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(0);

  tree.removeKey('cars');
  models = tree.get('cars.models');
  expect(models.length).toBe(0);
  cars = tree.get('cars');
  expect(cars.length).toBe(0);
  years = tree.get('cars.years');
  expect(years.length).toBe(0);

  let animals = tree.get('animals');
  expect(animals.length).toBe(1);
});

test('Remove children', () => {
  const tree = new KeyTree();
  tree.add('cars', ['toyota', 'bmw', 'honda', 'merc']);
  tree.add('cars.models', ['sedan', 'suv']);
  tree.add('cars.years', [2001, 2002]);
  tree.add('cars.models.colors', ['red', 'green', 'blue']);

  let cars = tree.get('cars');
  expect(cars.length).toBe(4);
  let colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(3);
  let models = tree.get('cars.models');
  expect(models.length).toBe(2);
  let years = tree.get('cars.years');
  expect(years.length).toBe(2);

  tree.removeChildren('cars.models');
  models = tree.get('cars.models');
  expect(models.length).toBe(2);
  colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(0);
  years = tree.get('cars.years');
  expect(years.length).toBe(2);

  tree.removeChildren('cars');
  models = tree.get('cars.models');
  expect(models.length).toBe(0);
  cars = tree.get('cars');
  expect(cars.length).toBe(4);
  cars = tree.getSub('cars');
  expect(cars.length).toBe(4);
});

test('Clear key', () => {
  const tree = new KeyTree();
  tree.add('cars', ['toyota', 'bmw', 'honda', 'merc']);
  tree.add('cars.models', ['sedan', 'suv']);
  tree.add('cars.years', [2001, 2002]);
  tree.add('cars.models.colors', ['red', 'green', 'blue']);

  let cars = tree.get('cars');
  expect(cars.length).toBe(4);
  let colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(3);
  let models = tree.get('cars.models');
  expect(models.length).toBe(2);
  let years = tree.get('cars.years');
  expect(years.length).toBe(2);

  tree.clearKey('cars');
  cars = tree.get('cars');
  expect(cars.length).toBe(0);
  colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(3);
  models = tree.get('cars.models');
  expect(models.length).toBe(2);
  years = tree.get('cars.years');
  expect(years.length).toBe(2);


  tree.clearKey('cars', true);
  cars = tree.get('cars');
  expect(cars.length).toBe(0);
  colors = tree.get('cars.models.colors');
  expect(colors.length).toBe(0);
  models = tree.get('cars.models');
  expect(models.length).toBe(0);
  years = tree.get('cars.years');
  expect(years.length).toBe(0);
});