import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary" expand="lg">
        <Container>
          <Navbar.Brand>Carrie Leung</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
