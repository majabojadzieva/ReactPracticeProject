import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent(props) {
  return (
    <>
      {/* ****************EDIT USER MODAL****************** */}

      <Modal show={props.showEditModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex justify-content-center">
            <label style={{ margin: "1rem" }}>New user name:</label>
            <input
              ref={props.inputRef}
              style={{ margin: "1rem" }}
              placeholder={props.modalPlaceholder}
            ></input>
          </form>
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
          <Button variant="secondary" onClick={props.handleClose}>
            No
          </Button>
          <Button variant="dark" onClick={props.submitHandlerDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
