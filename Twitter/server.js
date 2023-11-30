
const express = require('express');
const helper = require('./server/helper')
const twitterApi = require('./server/user')
const cors = require('cors')
const mongoose = require('mongoose');


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/twitter', twitterApi);

app.get('/', function(request, response) {
    response.send(helper.returnWords())
})

// app.get('/', function(request, response) {
//     response.send("This is the second app GET request");
// })

app.post('/', function(requst, response) {
    response.json({ message: "Successfully created user", user: createdUser });

    response.send("This is a POST request")
})

const MONGO_CONNECTION_STRING ='mongodb+srv://niketha:greenlake123@cluster0.pl3p5c4.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


// app.listen(3500, function() {
//     console.log("Starting server :)")
// })

app.listen(process.env.PORT || 3500, function() {
    console.log("Starting server now...")
})