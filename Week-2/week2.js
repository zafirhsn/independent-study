
const names = [
  "Zafir",
  "Razin",
  "Lenay"
];

for(let name of names) {
  console.log(name);
}

const nums = [10,20,30,40,50];
let total = 0;

for(let num of nums) {
  total += num;
}

console.log(total);


// Fat arrow function have different scoping of 'this' keyword. Lexical scoping, not block scoping. JS will look one level above function for 'this' scope. Helpful for functions within fucntions. However, need to be careful. Don't want arrow functions for object properties

const cars = {
  brands: ["Ford", "Audi", "BMW"],
  category: "Sport car",
  message: function() {
    return this.brands.map(function(brand) {
      console.log(`${brand} is a ${this.category}`);
    });
  }
}

//Undefined because the callback within map does not know what 'this' is. It can't refer to the object. This is where fat arrow functions are useful
cars.message();

// ===================
// EXERCISE 1
// var names= ["James","Ron","Lisa","Tommy"];
var randomName = items => {
 return items[Math.floor(Math.random()*items.length)]
}
var randomNumber = (maxNumber,minNumber) => {
 return Math.floor(Math.random() * maxNumber) + minNumber;
}
console.log(`${randomName(names)} magic number is ${randomNumber(5,2)}`);


// ========OBJECT LITERALS==============
const request = (url, data) => {
  $.ajax({method: "POST", url, data})
}

// EXERCISE 1 
var name = "Francis";
var lastname = "Jones"
var age = 23;
var obj

let createObject = (name,lastname,age) => {
   obj = {
       name,
       lastname,
       age,
       getName() {
         return name;
       }
   }
   return obj;
}
console.log(createObject(name,lastname,age))


// =======DEFAULT FUNCTION ARGUMENTS========
// Default function arguments let us define what the default argument should be if there is none given
// In ES5 you might put an if statement to see if the argument is undefined in order to set a default

function randomBrand() {
  const brands = ["ASOS", "Macys", "MK", "Calvin Klein"];
  return brands[Math.floor(Math.random() * brands.length)];
}


function clothes(brand = randomBrand()) {

  console.log(`My brand is ${brand}`);
}

clothes();


// EXERCISE 1 
// We want to run a function that greets the user by his name, but if the name is not provided we want to show a default name.
function greeting(name = "Bob"){

  return 'Hello '+ name;
}
console.log(greeting());


//=========REST OPERATOR==========

function args(...args) {
  console.log(args);
}

args("Val 1", "Val 2", "Val 3", "Val 4");

// ========SPREAD OPERATOR=========
const brands = ["Nissan", "Honda"];
const otherBrands = ["Ford", "Toyota", "Audi"];

// const newArr = brands.concat(otherBrands);

const newArr = [...brands,...otherBrands,"Kia"];

console.log(newArr);

// EXERCISE 1
// Refactor the code using ES6 and the rest operator
let totalDistance = (...dists) => {
  var total = 0;

  for(var i = 0; i < dists.length;i++){
      total += dists[i]
  }
  return total;
}
console.log(totalDistance(200,100,200))