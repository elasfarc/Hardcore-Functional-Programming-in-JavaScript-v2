//https://codepen.io/drboolean/pen/zYYPmZO?editors=0011

// Setup
//==============
const _ = R;
const { formatMoney } = accounting;

// Example Data
const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
];

// Exercise 1:
// ============
// use _.compose() to rewrite the function below. Hint: _.prop() is curried.

const isLastInStock = _.compose(_.prop("in_stock"), _.last);

QUnit.test("Ex1: isLastInStock", (assert) => {
  assert.deepEqual(isLastInStock(CARS), false);
});

("");

// Exercise 2:
// ============
// use _.compose(), _.prop() and _.head() to retrieve the name of the first car

const nameOfFirstCar = _.compose(_.prop("name"), _.head);

QUnit.test("Ex2: nameOfFirstCar", (assert) => {
  assert.equal(nameOfFirstCar(CARS), "Ferrari FF");
});

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition

const _average = function (xs) {
  return _.reduce(_.add, 0, xs) / xs.length;
}; // <- leave be

var averageDollarValue = _.compose(
  _average,
  _.compose(_.map, _.prop)("dollar_value")
);

QUnit.test("Ex3: averageDollarValue", (assert) => {
  assert.equal(averageDollarValue(CARS), 790700);
});

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored names: e.g: sanitizeNames(["Hello World"]) //=> ["hello_world"].

const _underscore = _.replace(/\W+/g, "_"); //<-- leave this alone and use to sanitize

const sanitizeNames = _.map(_.compose(_underscore, _.toLower, _.prop("name")));

QUnit.test("Ex4: sanitizeNames", (assert) => {
  assert.deepEqual(sanitizeNames(CARS), [
    "ferrari_ff",
    "spyker_c12_zagato",
    "jaguar_xkr_s",
    "audi_r8",
    "aston_martin_one_77",
    "pagani_huayra",
  ]);
});

// Bonus 1:
// ============
// Refactor availablePrices with compose.

//multiple loops

/*
const availablePrices = _.compose(
  _.join(", "),
  _.map(_.compose(formatMoney, _.prop("dollar_value"))),
  _.filter(_.prop("in_stock"))
);
*/

// using transduce
const transducer = _.compose(
  _.filter(_.prop("in_stock")),
  _.map(_.compose(formatMoney, _.prop("dollar_value")))
);
const availablePrices = _.compose(_.join(", "), _.into([], transducer));

QUnit.test("Bonus 1: availablePrices", (assert) => {
  assert.deepEqual(availablePrices(CARS), "$700,000.00, $1,850,000.00");
});

// Bonus 2:
// ============
// Refactor to pointfree.

const fastestCar = _.compose(
  _.concat(_.__, " is the fastest"),
  _.prop("name"),
  _.last,
  _.sortBy(_.prop("horsepower"))
);

QUnit.test("Bonus 2: fastestCar", (assert) => {
  assert.equal(fastestCar(CARS), "Aston Martin One-77 is the fastest");
});
