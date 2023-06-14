import functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import express from 'express';
import 'dotenv/config'
import signup from "./auth/signup.js";
import login from "./auth/login.js";
import fetch from "./fetch/fetch.js";
import update from './preferences/updateHW.js';
import updatePref from './preferences/updatePref.js';
import workout from "./model_api/workout/workout.js";
import foodrec from './model_api/food_recommender/foodrec.js';
// Initialize express
const app = express()
const port = 3000

// Initialize firebase-admin
initializeApp();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Nothing to see here');
})

app.post('/signup', async (req, res) => {
  const r = await signup(req)
  res.status(r[0]).send(r[1]);
})

app.post('/login', async (req, res) => {
  const r = await login(req)
  res.status(r[0]).send(r[1]);
})

app.get('/fetch', async (req, res) => {
  const r = await fetch(req)
  res.status(r[0]).send(r[1]);
})

app.post('/update', async (req, res) => {
  const r = await update(req)
  res.status(r[0]).send(r[1]);
})

app.post('/update-pref', async (req, res) => {
  const r = await updatePref(req)
  res.status(r[0]).send(r[1]);
})

app.get('/workout', async (req, res) => {
  const r = await workout(req)
  res.status(r[0]).send(r[1]);
})

app.get('/food-recommender', async (req, res) => {
  const r = await foodrec(req)
  res.status(r[0]).send(r[1]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


export const fitnessed = functions.https.onRequest(app);
export const staging = functions.https.onRequest(app);
