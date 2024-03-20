import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useLocalState from '../../../component/utils/useLocalStorage';
import Swal from 'sweetalert2';
import config from '../../../config';

const ProfileModal = ({ show, onHide, user, updateUser = () => {} }) => {
  const [auth] = useLocalState({}, 'auth');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: ''
  });


  useEffect(() => {
    if (user && show) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone_number: user.Phone_number || '',
        address: user.Address || ''
      });
    }
  }, [user, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${config.serverUrlPrefix}/api/users/${user.id}`,
        {
          name: formData.name,
          email: formData.email,
          Phone_number: formData.phone_number,
          Address: formData.address
        },
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`
          }
        }
      );
      if (response.status === 200) {
        Swal.fire('สำเร็จ!', 'บันทึกการแก้ไขข้อมูลสำเร็จ!', 'success');
        onHide();
        updateUser({ ...user, ...formData }); 
      } else {
        throw new Error('Server responded with a non-OK status');
      }
    } catch (error) {
      console.error('Failed to update profile', error);
      Swal.fire('Error!', 'Failed to update profile', 'error');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>แก้ไขข้อมูล</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>ชื่อ-นามสกุล</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>อีเมล</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>เบอร์ติดต่อ</Form.Label>
            <Form.Control type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>ที่อยู่</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>ยกเลิก</Button>
        <Button variant="primary" onClick={handleSubmit}>บันทึก</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
