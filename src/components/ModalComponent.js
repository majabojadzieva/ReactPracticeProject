import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent(props) {
  const [show, setShow] = useState(false);

  const inputRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitHandler = () => {
    async function editUser() {
      const response = await fetch(
        "https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users/" +
          props.userId,
        {
          method: "PUT",
          body: JSON.stringify({
            name: inputRef.current.value,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data.name);
    }
    editUser();

    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit user
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex justify-content-center">
            <label style={{ margin: "1rem" }}>New user name:</label>
            <input
              ref={inputRef}
              style={{ margin: "1rem" }}
              placeholder={props.userName}
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
