import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from './logo.png';

function Navbars() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{ background: '#' }}>
            <Container>
                <Navbar>
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                alt="logo"
                                src={logo}
                                height="30px"
                                className="d-inline-block align-top"
                            />{' '}
                        </Navbar.Brand>
                    </Container>
                </Navbar>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="text-white">หน้าแรก</Nav.Link>
                        <Nav.Link href="/category" className="text-white">หมวดหมู่</Nav.Link>
                        <Nav.Link href="/contact" className="text-white">ช่องทางการติดต่อ</Nav.Link>
                    </Nav>
                    <Nav >
                        <Link to="/login" className="nav-icon-link" style={{ color: 'white', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 12px' }}>
                            <i class="bi bi-person"></i>
                            <span>เข้าสู่ระบบ</span>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Navbars;