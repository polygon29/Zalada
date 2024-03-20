import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Navbar from '../../component/navbar/MemberNavbar';
import useLocalState from '../../component/utils/useLocalStorage'; // ตรวจสอบเส้นทางนี้ให้ถูกต้อง
import { useNavigate } from 'react-router-dom';
import './Notify.css'
import Config from '../../config';

const Notify = () => {
  const [notifies, setNotifies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useLocalState({}, 'auth');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = auth && auth.jwt ? {
          headers: { Authorization: `Bearer ${auth.jwt}` }
        } : {};

        const response = await axios.get(`${Config.serverUrlPrefix}/api/notifies`, config);
        setNotifies(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-notify">
      <Navbar />
      <br></br><br></br>
      <div className="container margin1" style={{backgroundColor:'white'}}>
        <h2 className='text-left' style={{ color: '#003AA7' }}>การแจ้งเตือน</h2>
        <br></br>
      <div className="row text-left">
        {notifies.map((product) => (
          <div  key={product.id}>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <h4 style={{color:'#006666'}}>{product.attributes.title}</h4>
                <Card.Text>
                  <p style={{ color: 'black' }}>{product.attributes.description}</p>
                </Card.Text>
              </Card.Body>
            </Card>
            <br></br>
          </div>
        ))}
      </div>
    </div>
    </div >
  );

};

export default Notify;