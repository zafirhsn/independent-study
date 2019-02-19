//=======DESTRUCTURING======
const user = {
  name: "Francis",
  lastname: "Jones",
  age: 25
};

const {name,lastname,age} = user;

const message = ({name, lastname,age}) => {
  console.log(`My name is ${name} ${lastname}, age ${age}`);
}

message(user);

console.log(name);
console.log(lastname);

const cars = [
  "Camaro",
  "Nova",
  "A4"
];

// const camaro = cars[0];

const [camaro,nove,A4] = cars;

console.log(camaro);


const users = [
  {name: "Francis", lname: "Jones", age: 25},
  {name: "Martha", lname: "Smith", age: 20},
  {name: "Helen", lname: "Neron", age: 16}
]

const [{lname},...rest] = users;
console.log(lastname);
console.log(rest);

//===========PROMISES AND FETCH========
// 3 states of promises
// Unresolved, pending
// Resolved, fulfilled
// Rejected

let promise = new Promise((resolved, rejected) => {

  setTimeout(()=> {
    rejected();}, 5000);
});

promise.then(()=> {console.log(promise)}).catch(()=> {console.log("error")});

const url = "https://jsonplaceholder.typicode.com/posts/1";



