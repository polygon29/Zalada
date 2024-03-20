import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import BuyItemPage from '../pages/Member/buyitem';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn().mockImplementation(() => () => {}),
  }));

test('renders text website', () => {
    render(<Router><BuyItemPage /></Router>);

    const Buy = screen.getByText(/คุณได้ทำการสั่งซื้อแล้ว!/i);
    const FileQR = screen.getByText(/กรุณาสแกน QrCode/i);

    expect(Buy).toBeInTheDocument();
    expect(FileQR).toBeInTheDocument();


});


describe('BuyItemPage', () => {
    test('navigates to contact page when button is clicked', async () => {
      render(
        <Router>
          <BuyItemPage />
        </Router>
      );

      fireEvent.click(screen.getByText(/ไปยังหน้าช่องทางการติดต่อ/i));

      await waitFor(() => {
        expect(screen.getByText(/คุณได้ทำการสั่งซื้อแล้ว!/i)).toBeInTheDocument();
      });
    });
  });
