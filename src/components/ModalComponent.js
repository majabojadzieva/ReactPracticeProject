import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex justify-content-center">
            <label style={{ margin: "1rem" }}>New user name:</label>
            <input
              ref={props.inputRef}
              style={{ margin: "1rem" }}
              placeholder={"Primer"}
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
