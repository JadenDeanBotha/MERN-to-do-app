const jwt = require("jsonwebtoken");

const userSchema = require("../models/UserModel");

//This is the function in the backend that links up to the sign up endpoint which creates a new user document
const signUpUser = async (req, res) => {
  try {
    let payload = {
      username: req.body.email,
    };
    //This creates the jwt token
    let jwtToken = jwt.sign(JSON.stringify(payload), "SecretKey", {
      algorithm: "HS256",
    });
    //This uses the format of the userSchema to create a new user
    const user = await userSchema.create({
      email: req.body.email,
      password: req.body.password,
      ToDo: [],
    });

    res
      .status(200)
      .json({ message: "Login Successful", user: user, token: jwtToken });
    console.log(user);
  } catch (error) {
    res.send([error, ""]);
  }
};

//This is the function which will log in a user
const logInUser = async (req, res) => {
  try {
    //The findOne function finds a user in the DB with that specific email
    const user = await userSchema.findOne({ email: req.body.email });

    if (!user) {
        //If the user is not found this is the reponse
      return res.status(400).json({ message: "User does not exist" });
    }

    if (req.body.password != user.password) {
        //If the password associated with the email is not the same, this is the response
      return res.status(400).json({ message: "Invalid password" });
    }

    let payload = {
      email: req.body.email,
      password: req.body.password,
    };

    //This creates the token
    let token = jwt.sign(JSON.stringify(payload), "SecretKey", {
      algorithm: "HS256",
    });

    res
      .status(200)
      .json({ message: "Login Successful", user: user, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

//GET user toDos
const getToDos = async (req, res) => {
  const { email } = req.params;

  //This finds the logged in users email
  const toDos = await userSchema.find({ email: email });
  //This displays the found users To Do list
  res.json(toDos[0].ToDo);
};

//Add a toDo
const addToDo = async (req, res) => {
  //destructuring the object
  const { toDoItem, email } = req.body;

  console.log(email);
  console.log(toDoItem);

  try {
    const toDo = await userSchema.findOneAndUpdate(
      { email: email },
      {
        //specifically adds to an array
        $addToSet: { ToDo: req.body.toDoItem },
      },
      {
        //without this, if you add something to the list, it wont change immediatly without a refresh
        new: true,
      }
    );
    //create if statement to check if the user document was found or not
    console.log(toDo);
    res.json(["", toDo]);
  } catch (error) {
    res.json([error, ""]);
  }
};

//Update
const update = async (req, res) => {
  //destructuring the object
  const { toDoItem, email, oldValue } = req.body;

  
  try {
    //This finds the user, finds which value needs to be replaced and then replaces it with the
    //new value
    const toDo = await userSchema.findOneAndUpdate(
      { email: email, ToDo: oldValue },
      {
        $set: {
          "ToDo.$": toDoItem,
        },
      },
      {
        new: true,
      }
    );
    console.log(oldValue, toDoItem);
    console.log(toDo);
    res.json(["", toDo]);
  } catch (error) {
    res.json([error, ""]);
    console.log(oldValue, toDoItem);
  }
};

//Delete a toDo
const deleteToDo = async (req, res) => {
  const { toDoItem, email } = req.body;

  console.log(toDoItem);

  try {
    //This finds the user where the ToDo needs to be deleted from and then
    //finds the todo and removes it from the users ToDo listSS
    const toDo = await userSchema.findOneAndUpdate(
      { email: email },
      { $pull: { ToDo: req.body.toDoItem } },
      {
        //without this, if you add something to the list, it wont change immediatly without a refresh
        new: true,
      }
    );
    console.log(toDo);
    res.status(200).json(["", toDo]);
  } catch (error) {
    res.send([error, ""]);
  }
};

module.exports = {
  signUpUser,
  addToDo,
  deleteToDo,
  logInUser,
  getToDos,
  update,
};
