import React from 'react'
import Button from "react-bootstrap/Button";



import SignUp from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";

const Header = ({email, password, setEmail, setPassword, setLoggedIn, loggedIn, setToDoListItems}) => {

     //Logout function
    const logoutHandler=()=>{
        setLoggedIn(false);
        localStorage.clear()
        setToDoListItems([])
        console.log('you have been logged out ')
        }

        //This function renders the sign up and logout buttons
        //if a user is not logged in it will display the signup button
        //but if a user is logged in it will display the logout button
        const renderSignUp = () => {
            if(loggedIn === false){
                 return (
                    <SignUp 
                email={email} 
                password={password} 
                setEmail={setEmail}
                setPassword={setPassword}
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
            /> 
                )
                 
            } else {
                return <Button type="button" variant="danger" onClick={() => logoutHandler()}>Logout</Button>;
            }
        }

        //This function renders the login button
        //if a user is not logged in it will display the login button
        //but if a user is logged in it will not display anything
        const renderLogIn = () => {
            if(loggedIn === false){
                 return (
                    <LogInForm 
                email={email} 
                password={password} 
                setEmail={setEmail}
                setPassword={setPassword}
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
            />
                )
                 
            } else {
                return null
            }
        }
            
  return (
    <div>
        <header className="bg-white shadow">
            <h1>My To Do List</h1>
            {renderSignUp()}
            {renderLogIn()}
        </header>
    </div>
  )
}

export default Header