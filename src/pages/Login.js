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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              minLength="2"
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
