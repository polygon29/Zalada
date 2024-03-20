import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalState from '../../../component/utils/useLocalStorage';
import Navbar from '../../../component/navbar/MemberNavbar';
import { Card, Button, Container } from 'react-bootstrap';
import './profile.css';
import ProfileModal from './ProfileModal';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';

const Profile = () => {
  const [user, setUser] = useState({});
  const [auth] = useLocalState({}, 'auth');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  useEffect(() => {
    const authCheck = localStorage.getItem('auth');
    if (!authCheck) {
      navigate('/login');
    }

    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`${config.serverUrlPrefix}/api/users/me?populate=*`, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        setUser(data);
        setProfileImageUrl(`${config.serverUrlPrefix}` + data.ProfilePicture.url);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [auth.jwt, navigate]);


  const handleLogout = () => {

    localStorage.removeItem('auth');
    navigate('/');
  };

  return (
    <div className="bgprofile">
      <Navbar />
      <div className="container mt-5">
        <Card className="profile-container">
          <Card.Body>
            <Card.Title className="card-title-custom">โปรไฟล์ของฉัน</Card.Title>
            <br />
            <Card.Text>
              <div class="row gutters-sm">
                <div class="col-md-4 mb-3">
                  <div class="card">
                    <div class="card-body">
                     <div class="d-flex flex-column align-items-center text-center">
                        <img
                          src={profileImageUrl || "https://bootdey.com/img/Content/avatar/avatar7.png"}
                          alt="Profile"
                          style={{ borderRadius: '50%', width: '150px', height: '150px' }} 
                        />
                        <br />
                        <div class="mt-3">
                          <h5>ชื่อบัญชี: {user.username || "N/A"}</h5>
                          <h5>อีเมล: {user.email || "N/A"}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card mb-3 black-border-card">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">ชื่อ-นามสกุล</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">{user.name || "N/A"}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="card mb-3 black-border-card">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">เบอร์ติดต่อ</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">{user.Phone_number || "N/A"}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="card mb-3 black-border-card">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0">ที่อยู่</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">{user.Address || "N/A"}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-12">
                    </div>
                  </div>
                </div>
              </div>
            </Card.Text>
            <Button variant="primary" onClick={() => setShowModal(true)}>แก้ไขข้อมูล</Button>
            <Button variant="danger" onClick={handleLogout} style={{ marginLeft: '20px' }}>ออกจากระบบ</Button>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Body>
            <Container className="d-flex justify-content-around align-items-center">
              <Link
                to="/member/profile/waitpay"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="icon-wrapper">
                  <h1 className="center">&#128184;</h1>
                  <p>ที่ต้องชำระเงิน</p>
                </div>
              </Link>
              <Link
                to="/member/profile/waitdelivery"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="icon-wrapper">
                  <h1 className="center">&#128666;</h1>
                  <p>ที่ต้องได้รับ</p>
                </div>
              </Link>
              <Link
                to="/member/profile/waitsuccess"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="icon-wrapper">
                  <h1 className="center">&#128230;</h1>
                  <p>จัดส่งแล้ว</p>
                </div>
              </Link>
            </Container>
          </Card.Body>
        </Card>
        <ProfileModal s show={showModal}
          onHide={() => setShowModal(false)}
          user={user}
          updateUser={updateUser} />
      </div>
    </div>
  );
};

export default Profile;
