import functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import express from 'express';
import 'dotenv/config'
import signup from "./auth/signup.js";
import login from "./auth/login.js";
import fetch from "./fetch/fetch.js";

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

app.post('/fetch', async (req, res) => {
  const r = await fetch(req)
  res.status(r[0]).send(r[1]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

export const fitnessed = functions.https.onRequest(app);
export const staging = functions.https.onRequest(app);