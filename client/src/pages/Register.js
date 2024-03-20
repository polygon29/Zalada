import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Image } from 'antd';
import Swal from 'sweetalert2';
import config from '.././config';


const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    const { username, email, Phone_number, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      Swal.fire('Password ไม่ตรงกัน', '', 'error');
      return;
    }

    try {
      await axios.post(`${config.serverUrlPrefix}/api/auth/local/register`, {
        username,
        email,
        password,
        Phone_number,
      });
      Swal.fire('คุณได้ทำการสมัครสมาชิกเรียบร้อยแล้ว', '', 'success');
      navigate('/login');
    } catch (error) {
      Swal.fire('การสมัครสมาชิกไม่สำเร็จ', 'Email หรือ Username นี้ได้ถูกใช้ไปแล้ว', 'error');
    }
  };

  return (
    <div className="signup-container" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #363b00, #103b74, #1069a2, #3d078b)'
    }}>
      <Card style={{ width: 500, padding: '20px', textAlign: 'center' }}>
        <Image
          width={100}
          src="https://scontent.xx.fbcdn.net/v/t1.15752-9/430858247_975385147379468_1324677178051267997_n.png?_nc_cat=106&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHCWZPHf40qWDVLdN681UhamI5UugGuyFOYjlS6Aa7IUxOtfZ68ijnc0yeDgN-m6sqeBOX4F3vEiDZnwMzlwjad&_nc_ohc=jqQMl2S5ipAAX_z4zEJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdThR-2DIOhyItEoykjNkuXmsrRyAfLWlVLsNhHJ51PQ9Q&oe=660ADB04"
          alt="Icon"
          style={{
            display: 'block',
            margin: 'auto'
          }}
        />
        <br /><br />
        <h3 className="card-title text-dark mb-6h6 text-center ">SIGN IN | สมัครสมาชิก</h3>
        <br /><br />
        <Form
          form={form}
          name="register"
          onFinish={handleSignup}
          scrollToFirstError
          hideRequiredMark
        >
          <Form.Item
            name="username"
            label="ชื่อบัญชี"
            rules={[{ required: true, message: 'กรุณากรอกชื่อบัญชี!' }]}
            style={{ fontFamily: 'Helvetica' }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="อีเมล"
            rules={[{ type: 'email', message: 'อีเมลไม่ถูกต้อง!' }, { required: true, message: 'กรุณากรอกอีเมล!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Phone_number"
            label="เบอร์ติดต่อ"
            rules={[{ required: true, message: 'กรุณากรอกเบอร์ติดต่อ!' }]}
            style={{ fontFamily: 'Helvetica' }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="รหัสผ่าน"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'กรุณายืนยันรหัสผ่าน!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('รหัสผ่านที่คุณยืนยันไม่ตรงกับรหัสผ่านที่คุณได้ระบุไว้!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              สมัครสมาชิก
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
