import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Navbars() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{ background: '#' }}>
            <Container>
                <Navbar.Brand as={Link} to="/member/home">
                    <img
                        alt="logo"
                        src={logo}
                        height="30px"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/member/home" className="text-white">หน้าแรก</Nav.Link>
                        <Nav.Link as={Link} to="/member/category" className="text-white">หมวดหมู่</Nav.Link>
                        <Nav.Link as={Link} to="/member/notify" className="text-white">การแจ้งเตือน</Nav.Link>
                        <Nav.Link as={Link} to="/member/contact" className="text-white">ช่องทางการติดต่อ</Nav.Link>
                    </Nav>
                    <Nav>
                        <Link to="/member/cart" className="nav-icon-link" style={{ color: 'white', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 12px' }}>
                            <i className="bi bi-cart3"></i>
                            <span>ตะกร้า</span>
                        </Link>
                        <Link to="/member/profile" className="nav-icon-link" style={{ color: 'white', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 12px' }}>
                            <i className="bi bi-person"></i>
                            <span>โปรไฟล์</span>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbars;
