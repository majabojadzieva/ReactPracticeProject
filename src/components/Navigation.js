import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">My Users Project</Navbar.Brand>

        <Nav>
          <Nav.Link href="/users-list">Users List</Nav.Link>
          <Nav.Link href="/add-new-user">Add new user</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
