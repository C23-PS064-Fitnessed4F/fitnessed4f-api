import functions from 'firebase-functions';
import express from 'express';
import signup from "./auth/signup.js";
import login from "./auth/login.js";
const app = express()
const port = 3000

app.use(express.json())

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

export const fitnessed = functions.https.onRequest(app);
