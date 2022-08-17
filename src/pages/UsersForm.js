import React, { useEffect, useState, useRef } from "react";
import UserItem from "../components/UserItem";
import Spinner from "react-bootstrap/Spinner";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { DeleteModal } from "../components/DeleteModal";
import { EditModal } from "../components/EditModal";

function UsersForm() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorModal, setErrorModal] = useState(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

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

  // ********************************MODAL****************************

  const initialModalData = {
    showEdit: false,
    showDelete: false,
    user: { name: "", id: "" },
  };

  const [modalData, setModalData] = useState(initialModalData);
  const inputRef = useRef();

  const handleClose = () => setModalData(initialModalData);

  const handleShowEdit = (userName, userId) =>
    setModalData({
      showEdit: true,
      showDelete: false,
      user: { name: userName, id: userId },
    });

  const handleShowDelete = (userName, userId) =>
    setModalData({
      showEdit: false,
      showDelete: true,
      user: { name: userName, id: userId },
    });

  // ********************************EDIT USER****************************

  async function submitHandlerEdit() {
    setIsLoadingModal(true);
    try {
      const response = await fetch(
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

      if (!response.ok) {
        setErrorModal(true);
        setIsLoadingModal(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();

        const selectedUserIndex = users.findIndex(
          (user) => user.id === data.id
        );

        users[selectedUserIndex].name = data.name;
        setIsLoadingModal(false);
        setModalData(initialModalData);
      }
    } catch (error) {
      setIsLoadingModal(false);
      setError(error.message);
    }
  }

  // ********************************DELETE USER****************************

  async function submitHandlerDelete() {
    setIsLoadingModal(true);
    try {
      const response = await fetch(
        "https://62e27da2e8ad6b66d85cabf2.mockapi.io/api/v1/users/" +
          modalData.user.id,
        { method: "DELETE" }
      );

      if (!response.ok) {
        setErrorModal(true);
        setIsLoadingModal(false);
        return;
      }

      const updatedUsersList = users.filter(
        (user) => user.id !== modalData.user.id
      );

      handleClose();
      setIsLoadingModal(false);
      setUsers(updatedUsersList);
    } catch (error) {
      setIsLoadingModal(false);
      setError(error.message);
    }
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
      <div className="container ml-3 mr-3">
        <div className="row">
          {users.map((user) => {
            const displayDate = new Date(user.createdAt).toDateString();
            const displayTime = new Date(user.createdAt).toLocaleTimeString();
            const userCreatedAt = `${displayDate}, ${displayTime}`;
            return (
              <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                avataru={user.avataru}
                date={userCreatedAt}
                showEditHandler={() => {
                  handleShowEdit(user.name, user.id);
                }}
                showDeleteHandler={() => {
                  handleShowDelete(user.name, user.id);
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

  const emptyList = (
    <div>
      <p>The list is empty.</p>

      <Nav.Link href="/add-new-user">
        <Button variant="dark">Add user</Button>
      </Nav.Link>
    </div>
  );

  // ***************************RETURN***************************

  return (
    <>
      <h1 className="m-3">List of Users</h1>
      {users.length === 0 && !isLoading && !error ? emptyList : content}
      <EditModal
        error={errorModal}
        handleClose={handleClose}
        inputRef={inputRef}
        modalPlaceholder={modalData.user.name}
        isLoading={isLoadingModal}
        submitHandlerEdit={submitHandlerEdit}
        showEditModal={modalData.showEdit}
      />
      <DeleteModal
        error={errorModal}
        handleClose={handleClose}
        inputRef={inputRef}
        modalPlaceholder={modalData.user.name}
        isLoading={isLoadingModal}
        submitHandlerDelete={submitHandlerDelete}
        showDeleteModal={modalData.showDelete}
      />
    </>
  );
}

export default UsersForm;
