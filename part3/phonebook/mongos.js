const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>")
    process.exit(1)
}

const [pwd, name, number] = process.argv.slice(2)
const url = `mongodb+srv://softcat:${pwd}@cluster0.sp0qskb.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model("Person", personSchema)

if (typeof name === "undefined" || typeof number === "undefined"){
    console.log("Fetching phonebook")
    mongoose.connect(url).catch((err) => console.log(err))
    // Return saved phonebook
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach((person) => {
            console.log(person.name, person.number)
        })
        return mongoose.connection.close()
    })
}
else{
    // Add a person to phonebook
    mongoose.connect(url)
        .then((result) => {
            console.log("connect")
            const person = new Person( { name:name, number:number } )

            return person.save()
        })
        .then(() => {
            console.log("person saved!")
            return mongoose.connection.close()
        })
}