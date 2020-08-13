const express = require('express')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcryptjs')

const signIn = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'erwinwijaya',
      password : '',
      database : 'smartbrain'
    }
  });

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, resp) => {resp.send("It is working")})
app.post('/signin', signIn.handleSignIn(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, resp) => {image.handleImageUrl(req, resp)})


app.listen(3000, () => {
    console.log("app is running on port 3000")
})

/*

/
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/