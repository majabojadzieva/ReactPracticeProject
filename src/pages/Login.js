import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              pattern={
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
              }
              title="Password must contain at least 8 characters, one number, one uppercase
             letter and one special character."
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </>
  );
};
