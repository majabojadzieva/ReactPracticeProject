import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

function ModalComponent(props) {
  let saveChangesButton = (
    <Button variant="dark" onClick={props.submitHandlerEdit}>
      Save Changes
    </Button>
  );

  let yesButton = (
    <Button
      variant="dark"
      onClick={props.submitHandlerDelete}
      style={{ width: "20%" }}
    >
      Yes
    </Button>
  );

  if (props.isLoading) {
    saveChangesButton = (
      <Button variant="dark" disabled>
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

    yesButton = (
      <Button variant="dark" disabled>
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
      {/* ****************EDIT USER MODAL****************** */}

      <Modal show={props.showEditModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="container">
            <Form.Group controlId="formBasicText" className="row">
              <Form.Label className="col-4 m-0 align-self-center">
                New user name:
              </Form.Label>
              <Form.Control
                className="col-8"
                type="text"
                required
                maxLength={25}
                ref={props.inputRef}
                defaultValue={props.modalPlaceholder}
                style={{ width: "60%" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          {saveChangesButton}
        </Modal.Footer>
      </Modal>

      {/* ****************CONFIRM DELETE MODAL****************** */}

      <Modal show={props.showDeleteModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {props.modalPlaceholder} ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={props.handleClose}
            style={{ width: "20%" }}
          >
            No
          </Button>
          {yesButton}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
