// Setup empty JS object to act as endpoint for all routes
/* moved to be in a seperated file "./services/projectData.service.js" */

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Require ProjectData Service
const getProjectData = require("./services/projectData.service").getProjectData;
const postProjectData =
  require("./services/projectData.service").postProjectData;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}

// Routes
app.get("/projectData", getProjectData);
app.post("/projectData", postProjectData);
