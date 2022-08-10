import React, { useEffect, useState, useRef } from "react";
import UserItem from "./UserItem";
import Spinner from "react-bootstrap/Spinner";
import ModalComponent from "./ModalComponent";

function UsersForm() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const initialModalData = {
    show: false,
    user: { name: "", id: "" },
  };

  const [modalData, setModalData] = useState(initialModalData);
  const inputRef = useRef();

  const handleClose = () => setModalData(initialModalData);
  const handleShow = (userName, userId) =>
    setModalData({
      show: true,
      user: { name: userName, id: userId },
    });

  function submitHandler() {
    async function editUser() {
      await fetch(
        "https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users/" +
          modalData.user.id,
        {
          method: "PUT",
          body: JSON.stringify({
            name: inputRef.current.value,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      getUsers();
    }
    editUser();

    setModalData(initialModalData);
  }

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
      <div className="container-fluid">
        <div className="row">
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
                  handleShow(user.name, user.id);
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
      <h1>List of Users</h1>
      {content}
      <ModalComponent
        handleClose={handleClose}
        handleShow={handleShow}
        submitHandler={submitHandler}
        showModal={modalData.show}
        inputRef={inputRef}
        modalPlaceholder={modalData.user.name}
      />
    </>
  );
}

export default UsersForm;
