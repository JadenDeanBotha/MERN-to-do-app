const express = require('express')
const app = express();
require('dotenv').config()

//This will be to be able to use the routes
const ToDoRoutes = require('./routes/ToDoRoutes')

//This is so that we are able to communicate with the database
const mongoose = require('mongoose')

//This is the body parser middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//routes
app.use("/api", ToDoRoutes)


//This connects the app to the Database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`App is connected to db and listening on port ${process.env.PORT}`)
    })
})


