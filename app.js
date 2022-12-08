const express = require('express')
const app = express()
const session = require('express-session')
const store = new session.MemoryStore()
const port = 3000
const Controller = require('./controllers')
const { middleware } = require('./middlewares/middleware')


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  },
  store
}))
app.use(require('./routes'))

app.listen(port, () => {
  console.log(`meentor.io listening on port ${port}`)
})