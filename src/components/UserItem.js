import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserItem(props) {
  return (
    <div className="col-12 col-sm-6  col-lg-4 col-xxl-3  d-flex align-items-stretch">
      <Card style={{ margin: "1rem" }}>
        <Card.Img variant="top" src={props.avataru} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>Created at: {props.date}</Card.Text>
          <div className="row justify-content-around">
            <Button
              variant="primary"
              onClick={props.showEditHandler}
              className="col-5 "
            >
              Edit
            </Button>

            <button
              className="btn btn-danger col-5 "
              onClick={props.showDeleteHandler}
            >
              Delete
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserItem;
