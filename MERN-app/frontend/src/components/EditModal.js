import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Edit({ toDos, email, setToDoListItems }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newValue, setNewValue] = useState("");
  const [oldValue] = useState(toDos);

  //This is the function which deals with the editing of a to do
  const handleEdit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));
    const email = JSON.parse(localStorage.getItem("user"));

    console.log(newValue);

    //The try catch communnicates with the server
    //Uses a PUT method to edit the values and not create now values but rather edit existing ones
    try {
      await fetch(`/api/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          toDoItem: newValue,
          oldValue: oldValue,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setToDoListItems(response[1].ToDo);
        });
    } catch (error) {
      console.log([error, ""]);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
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
                defaultValue={oldValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>

          <button
            form="Add"
            onClick={(e) => {
              handleEdit(e);
            }}
          >
            update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
