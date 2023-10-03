import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddToDo({setToDoListItems}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [toDo, setToDo] = useState('')

  //This is the function which handles the add functionality
  const handleAddToDo = async (e) => {

    e.preventDefault()

    const email = JSON.parse(localStorage.getItem("user"))
    const token = JSON.parse(localStorage.getItem("token"))

    try{
      await fetch(`/api/addToDo`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        token: token,

        },
        body: JSON.stringify({
            toDoItem: toDo,
            email: email
        })
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        setToDo('')
        setToDoListItems(response[1].ToDo)
        setShow(false)
    })
    }catch(error){
      console.log('Error:', error)}
    }
    
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id="Add">
            <div className="mb-3">
              <label>To Do:</label>
              <input
                type="text"
                defaultValue={toDo}
                onChange={(e) => setToDo(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>

          <button form="Add" onClick={(e) => handleAddToDo(e)}>
            Add
          </button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddToDo;
