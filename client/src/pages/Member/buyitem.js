import React from 'react';
import './buyitem.css';
import qrcode from './Image/qrcode.jpg';
import Navbar from '../../component/navbar/MemberNavbar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const BuyItemPage = () => {
    const navigate = useNavigate(); 

    const goToContactPage = async () => {
        const result = await Swal.fire({
            title: 'คุณต้องการไปยังหน้าช่องทางการติดต่อหรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            icon: 'question',
        });

        if (result.isConfirmed) {
            navigate('/member/contact');
        }
    };


    return (
        <div className='bg'>
            <Navbar /><br></br><br></br>
            <div className="order-confirmation-container text-center">
                <p className="title">คุณได้ทำการสั่งซื้อแล้ว!</p>
                <p className="message">
                </p>
                <p class="black-text">กรุณาสแกน QrCode เพื่อชำระเงินและทำการติดต่อแอดมินเพื่อส่งสลิปการโอนเงินผ่านช่องทางการติดต่อต่างๆที่ได้ให้ไว้</p>
                <img
                    src={qrcode}
                    alt="QR Code"
                    className="qr-code"
                /><br></br>
                <button className="btn btn-primary" onClick={goToContactPage}>ไปยังหน้าช่องทางการติดต่อ</button>
            </div>
        </div>
    );
};

export default BuyItemPage;
