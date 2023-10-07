import "./App.css";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";

function App() {
  //These are the state variables for my signup form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //This is the state value for being logged in or not
  const [loggedIn, setLoggedIn] = useState("");

  //This is the state variable for the to do list items
  const [toDoListItems, setToDoListItems] = useState([]);

  function setState(state) {
    setToDoListItems(state);
  }

  useEffect(() => {
    const fetchToDos = async () => {
      if (loggedIn === true) {
        try {
          let email = JSON.parse(localStorage.getItem("user"));
          let token = JSON.parse(localStorage.getItem("token"));
          console.log(email);
          await fetch(`/api/toDos/${email}`, {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              setToDoListItems(response);
            });
        } catch (error) {
          console.log("oops");
        }
      } else {
        console.log("nothing to display");
      }
    };
    fetchToDos();
  }, [loggedIn]);

  return (
    <div className="App">
      <Header
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setToDoListItems={setToDoListItems}
      />
      <HomePage
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        toDoListItems={toDoListItems}
        setToDoListItems={setState}
        email={email}
      />
    </div>
  );
}

export default App;
