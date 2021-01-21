const express = require('express')
const router = express.Router()
const db = require('../models')

// GET route to the auth signup page
router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

router.post('/signup', (req, res) => {
    //find or create a new user
    db.user.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
    .then(([user, wasCreated]) => {
        if (wasCreated){
            res.send(`Created a new user profile for ${user.email}`)
        } else {
            res.send('A user for this email address already exists')
        }
    })
})

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

router.post('/login', (req, res) => {
    db.user.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    .then(foundUser => {
        if(foundUser){
            res.send(`${foundUser.name} has logged in!`)
        } else {
            res.send('gtfo')
        }
    })
    .catch(error => {
        console.log(error)
        res.send('There was an error logging in. Check the console?')
    })
})

router.get('/logout', (req, res) => {
    res.send('log out mf\'er')
})

module.exports = router