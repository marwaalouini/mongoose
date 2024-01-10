const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
