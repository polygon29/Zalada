import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import useLocalState from '../component/utils/useLocalStorage'; // Import useLocalState
import { Image } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2
import config from '.././config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [auth, setAuth] = useLocalState(null, 'auth'); // Use useLocalState hook
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.jwt) {
      navigate('/member/home');
    }
  }, [auth, navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);

    try {
      const result = await axios.post(`${config.serverUrlPrefix}/api/auth/local`, {
        identifier: username,
        password: password,
      });

      const userId = result.data.user.id;
      const userIdentifier = result.data.user.username;

      console.log('JWT:', result.data.jwt);
      console.log('UserID:', userId);
      console.log('Username:', userIdentifier);

      setAuth({
        jwt: result.data.jwt,
        userId: userId,
        username: userIdentifier,
      });

      axios.defaults.headers.common = {
        Authorization: `Bearer ${result.data.jwt}`,
      };

      // Show success message using SweetAlert2
      await Swal.fire({
        title: 'เข้าสู่ระบบสำเร็จ!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Navigate to the next page
      navigate('/member/home');
    } catch (error) {
      console.error('Login Error:', error);
      // Use SweetAlert2 to show the error message
      Swal.fire('เกิดข้อผิดพลาด!', 'โปรดตรวจสอบชื่อผู้ใช้หรือรหัสผ่านของคุณ', 'error');
      setSubmitEnabled(true);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(to bottom right, #363b00, #103b74, #1069a2, #3d078b)' }}>
      <div className="card" style={{ width: '24rem', background: '#F8F9FA', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="card-body text-center">
          <Image src="https://scontent.xx.fbcdn.net/v/t1.15752-9/430858247_975385147379468_1324677178051267997_n.png?_nc_cat=106&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHCWZPHf40qWDVLdN681UhamI5UugGuyFOYjlS6Aa7IUxOtfZ68ijnc0yeDgN-m6sqeBOX4F3vEiDZnwMzlwjad&_nc_ohc=jqQMl2S5ipAAX_z4zEJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdThR-2DIOhyItEoykjNkuXmsrRyAfLWlVLsNhHJ51PQ9Q&oe=660ADB04" alt="Telegram Icon" width="100px" />
          <br /><br /><h3 className="card-title text-dark mb-4 text-center">LOGIN | เข้าสู่ระบบ</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="ชื่อผู้ใช้ / Email"
                value={username}
                onChange={handleUsernameChange}
                style={{ background: 'transparent', borderColor: '#000000', color: 'black' }}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={handlePasswordChange}
                style={{ background: 'transparent', borderColor: '#000000', color: 'black' }}
              />
            </div>
            <hr></hr>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block" disabled={!submitEnabled}>
                เข้าสู่ระบบ
              </button>
              <button type="button" className="btn btn-link text-dark" onClick={() => navigate('/register')}>
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
