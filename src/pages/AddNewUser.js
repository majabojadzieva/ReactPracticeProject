import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { fetchPostRes } from "../services/services";

function AddNewUser(props) {
  const nameRef = useRef();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function newUserHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    const newUserData = {
      name: nameRef.current.value,
    };
    async function addUser() {
      const response = await fetchPostRes("users", newUserData);

      if (!response.ok) {
        setError(true);
        setIsLoading(false);
      }

      if (response.ok) {
        nameRef.current.value = "";
        history.replace("/");
        setIsLoading(false);
      }
    }
    addUser();
  }

  let buttonContent = (
    <Button variant="primary" type="submit">
      Submit
    </Button>
  );

  if (isLoading) {
    buttonContent = (
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    );
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
            <Form.Control
              type="text"
              ref={nameRef}
              required
              minLength="2"
              maxLength="25"
            />
          </Form.Group>
          {error && (
            <Alert className="p-1" variant="danger">
              Something went wrong!
            </Alert>
          )}

          {buttonContent}
        </Form>
      </div>
    </>
  );
}

export default AddNewUser;
