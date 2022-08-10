import Button from "react-bootstrap/Button";

function UserItem(props) {
  return (
    <div className="col-12 col-sm-6  col-lg-4 col-xxl-3">
      <div
        className="card justify-content-center"
        style={{ width: "auto", margin: "1rem" }}
      >
        <img src={props.avataru} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Created at: {props.date}</p>

          <div className="row justify-content-around">
            <Button
              variant="primary"
              onClick={props.showHandler}
              className="col-5 "
            >
              Edit
            </Button>

            <button
              className="btn btn-danger col-5 "
              onClick={props.deleteUser}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
