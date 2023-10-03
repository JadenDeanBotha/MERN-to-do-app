const express = require('express');

const router = express.Router()

const {
    signUpUser,
    addToDo,
    deleteToDo,
    logInUser,
    getToDos,
    update
} = require('../controllers/UserController')

const {JWTTest} = require('../middleware/Test')

const {checkLength} = require('../middleware/LengthTest')

const {parseJSON} = require('../middleware/ContentType')

const {checkEmail} = require('../middleware/EmailCheck')

//These are the endpoints

router.post('/createUserDoc', parseJSON, signUpUser)

router.post('/addToDo', JWTTest, checkLength, parseJSON, addToDo)

router.delete('/deleteToDo', JWTTest,parseJSON, deleteToDo)

router.post('/logIn', checkEmail, parseJSON, logInUser)

router.get(`/toDos/:email`, JWTTest, parseJSON, getToDos)

router.put('/update', JWTTest, checkLength, parseJSON, update)



module.exports = router




//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTU4MjY2ODl9.WhRC06XoD-sXk_xDTSzhLrxGOkeGsukUHMO5ba8FAmE