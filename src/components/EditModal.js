import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export const EditModal = (props) => {
  let saveChangesButton = (
    <Button variant="primary" type="submit">
      Save Changes
    </Button>
  );

  if (props.isLoading) {
    saveChangesButton = (
      <Button variant="primary" disabled type="submit">
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
    <Modal show={props.showEditModal} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        <Form className="container " onSubmit={props.submitHandlerEdit}>
          <Form.Group controlId="formBasicText" className="row pt-3 pb-4 ">
            <Form.Label className="col-4 m-0 align-self-center">
              New user name:
            </Form.Label>
            <Form.Control
              className="col-8 "
              type="text"
              required
              maxLength="25"
              minLength="2"
              ref={props.inputRef}
              defaultValue={props.modalPlaceholder}
              style={{ width: "60%" }}
            />
            {props.error && (
              <Alert
                className="p-1 mt-4 col-6 offset-3 text-center"
                variant="danger"
              >
                Something went wrong!
              </Alert>
            )}
          </Form.Group>
          <div
            className="col pt-3"
            style={{
              textAlign: "right",
            }}
          >
            <Button
              variant="secondary"
              onClick={props.handleClose}
              type="button"
              style={{ marginRight: "1rem" }}
            >
              Close
            </Button>
            {saveChangesButton}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
