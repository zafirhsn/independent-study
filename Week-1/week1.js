
let listPlayers = document.querySelector(".players");
console.log(listPlayers);

const players = [
  {jersey:56,name:"Djounte Murray",position:"Point guard",PPG:2.6},
  {jersey:98,name:"Dennis Rodman",position:"Small Forward",PPG:10.8},
  {jersey:1,name:"Michael Jordan",position:"Small Forward",PPG:345.6},
  {jersey:2,name:"Lebron James",position:"Shooting Guard",PPG:26.7},
  {jersey:33,name:"Patrick Ewing",position:"Center",PPG:20.2}
]

for (let i = 0; i < players.length; i++) {
  listPlayers.insertAdjacentHTML("beforeend", `<li>${players[i].jersey} - ${players[i].name} -- Position: ${players[i].position} -- ${Math.floor(players[i].PPG)}</li>`);
}

const paintings = [
  {name:'Mona lisa',width:200,height:200},
  {name:'The scream',width:400,height:600},
  {name:'The last supper',width:600,height:700}
]

let descrip = paintings.map(painting => {
  return `The ${painting.name} is ${painting.width} x ${painting.height}`
})

descrip.forEach(item => {
  console.log(item);
})


const cars = [
  {name:'Ford',price:200},
  {name:'Nissan',price:400},
  {name:'Nissan',price:600}
]

let expensiveBool = cars.some(car => {
  return car.price > 400;
});

console.log(expensiveBool);


let carDescr = cars.filter(car => {
  return car.price > 300;
});

console.log(carDescr);

const channel = [
  {name:'HBO',premium:true},
  {name:'LIFE',premium:false},
  {name:'Max',premium:true},
  {name:'Cooking channel',premium:false},
  {name:'WOBI',premium:false}
];

const user = {
  name:'Francis',
  premium:true,
  premiumChannels:function(){
      return channel.filter(channel => {
        return channel.premium && this.premium;
      });
      
  },
  channels:function(){
      // GET THE NON-PREMIUM CHANNELS
      return channel.filter(channel => {
        return !channel.premium;
      });
  }
}

console.log(user.premiumChannels())
// brings HBO and MAX
console.log(user.channels())
// brings LIFE, COOCKING CHANNEL AND WOBI



const prev = 200;
const curr = [
  {expense: "Guitar", amount: 200},
  {expense: "Piano", amount: 400},
  {expense: "Trombone", amount: 100}
]

// Reduce takes 2 arguments
// First argument is the variable that our return statement will be put into. The second arg is the iterator for our array. 
const results = curr.reduce((sum,expense) => {
  return sum + expense.amount;
},0); 

// The zero is the starting point for our first arg
// If it was 100, sum would start at 100
// On every iteration, the value of sum + expense.amount is being added to sum.

console.log(results);


// EXERCISE 1
const users = [
  {fname: "Zafir", lname: "Hasan", age: 21},
  {fname: "Razin", lname: "Ahmed", age: 21},
  {fname: "Norm", lname: "Green", age: 62}
];

const nameArray = users.reduce((nameArr, person) => {
  nameArr.push(`${person.fname} ${person.lname}`); 

  return nameArr; //need to return the arg for next iteration
},[]);

console.log(nameArray);


// EXERCISE 2
const trips = [
  {to: "Brazil", distance: 1000}, 
  {to: "China", distance: 2500},
  {to: "India", distance: 3000}
];

const totalMiles = trips.reduce((tmiles, dest) => {
  tmiles += dest.distance;
  return tmiles;
},0);

console.log(totalMiles);


// EXERCISE 3
const computers = [
  {type:'Laptop',price:124, os:'Windows'},
  {type:'Desk',price:124, os:'Mac'},
  {type:'Desk',price:124, os:'Windows'},
  {type:'Laptop',price:124, os:'Mac'},
  {type:'Laptop',price:124, os:'Windows'},
];

const os = computers.reduce((osObj, computer) => {
  if (osObj[computer.os] === undefined) {
    osObj[computer.os] = 0;
  }
  osObj[computer.os] += 1;
  
  return osObj;
},{});

console.log(os);
