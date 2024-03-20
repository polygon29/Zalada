import React from 'react';
import './contact.css';
import Navbar from '../../component/navbar/PublicNavbar';
import lineIcon from './Image/line.png';
import facebookIcon from './Image/facebook.png';
import instagramIcon from './Image/instagram.png';
import PhoneIcon from './Image/phone.png';
import TelegramIcon from './Image/telegram.png';
import { Image, ListGroup } from 'react-bootstrap';


const ContactInfo = () => {
    return (
        <div className='bg'>
            <Navbar /><br></br><br></br><br></br><br></br>
            <h2 className='text-center'>Contact | ช่องทางติดต่อ</h2><br></br>
            <ListGroup className="contact-info-container">
                <ListGroup.Item className="contact-item">
                    <Image src={lineIcon} alt="line Icon" roundedCircle className="contact-icon" />
                    <a
                        href="รอใส่ลิ้งค์ไลน์"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        LINE : @ZALADA
                    </a>

                </ListGroup.Item>
                <ListGroup.Item className="contact-item">
                    <Image src={facebookIcon} alt="Facebook Icon" roundedCircle className="contact-icon" />
                    <a
                        href="รอใส่ลิ้งค์ไลน์"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        Facebook : ZALADA IT Support
                    </a>
                </ListGroup.Item>
                <ListGroup.Item className="contact-item">
                    <Image src={instagramIcon} alt="Instagram Icon" roundedCircle className="contact-icon" />
                    <a
                        href="รอใส่ลิ้งค์ไลน์"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        Instagram : ZALADA IT
                    </a>
                </ListGroup.Item>
                <ListGroup.Item className="contact-item">
                    <Image src={TelegramIcon} alt="Telegram Icon" roundedCircle className="contact-icon" />
                    <a
                        href="รอใส่ลิ้งค์ไลน์"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        Telegram : @ZALADA Support
                    </a>
                </ListGroup.Item>
                <ListGroup.Item className="contact-item">
                    <Image src={PhoneIcon} alt="Phone Icon" roundedCircle className="contact-icon" />
                    <a
                        href="รอใส่ลิ้งค์ไลน์"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                    >
                        Phone Number : 0806352466
                    </a>
                </ListGroup.Item>
                <p class="typewriter">หากมีปัญหาในการใช้งานหรือติดต่อผู้ดูแลระบบ โปรดติดต่อให้เราดูแล !!</p>
            </ListGroup>
        </div>
    );
};

export default ContactInfo;