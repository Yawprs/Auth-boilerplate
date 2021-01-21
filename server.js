
require('dotenv').config() //configure environment variables
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')

//set view engine to ejs
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//bodyparser middleware allows us to receive form data in req.body
app.use(express.urlencoded({extended: false}))

//controller middleware (auth controller)
app.use('/auth', require('./controllers/auth.js'))

//render home page
app.get('/', (req, res) => {
    res.render('home.ejs')
})

//render profile page
app.get('/profile', (req, res) => {
    res.render('profile.ejs')
})



app.listen(process.env.PORT, () => {
    console.log(`We\'re fired up, baby! Listening on post ${process.env.PORT}`)
})