const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const { response, request } = require("express");
const stripe = require("stripe")(
  "testkey"
);

//To Set up an API - We need following things - (App config, Middlewares,API routes,Listen command)

//1. App config
const app = express();

//2. Middlewares -
//cors is like security, to proceed with security,
app.use(
  cors({
    origin: true,
  })
);
//Send data and parse it in json format
app.use(express.json());

//3. API routes
app.get("/", (request, response) => response.status(200).send("HELLO WORLD."));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment request received for the amount - ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // In subunits of the currency
    currency: "inr",
  });
  //status = 201 means all ok and the processing of the request has created something,
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Example API route
// app.get("/mugdhali", (request, response) =>
//   response.status(200).send("Hey there Mugdhali...")
// );

//4. Listen command - This is our API with secure (https)cloud functions.
exports.api = functions.https.onRequest(app);

//Example Endpoint - http://localhost:5001/project1-a-179c1/us-central1/api
