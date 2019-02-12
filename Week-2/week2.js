
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
