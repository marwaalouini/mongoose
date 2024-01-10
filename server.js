require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const person = require("./models/person")

const app = express()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server is running on port:", PORT))

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


    async function createPerson(){
        const newPerson = new person ({
            name : 'mahdi',
            email:'mahdi@gmail.com',
            age :28,
            favoriteFoods:['couscous','hamburger']
        })
        const result =await newPerson.save();
        console.log(result);
    }
    createPerson();
    

    //createmanyPeople 


    const arrayOfPeople = [
        { name: 'Joel', email: 'joel@example.com', age: 30, favoriteFoods: ['Pizza', 'Burger'] },
        { name: 'Jamila', email: 'jamila@example.com', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
        { name: 'Amir', email: 'Amir@example.com', age: 22, favoriteFoods: ['spaghetti', 'salad'] },
    ];
    
    const createPeople = async (arrayOfPeople) => {
        try {
            const createdPeople = await person.create(arrayOfPeople);
            console.log("result :", createdPeople);
        } catch (err) {
            console.error(err);
        }
    };
    
    createPeople(arrayOfPeople);

    //searchNameof person
    const searchName = async (name) => {
        try {
            const people = await person.find({ name: name });
            console.log(`People with name '${name}':`, people);
        } catch (err) {
            console.error(err);
        }
    };
    searchName('Jamila');

    
    searchOne => food


    const findOnePerson = async (favoriteFoods) => {
        try {
            const personFound = await person.find({ favoriteFoods: { $in: [favoriteFoods] } });
            console.log(`People love to eat '${favoriteFoods}':`, personFound);
        } catch (err) {
            console.error(err);
        }
    };
    findOnePerson('sushi'); 


     Search Your Database By _id

    
        const findPerson = async (_id) => {
            try {
                const personFound = await person.findById(_id);
                console.log(`Person with id '${_id}':`, personFound);
            } catch (err) {
                console.error(err);
            }
        };
        
        findPerson('_id'); 
        


//updatefoods
        const updateFoods = async (_id) =>{
            try{
                const  personfind = await person.findById(_id); 
                personfind.favoriteFoods.push('sushi');
                const updatePerson = await personfind.save();
                console.log(' food updated suucefully:', updatePerson);
            }catch (err){
                console.error(err);
            }
        }
        updateFoods('659be585878943334a61457b');
        

const updateAge = async(name)=>{
try{
    const personUp= await person.findOneAndUpdate({name:name},{$set:{age:20}}, {new:true});
    console.log('new age is',personUp);
}
catch (err){
    console.error(err);
}

 }
updateAge("Jamila");


//deleteOne
const deletePerson = async (_id) =>{
    try{
        const personDl= await person.findByIdAndDelete(_id)
        console.log('this person has been deleted ',personDl);
    }
    catch (err){
        console.error(err);
    }
}
deletePerson('659be59bff39b47dc081f06e')


//delete Mary

const deleteMary = async (name)=>{
    try{ 
        const deleteMr= await person.deleteMany({name})
        console.log('delete Mary',deleteMr);
    }
    catch (err){
        console.error(err);
    }
}
deleteMary("mary")



//querychain

const querych= ()=>{
    person.find({favoriteFoods:"burittos"})
    .sort({name:1})
    .limit(2)
    .select('-age')
    .exec()
    .then(() => {
        console.log('querychain completed')
    })
  .catch((err)=>{
    console.log(err)
  })
}
querych()