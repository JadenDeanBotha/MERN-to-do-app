const jwt = require('jsonwebtoken')

const userSchema = require("../models/UserModel")

//This is the function in the backend that links up to the sign up endpoint which creates a new user document
const signUpUser = async (req,res) => {

    try{
        let payload = {
            username : req.body.email,
        }
    
        let jwtToken = jwt.sign(
            JSON.stringify(payload),
            "SecretKey",
            { algorithm: "HS256" }
        )
    
    
        const user = await userSchema.create({
            email: req.body.email,
            password: req.body.password,
            ToDo: []
        });
    
        res.status(200).json({ message: 'Login Successful', user: user, token: jwtToken });
        console.log(user)
    }catch(error){
        res.send([error, ""])
    }
    
}

//This is the function which will log in a user
const logInUser = async (req,res) => {
    
        try {
            const user = await userSchema.findOne({ email: req.body.email });
        
            if (!user) {
              return res.status(400).json({ message: 'User does not exist' });
            }
        
            if (req.body.password != user.password) {
              return res.status(400).json({ message: 'Invalid password' });
            }

            let payload = {
                email : req.body.email,
                password: req.body.password
            }

            let token = jwt.sign(
                JSON.stringify(payload),
                "SecretKey",
                { algorithm: "HS256" }
            )
        
            res.status(200).json({ message: 'Login Successful', user: user, token: token });
         } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server error' });
         }
    }

//GET user toDos
const getToDos = async (req,res) => {

    const {email} = req.params

    const toDos = await userSchema.find({email: email})

    res.json(toDos[0].ToDo)
    
}

//Add a toDo
const addToDo = async (req, res) => {
    //destructuring the object
    const {toDoItem, email} = req.body
    

    console.log(email)
    console.log(toDoItem)

    try{

        const toDo = await userSchema.findOneAndUpdate({email: email}, 
        { $addToSet: //specifically adds to an array
            { ToDo: req.body.toDoItem } 
        }, {
            //without this, if you add something to the list, it wont change immediatly without a refresh
            new:true
        })
        //create if statement to check if the user document was found or not
        console.log(toDo)
        res.json(["", toDo])
    }catch(error){
        res.json([error, ""])
    }
}

//Update
const update = async (req, res) => {
    //destructuring the object
    const {toDoItem, email, oldValue} = req.body

    //console.log(email)
    //console.log(toDoItem)
    try{
        const toDo = await userSchema.findOneAndUpdate(
            //{ _id: 4, "grades.grade": 85 },
           // { $set: { "grades.$.std" : 6 } }
           {email: email, 
            "ToDo": oldValue
            },
            {
                $set: {
                    "ToDo.$": toDoItem
                }
            },
            {
                new:true
            }
         )
         console.log(oldValue, toDoItem)
         res.json(["", toDo])
    }catch(error){
        res.json([error, ""])
        console.log(oldValue, toDoItem)
    }

    
}

//Delete a toDo
const deleteToDo = async (req, res) => {
    const { toDoItem, email } = req.body


    console.log(toDoItem)
   
    try{
        const toDo = await userSchema.findOneAndUpdate({email: email}, 
            { $pull: 
                { ToDo: req.body.toDoItem } 
            }, {
                //without this, if you add something to the list, it wont change immediatly without a refresh
                new:true
            }
            )
            console.log(toDo)
            res.status(200).json(["", toDo])
    }catch(error){
        res.send([error, ''])
    }
    
}

module.exports = {signUpUser, addToDo, deleteToDo, logInUser, getToDos, update}