require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let kaka = new Person({
    name: "Karimah Azzuhdu",
    age: 26,
    favoriteFoods: ["Ayam Krispi", "Ice Cream", "Coffee"]
  })
  kaka.save((err, data) => {
    if (err){ return console.error(err)};
    done(null, data);
  });
};

let arrayOfPeople = [
  {name: "Ruhama Amira", age: 12, favoriteFoods: ["Matcha Latte"]},
  {name: "Rahmat Galang", age: 15, favoriteFoods: ["Mie Goreng"]},
  {name: "Imam Idris", age: 16, favoriteFoods: ["Ayam Geprek", "Ayam Krispi"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err){ return console.error(err)};
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data)=>{
    if (err){ return console.error(err)};
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err){ return console.error(err)};
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err){ return console.error(err)};
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if (err){ return console.error(err)};
    data.favoriteFoods.push(foodToAdd);
    data.save((err, updatedData) => {
      if (err){ return console.error(err)};
      done(null, updatedData);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, personData)=>{
    if (err){ return console.error(err)};
    done(null, personData);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err){ return console.error(err)};
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, data)=>{
    if (err){ return console.error(err)};
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, data)=>{
    if (err){ return console.error(err)};
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
