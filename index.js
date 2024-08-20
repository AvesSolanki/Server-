const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const port = 3000;

// Add middlewares in this order
app.use(cookieParser()); // Cookie parser should be before other middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Update this to your client’s origin
  credentials: true // Ensures cookies are sent with requests
}));
app.use(express.json()); // JSON body parser
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded body parser

// connect to DB 
const connectToDB = require("./config/mongoDB");
connectToDB(); 

// Mounting  
const dronedataRoutes = require("./Routes/dronedataRoute");
app.use("/api/v1/droneData",dronedataRoutes);

app.post('/data', (req, res) => {
  const data = req.body;

  // Log the received data
  console.log('Received data:', data);

  // Send a response back to the ESP32
  res.send({ status: 'success', message: 'Data received successfully in new server' });
});

// default route
app.get("/", async(req, res) => {
  res.send(`<h1> This is the server code </h1>`);
});


// server listing
app.listen(port, () => {
  console.log(`our server is running on port ${port}`);
});
