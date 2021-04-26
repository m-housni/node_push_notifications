
/*
Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js
*/
const express = require("express");

/*
Web push requires that push messages triggered from a backend be done via the Web Push Protocol and if you want to send data with your push message, you must also encrypt that data according to the Message Encryption for Web Push spec.
*/
const webpush = require("web-push");

/* 
Node.js body parsing middleware.
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
*/
const bodyParser = require("body-parser");

/*
The Path module provides a way of working with directories and file paths
*/
const path = require("path");

// Creates an Express application. The express() function is a top-level function exported by the express module.
const app = express();

// Set static directory toserve images, CSS files, and JavaScript files named: client
app.use(express.static(path.join(__dirname, "client")));

// 
app.use(bodyParser.json());

// generate keys by typing 
// ./node_modules/.bin/web-push generate-vapid-keys
// in the terminal
const publicVapidKey ="BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";


// set Vapi details
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
