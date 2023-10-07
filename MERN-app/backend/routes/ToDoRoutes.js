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

//These are all the middleware functions
const {JWTTest} = require('../middleware/Test')
const {checkLength} = require('../middleware/LengthTest')
const {parseJSON} = require('../middleware/ContentType')
const {checkEmail} = require('../middleware/EmailCheck')

//These are the endpoints
router.post('/createUserDoc', parseJSON, checkEmail, signUpUser)
router.post('/addToDo', parseJSON, JWTTest, checkLength,  addToDo)
router.delete('/deleteToDo',parseJSON, JWTTest, deleteToDo)
router.post('/logIn', parseJSON, checkEmail,  logInUser)
router.get(`/toDos/:email`, parseJSON, JWTTest,  getToDos)
router.put('/update',parseJSON, JWTTest, checkLength,  update)



module.exports = router




//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTU4MjY2ODl9.WhRC06XoD-sXk_xDTSzhLrxGOkeGsukUHMO5ba8FAmE