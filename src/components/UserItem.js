import ModalComponent from "./ModalComponent";

function UserItem(props) {
  return (
    <>
      <div className="card" style={{ width: "18rem", margin: "1rem" }}>
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
            <ModalComponent userId={props.id} userName={props.name} />

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
