const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('error: missing password argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@nkcluster.lbnck08.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=NkCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const [name, number] = process.argv.slice(3)

  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log('Person added to phonebook.')
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((persons) => {
    persons.forEach((person) => console.log(person.name, person.number))
    mongoose.connection.close()
  })
} else {
  console.log('error: incorrect usage')
  process.exit(1)
}
