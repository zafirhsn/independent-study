
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
