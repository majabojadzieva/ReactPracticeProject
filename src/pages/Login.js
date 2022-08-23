import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export const Login = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailWasTouched, setemailWasTouched] = useState(false);
  const [passWasTouched, setpassWasTouched] = useState(false);

  const passw =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*?]{6,}/g;

  const enteredEmailIsValid = email.trim() !== "" && email.includes("@");
  const enteredPassIsValid = password.match(passw);

  const emailIsInvalid = !enteredEmailIsValid && emailWasTouched;
  const passIsInvalid = !enteredPassIsValid && passWasTouched;

  const handleOnChangePass = (inputText) => {
    setPassword(inputText.target.value);
  };

  const handleOnChangeEmail = (inputText) => {
    setEmail(inputText.target.value);
  };

  const handleOnFocusPass = () => {
    setpassWasTouched(true);
  };
  const handleOnFocusEmail = () => {
    setemailWasTouched(true);
  };

  const handleOnBlurPass = () => {
    setpassWasTouched(false);
  };

  const handleOnBlurEmail = () => {
    setemailWasTouched(false);
  };

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPassIsValid) {
    formIsValid = true;
  }

  const validationMessagePass = (
    <Form.Text style={{ color: "red" }}>
      Password must contain at least 6 characters, one number, one uppercase
      letter and one special character.
    </Form.Text>
  );

  const validationMessageEmail = (
    <Form.Text style={{ color: "red" }}>
      Email must contain "@" character.
    </Form.Text>
  );

  return (
    <>
      <h1 className="m-5">Log in</h1>
      <div
        className="border border-secondary mx-auto p-3"
        style={{ width: "40%" }}
      >
        <Form onSubmit={props.login}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleOnChangeEmail}
              onFocus={handleOnFocusEmail}
              onBlur={handleOnBlurEmail}
            />
            {emailIsInvalid && validationMessageEmail}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleOnChangePass}
              onFocus={handleOnFocusPass}
              onBlur={handleOnBlurPass}
              value={password}
            />
            {passIsInvalid && validationMessagePass}
          </Form.Group>

          <Button variant="dark" type="submit" disabled={!formIsValid}>
            Log in
          </Button>
        </Form>
      </div>
    </>
  );
};
