// Setup empty JS object to act as endpoint for all routes
let projectData = {
    theDate : null,
    temp : null,
    country: null,
    content : null
};

// Require Express to run server and routes
const express = require('express'); 
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3030;
const server = app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
});

//get data from projectData
app.get('/getWeather', (req,res)=>{
    res.send(projectData);
});
//post data to projectData
app.post('/postWeather',(req,res)=>{
    
    projectData.theDate= req.body.date,
    projectData.temp= req.body.temp,
    projectData.country= req.body.country,
    projectData.content= req.body.content
    res.send(projectData);
    
});

