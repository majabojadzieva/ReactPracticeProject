import Button from "react-bootstrap/Button";

function UserItem(props) {
  return (
    <>
      <div className="card " style={{ width: "18rem", margin: "1rem" }}>
        <img
          src={props.avataru}
          className="card-img-top"
          alt=""
          style={{ marginTop: "1rem" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Created at: {props.date}</p>

          <div className="text-center">
            <Button variant="primary" onClick={props.showHandler}>
              Edit user
            </Button>

            <button className="btn btn-primary m-1" onClick={props.deleteUser}>
              Delete user
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserItem;
