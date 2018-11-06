import mongoose from 'mongoose';

mongoose.Promise = global.Promise

let MONGO_URL
const MONGO_LOCAL_URL = 'mongodb://localhost:27017/avocado'

mongoose.connect(MONGO_LOCAL_URL, { useNewUrlParser: true }) // local mongo url
MONGO_URL = MONGO_LOCAL_URL

const db = mongoose.connection

db.on('error', err => {
  console.log(`There was an error connecting to the database: ${err}`)
})
db.once('open', () => {
  console.log(
    `You have successfully connected to your mongo database: ${MONGO_URL}`
  )
})

export default db;
