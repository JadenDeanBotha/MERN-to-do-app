import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import AddToDo from "./AddToDo";
import Edit from "./EditModal";

function HomePage({ toDoListItems, setToDoListItems, email, loggedIn }) {

    //This is a function that is going to delete the selected item from the specific users array
    const handleDelete = async(toDoItem) => {
      console.log(toDoListItems)

      const email = JSON.parse(localStorage.getItem('user'))
      const token = JSON.parse(localStorage.getItem('token'))
      console.log(email)
      console.log(token)
      console.log(toDoItem)

      
      await fetch("/api/deleteToDo", {
        method: 'DELETE',
        headers:{
          'Content-Type':"application/json",
          token: token
        },
        body: JSON.stringify({
          toDoItem: toDoItem,
          email: email
        })
      }).then((response) => response.json())
      .then((response) => {
        console.log("deleted")
        console.log(response[1].ToDo)
       setToDoListItems(response[1].ToDo)
      })
      
    }

  return (
    <>
    <div className="addButton">
    {loggedIn === true ? <AddToDo 
      setToDoListItems={setToDoListItems}
      email={email}
    />: <p>Please log in</p>}
    </div>
    
    <div className="displayItems">
      {//This maps through the toDoList so that they can be displayed once the user is logged in
      toDoListItems?.map((toDos) => (
        <Card className="text-center">
          <Card.Header>To Do Item</Card.Header>
          <Card.Body>
            <Card.Title>{toDos}</Card.Title>
            <Button variant="danger" id="deletebutton" onClick={() => handleDelete(toDos)}>Delete</Button>
            <Edit 
              toDos={toDos}
              email={email}
              setToDoListItems={setToDoListItems}
            />
            
          </Card.Body>
        </Card>
      ))
      }
    </div>
      
    </>
  );
}

export default HomePage;
