const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.faeh0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());
const port = 5000

app.get('/', (req, res) =>{
  res.send('it is working')
})

const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true  });
client.connect(err => {
  const worksCollection = client.db("volunteerNetworkWeb").collection("works");
  

  app.post('/addWork', (req, res) =>{
      const works = req.body;
    //   console.log(works)
      worksCollection .insertMany(works)
      .then(result => {
          console.log(result.insertedCount);
          res.send(result.insertedCount)
      })
  })

  app.get('/works', (req, res) => {
      worksCollection.find({})
      .toArray( (err, documents) => {
          res.send(documents);
      })
  })
  const volunteerCollection = client.db("volunteerNetworkWeb").collection("enrolled");
  app.post('/addRegistration', (req, res) => {
    const newRegistration = req.body;
    volunteerCollection.insertOne(newRegistration)
    .then(result => {
      console.log(result)
    })
    console.log(newRegistration)
  })

  app.get('/enrolledEvents', (req, res)=> {
    console.log(req.query.email);
    volunteerCollection.find({email: req.query.email})
    .toArray( (err, documents) => {
      res.send(documents)
    }) 
  })

 
});


app.get('/', (req, res) => {
  res.send('Hello World! server is functioning')
})

app.listen(process.env.PORT || port)