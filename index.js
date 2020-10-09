const express = require('express')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.faeh0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("volunteerNetworkWeb").collection("works");
  console.log('Database Connected')
});


app.get('/', (req, res) => {
  res.send('Hello World! server is functioning')
})

app.listen(port)