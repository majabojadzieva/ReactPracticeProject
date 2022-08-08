import React, { useEffect, useState, useRef } from "react";
import UserItem from "./UserItem";
import Spinner from "react-bootstrap/Spinner";
import ModalComponent from "./ModalComponent";

function UsersForm() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [placeholder, setPlaceholder] = useState("");

  // **************************GET DATA********************************
  async function getUsers() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  // ******************************DELETE DATA*******************************

  async function deleteUserHandler(id) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users/" + id,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const updatedUsersList = users.filter((user) => user.id !== id);
      setUsers(updatedUsersList);
      alert("User deleted!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  // ********************************MODAL****************************

  const [show, setShow] = useState(false);
  const inputRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = (userName) => {
    setShow(true);
    setPlaceholder(userName);
  };

  const submitHandler = () => {
    // async function editUser() {
    //   const response = await fetch(
    //     "https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users/" + id,
    //     {
    //       method: "PUT",
    //       body: JSON.stringify({
    //         name: inputRef.current.value,
    //       }),
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     }
    //   );
    //   const data = await response.json();
    // }
    console.log(inputRef.current.value);
    setShow(false);
  };

  // ******************************CONTENT****************************

  let content = (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (!isLoading && !error) {
    content = (
      <div className=".container m-0-1 m-sm-3 m-md-5">
        <div className="row justify-content-around">
          {users.map((user) => {
            return (
              <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                avataru={user.avataru}
                date={user.createdAt}
                deleteUser={() => {
                  deleteUserHandler(user.id);
                }}
                showHandler={() => {
                  handleShow(user.name);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (!isLoading && error) {
    content = <h5 className="text-center">{error}</h5>;
  }

  // ***************************RETURN***************************

  return (
    <>
      {content}
      <ModalComponent
        handleClose={handleClose}
        handleShow={handleShow}
        submitHandler={submitHandler}
        show={show}
        inputRef={inputRef}
        selectedUserName={placeholder}
      />
    </>
  );
}

export default UsersForm;
