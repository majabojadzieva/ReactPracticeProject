import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const DeleteModal = (props) => {
  let yesButton = (
    <Button
      variant="primary"
      onClick={props.submitHandlerDelete}
      style={{ width: "20%" }}
      type="button"
    >
      Yes
    </Button>
  );

  if (props.isLoading) {
    yesButton = (
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
    <Modal show={props.showDeleteModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {props.modalPlaceholder} ?</p>
        {props.error && (
          <Alert
            className="p-1 mt-4 col-6 offset-3 text-center"
            variant="danger"
          >
            Something went wrong!
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}>
        <Button
          variant="secondary"
          onClick={props.handleClose}
          style={{ width: "20%" }}
          type="button"
        >
          No
        </Button>
        {yesButton}
      </Modal.Footer>
    </Modal>
  );
};
