
const express = require('express');
const helper = require('./server/helper')
const twitterApi = require('./server/user')
const cors = require('cors')
const mongoose = require('mongoose');
const TwitterModel = require('./server/db/twitter.model');


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/twitter', twitterApi);

// app.get('/', function(request, response) {
//     response.send(helper.returnWords())
// })



const MONGO_CONNECTION_STRING ='mongodb+srv://niketha:greenlake123@cluster0.pl3p5c4.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
app.get('/api/getData', async (req, res) => {
    try {
      const data = await TwitterModel.getAllTwitterUsers();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/', function(request, response) {
    response.send("This is the second app GET request");
})


app.post('/', function(requst, response) {
    response.json({ message: "Successfully created user" });

    response.send("This is a POST request")
})
 
app.get('/api/twitter/:username', async (req, res) => {
  try {
    const username = req.params.username;
    console.log('Received request for username:', username);
    // Find the user by username in the database
    const user = await TwitterModel.findpasswordByUsername(username);


    if (user) {
      // If user is found, send the password
      res.json({ password: user.password });
    } else {
      // If user is not found, return an error
      res.status(404).json({ error: 'User not found' });
      return;
     }
  } catch (error) {
    console.error('Error retrieving password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.get('/api/twitter/:username', async (req, res) => {
//   try {
    
//       const username = req.params.username;
//       console.log('Received request for username:', username);
//       // Find the user by username in the database
//       const user = await TwitterModel.findpasswordByUsername(username);
  
  
//       if (user) {
//         // If user is found, send the password
//         res.json({ password: user.password });
//       } else {
//         // If user is not found, return an error
//         res.status(404).json({ error: 'User not found' });
//         return;
//   } 
// }
//   catch (error) {
//     console.error('Error in /api/twitter/:username:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



app.listen(process.env.PORT || 3500, function() {
    console.log("Starting server now...")
})

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });
  
  app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });