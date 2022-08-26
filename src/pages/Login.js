import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export const Login = (props) => {
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
              required
              minLength="2"
              onChange={props.enteredData}
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
              onChange={props.enteredData}
              name="password"
            />
          </Form.Group>
          {props.alert.email && (
            <Alert variant="danger">
              The email you've entered is incorrect.
            </Alert>
          )}
          {props.alert.password && (
            <Alert variant="danger">
              The password you've entered is incorrect.
            </Alert>
          )}
          {props.alert.email === false && props.alert.password === false && (
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
