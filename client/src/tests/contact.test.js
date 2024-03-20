import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Contact from '../pages/Public/contact';

test('renders text website', () => {
    render(<Router><Contact /></Router>);

    const lineElement = screen.getByText(/LINE : @ZALADA/i);
    const facebookElement = screen.getByText(/Facebook : ZALADA IT Support/i);
    const instagramElement = screen.getByText(/Instagram : ZALADA IT/i);
    const telegramElement = screen.getByText(/Telegram : @ZALADA Support/i);
    const phoneNumberElement = screen.getByText(/Phone Number : 0806352466/i);
    const notificationElement = screen.getByText(/หากมีปัญหาในการใช้งานหรือติดต่อผู้ดูแลระบบ โปรดติดต่อให้เราดูแล !!/i);

    expect(lineElement).toBeInTheDocument();
    expect(facebookElement).toBeInTheDocument();
    expect(instagramElement).toBeInTheDocument();
    expect(telegramElement).toBeInTheDocument();
    expect(phoneNumberElement).toBeInTheDocument();
    expect(notificationElement).toBeInTheDocument();
});
