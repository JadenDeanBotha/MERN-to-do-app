import React from "react";
import Button from "react-bootstrap/Button";
import SignUp from "../components/SignUpForm";
import LogInForm from "../components/LogInForm";

const Header = ({
  email,
  password,
  setEmail,
  setPassword,
  setLoggedIn,
  loggedIn,
  setToDoListItems,
}) => {
  //Logout function
  const logoutHandler = () => {
    setLoggedIn(false);
    localStorage.clear();
    setToDoListItems([]);
    console.log("you have been logged out ");
  };

  return (
    <div>
      <header className="bg-white shadow">
        <h1>My To Do List</h1>

        {loggedIn === true ? (
          <Button
            type="button"
            variant="danger"
            onClick={() => logoutHandler()}
          >
            Logout
          </Button>
        ) : (
          <SignUp
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
          />
        )}
        {loggedIn === true ? (
          <p>hello</p>
        ) : (
          <LogInForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
          />
        )}
      </header>
    </div>
  );
};

export default Header;
