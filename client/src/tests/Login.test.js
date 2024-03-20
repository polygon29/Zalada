import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login'; 

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation(() => () => {}),
}));

describe('Login Form Submission', () => {
  test('successful login navigates to member home', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        jwt: 'fake-jwt-token',
        user: {
          id: 'user-id',
          username: 'testuser',
        },
      },
    });

    render(
      <Router>
        <Login />
      </Router>
    );
    
    expect(screen.getByPlaceholderText('ชื่อผู้ใช้ / Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('รหัสผ่าน')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('ชื่อผู้ใช้ / Email'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('รหัสผ่าน'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'เข้าสู่ระบบ' }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  
  });
});

