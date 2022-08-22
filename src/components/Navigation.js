import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Navigation(props) {
  const homePage = localStorage.getItem("user") === null ? "/" : "/users-form";

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href={homePage}>My Users Project</Navbar.Brand>

        {localStorage.getItem("user") !== null && (
          <>
            <Nav>
              <Nav.Link href="/users-form">Users List</Nav.Link>
              <Nav.Link href="/add-new-user">Add new user</Nav.Link>
              <Button variant="outline-light" onClick={props.logout}>
                Logout
              </Button>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
