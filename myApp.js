require('dotenv').config();

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema)

const createAndSavePerson = function(done) {
  const person = new Person({name: 'Joe', age: 21, favoriteFoods: ['pizza', 'burger']});
  person.save((err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, result) => {
    if(err) return console.log(err);
    done(null, result);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if(err) return console.log(err);
    done(null, result);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
 Person.find({favoriteFoods: foodToSearch })
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, res) {
    if(err) return console.log(err);
    done(null, res);
  });
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
