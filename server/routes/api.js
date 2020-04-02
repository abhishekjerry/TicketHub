// import express and router

const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://userabhishek:userpassword@cluster0-wi3a0.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connectd to Mongodb')
    }
})
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthoriswd request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === null) {
        return res.status(401).send('unauthoriswd request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('unauthoriswd request')
    }
    req.userId = payload.subject
    next()
}
router.get('/', (req, res) => {
    res.send('From API Route')
})
router.post('/register', (req, res) => {
    // extract user data from req obj
    let userData = req.body
    // convert into model for mongoos
    let user = new User(userData)
    // save user in DB
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser.id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })


})

// extracting userData
router.post('/login', (req, res) => {
    let userData = req.body
    // database with email id:
    // chk user exhist with email id:
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else
                // verify pwd
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    // return userDetails
                    let payload = { subject: user.id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })

                }

        }

    })
})
router.get('/events', (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "2",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "3",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "4",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "5",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "6",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        }

    ]
    res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "id": "1",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "2",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "3",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "4",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "5",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        },
        {
            "id": "6",
            "name": "Abhishek",
            "description": "Engineer",
            "date": "2020-04-01T18:25:43.511z"
        }

    ]
    res.json(events)
})

module.exports = router;


