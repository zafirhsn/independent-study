// ========SPREAD OPERATOR=========
const brands = ["Nissan", "Honda"];
const otherBrands = ["Ford", "Toyota", "Audi"];

// const newArr = brands.concat(otherBrands);

const newArr = [...brands,...otherBrands,"Kia"];

console.log(newArr);

// EXERCISE 1
// Refactor the code using ES6 and the rest operator
let totalDistance = (...dists) => {

  const total = dists.reduce((total, dist) => {
    return total + dist;
  }, 0);
  return total;
}
console.log(totalDistance(200,100,200))


// EXERCISE 2
// refactor the code using ES6 and the rest and spread operator
function showItems(arg1,...arg2){

  let arr = [...arg1,...arg2];

  console.log(arr);
}
showItems(["dogs","cats"],"turtles","sharks");


// ========CLASSES=========

// The old way with function constructors
// function Car() {}
// var car = new Car();

// Car.prototype.status = "New";
// Car.prototype.wheels = 4;
// Car.prototype.avail = function() {
//   console.log("Available");
// };

// console.log(car.__proto__);


// New way in ES6
class Car {
  constructor() {
    this.status = "New"
    this.wheels = 4;
    this.avail = () => {
      console.log("Avail");
    };
  }
}

class Ford extends Car {
  constructor() {
    super();   
  }
}

const car = new Car();
const ford = new Ford();
ford.color = "red";

console.log(car);
console.log(ford);
console.log(ford.__proto__);


//===========STRINGS AND NUMBERS======
console.log("foo".repeat(3));

let word = "camera";

// console.log(word.indexOf("cam"));

// Look for "cam", but start looking after first character
console.log(word.startsWith("cam", 1));

// Look for "era", but look within the first four chracters of the word
console.log(word.endsWith("era", 4));

// Look for "ame" starting after the 2nd character 
console.log(word.includes("ame", 2)); 


console.log(Number.isSafeInteger(200));
console.log(Number.isSafeInteger(0.45));

console.log(Number.isInteger(200));
console.log(Number.isInteger(0.21));

console.log(Math.trunc(42.8));


//=========GENERATORS=========

function *generator() {
  for (let i = 0; i < 3; i++) {
    yield `${i}th run`;  
  }
  return "Done";
}

const gen = generator();

// Almost like pausing a function everytime there is yield statement. After every yield and the final return, an object is returned that looks like this {value: , done: }. Everytime you call .next(), the function is run until the next yield statement or until it reaches a return statement at which point the object returned will be {value: , done: true}. Any .next() after the return statement is done will return an object {value: undefined, done: true}
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());


function getOrder() {
  return "Pizza and cake";
}

function *getlogGenerator() {
  console.log("Hello, how can I help you?");
  yield "Step 1 completed"

  console.log(`Your order was ${getOrder()}`);
  yield "Step 2 completed"

  console.log("Thanks for eating here");
  yield "Step 3 completed"

  return "Finished"
}

let newgen = getlogGenerator();

console.log(newgen.next());
console.log(newgen.next());
console.log(newgen.next());

function *brandsGen() {
  yield "Ford";
  yield "Nissan";
  yield "Chevy";
  yield "Toyota";
  yield "Honda";
}

const brandsGenerator = brandsGen();

for (var i of brandsGen()) {
  console.log(i);
}

const stores = {
  store1: "New York",
  store2: "India",
  // This is a symbol iterator, not exactly sure what this is all about but replaces generator code written below
  [Symbol.iterator]: function *(){
    yield this.store1;
    yield this.store2;
  }

}

const carObj = {
  id: 1, 
  brand: "Ford", 
  doors: 4,
  wheels: 4,
  color: "Red",
  year: 2017,
  model: "mustang",
  stores: stores,
  [Symbol.iterator]: function*(){
    yield this.brand;
    yield this.year;
    yield this.model;
    yield this.stores;
  }
}

function *carsGen(car) {
  yield car.brand;
  yield car.year;
  yield car.model;
  yield* car.stores;
}

let newCar = [];
for (let i of carObj) {
  newCar = [...newCar,i];
}

console.log(newCar);