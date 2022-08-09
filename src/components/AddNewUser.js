import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddNewUser(props) {
  return (
    <>
      <h1 className="m-5">Add new user</h1>
      <div
        className="border border-secondary mx-auto p-3"
        style={{ width: "40%" }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>First name:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Last name:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddNewUser;
