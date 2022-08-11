import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

function AddNewUser(props) {
  const nameRef = useRef();
  const history = useHistory();

  function newUserHandler(e) {
    e.preventDefault();
    const newUserData = {
      name: nameRef.current.value,
    };
    async function addUser() {
      await fetch("https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users/", {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: { "Content-Type": "application/json" },
      });
    }
    addUser();
    nameRef.current.value = "";
    alert("User added");
    history.replace("/users-list");
  }

  return (
    <>
      <h1 className="m-5">Add new user</h1>
      <div
        className="border border-secondary mx-auto p-3"
        style={{ width: "40%" }}
      >
        <Form onSubmit={newUserHandler}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>User name:</Form.Label>
            <Form.Control type="text" ref={nameRef} />
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
