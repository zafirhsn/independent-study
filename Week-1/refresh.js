// refreshing some JS from last semester

// Let and const
let age = 21; //Reassignable and mutable, block scoped
const name = "Zafir Hasan"; //Not reassignable or mutable
const numArray = [1,2,3,4,5] //Not reassignable, but YES mutable
numArray.push(6); // Works fine
// numArray = [3,4,5,100,87]; // Will not work
var hobby = "guitar"; // Var is ES5, not used much in ES6, functional scope

// Function
function addThree(a) {
  return a + 3;
}

// Arrow function assigned to variable
let addTwo = (a)=> {
  return (a+2-5);
}

// Objects
let obj = {
  firstName: "Zafir",
  lastName: "Hasan",
  age: 21,
  hobby: "guitar",
  // Can have anonymous functions
  aboutMe: ()=> {
    console.log("Hello, I'm Zafir");
  },
  // Or regular functions
  walk: function walk() {
    console.log("I'm walking");
  }
}

// Call object methods
obj.aboutMe();
obj.walk();

// Constructor function for creating classes
// JS does not support multiple constructors yet
function Employee(name) {
  this.name = name;
  this.age = 21;
  this.location = "New York";
  this.empID = 12345;

}

// Prototypal inheritance, all instances of class Employee have access to same prototype object
Employee.prototype.company = "Tech";

let emp = new Employee("zafir");
// Can also create properties like this
emp["salary"] = 70000;
console.log(emp.name);
console.log(emp.salary);
console.log(addTwo(2));