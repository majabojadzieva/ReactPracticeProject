import React, { useEffect, useState, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import UserItem from "../components/UserItem";
import { fetchGetJson } from "../services/services";
import { EditModal } from "../components/EditModal";
import { fetchPutJson } from "../services/services";
import { fetchDeleteRes } from "../services/services";
import { DeleteModal } from "../components/DeleteModal";

function UsersForm() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enteredUser, setEnteredUser] = useState("");

  const initialModalData = {
    showEdit: false,
    showDelete: false,
    user: { name: "", id: "" },
  };

  const [modalData, setModalData] = useState(initialModalData);
  const [errorModal, setErrorModal] = useState(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const inputRef = useRef();

  // Get data

  async function getUsers() {
    setIsLoading(true);
    const [response, data] = await fetchGetJson("users");

    if (!response.ok) {
      setError(true);
      setIsLoading(false);
    }

    setUsers(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);

  // Modal

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

  // *Edit user

  function submitHandlerEdit(e) {
    e.preventDefault();
    setIsLoadingModal(true);
    async function editUser() {
      const [response, data] = await fetchPutJson(
        "users/" + modalData.user.id,
        inputRef.current.value
      );

      if (!response.ok) {
        setErrorModal(true);
        setIsLoadingModal(false);
        return;
      }

      const selectedUserIndex = users.findIndex((user) => user.id === data.id);
      users[selectedUserIndex].name = data.name;
      setIsLoadingModal(false);
      setModalData(initialModalData);
    }
    editUser();
  }

  // Delete user

  async function submitHandlerDelete() {
    setIsLoadingModal(true);
    const response = await fetchDeleteRes("users/" + modalData.user.id);

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
  }

  // Content

  let content = (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (!isLoading && !error) {
    content = (
      <div className="container ml-3 mr-3 ">
        <Form className="d-flex col-6 offset-3 mt-3 mb-3">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => {
              setEnteredUser(e.target.value);
            }}
            value={enteredUser}
          />
        </Form>
        <div className="row">
          {users
            .filter((user) => user.name.toLowerCase().includes(enteredUser))
            .map((user) => {
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
    content = <h5 className="text-center">Something went wrong!</h5>;
  }

  const emptyList = (
    <div>
      <p>The list is empty.</p>

      <Nav.Link href="/add-new-user">
        <Button variant="primary">Add user</Button>
      </Nav.Link>
    </div>
  );

  // Return

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
