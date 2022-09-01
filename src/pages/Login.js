import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export const Login = (props) => {
  const history = useHistory();

  // Login state

  const [enteredLoginData, setEnteredLoginData] = useState({
    email: "",
    password: "",
  });

  const [wrongDataMessage, setWrongDataMessage] = useState({
    email: null,
    password: null,
  });

  // OnChange Handlers

  const enteredDataHandler = (e) => {
    setEnteredLoginData({
      ...enteredLoginData,
      [e.target.name]: e.target.value,
    });
  };

  //Login Handler

  const loginHandler = (e) => {
    e.preventDefault();

    if (
      enteredLoginData.email !== "test@test.com" &&
      enteredLoginData.password === "Test1234!"
    ) {
      setWrongDataMessage({ email: true, password: false });
    }

    if (
      enteredLoginData.email === "test@test.com" &&
      enteredLoginData.password !== "Test1234!"
    ) {
      setWrongDataMessage({ email: false, password: true });
    }

    if (
      enteredLoginData.email !== "test@test.com" &&
      enteredLoginData.password !== "Test1234!"
    ) {
      setWrongDataMessage({ email: false, password: false });
    }

    if (
      enteredLoginData.email === "test@test.com" &&
      enteredLoginData.password === "Test1234!"
    ) {
      localStorage.setItem("user", "isLogged");

      const setAuth = () => {
        props.setIsAuth(true);
      };
      setAuth();

      history.replace("/");
      setWrongDataMessage({
        email: null,
        password: null,
      });
    }
  };

  // Return code

  return (
    <>
      <h1 className="m-5">Log in</h1>
      <div
        className="border border-secondary mx-auto p-3"
        style={{ width: "40%" }}
      >
        <Form onSubmit={loginHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              minLength="2"
              onChange={enteredDataHandler}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              pattern={
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
              }
              title="Password must contain at least 8 characters, one number, one uppercase
             letter and one special character."
              onChange={enteredDataHandler}
              name="password"
            />
          </Form.Group>
          {wrongDataMessage.email && (
            <Alert variant="danger">
              The email you've entered is incorrect.
            </Alert>
          )}
          {wrongDataMessage.password && (
            <Alert variant="danger">
              The password you've entered is incorrect.
            </Alert>
          )}
          {wrongDataMessage.email === false &&
            wrongDataMessage.password === false && (
              <Alert variant="danger">
                The email and password you've entered are incorrect.
              </Alert>
            )}
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </>
  );
};
