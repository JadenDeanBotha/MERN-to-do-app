import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';

function LogInForm({email, password, setEmail, setPassword, setLoggedIn, loggedIn}) {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Function to handle the login
  const handleLogIn = async (e) => {
    e.preventDefault();

    console.log(email)

    
    try{
      await fetch('/api/logIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.token))
        localStorage.setItem('user', JSON.stringify(response.user.email))
        setLoggedIn(true) 
        setEmail('')
        setPassword('')     
        console.log(response)  
        console.log(loggedIn)
      })
    }catch(error){
      console.log([error, ''])
    }
    
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Log In
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

        <Form id="logIn">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>

          <button form="logIn" onClick={(e) => handleLogIn(e)}>
            Log In
          </button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogInForm;
