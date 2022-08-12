import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ModalComponent(props) {
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
          <Button variant="dark" onClick={props.submitHandlerEdit}>
            Save Changes
          </Button>
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
          <Button
            variant="dark"
            onClick={props.submitHandlerDelete}
            style={{ width: "20%" }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
