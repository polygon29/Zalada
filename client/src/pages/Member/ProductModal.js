import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import useLocalState from '../../component/utils/useLocalStorage';
import Swal from 'sweetalert2';
import config from '../../config';

const ProductModal = ({ show, onHide, product }) => {
  const [auth] = useLocalState({}, 'auth');

  const handleAddToCart = async () => {
 
    if (product.attributes.quantity === 0) {
   
      Swal.fire('ไม่สามารถเพิ่มสินค้าได้', 'สินค้านี้หมดแล้ว', 'warning');
      return; 
    }
  
    try {
      const response = await axios.get(`${config.serverUrlPrefix}/api/carts?filters[cart_owner][id][$eq]=${auth.userId}&populate=*`, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      const userCart = response.data.data[0];
  
      if (userCart) {
        const updatedTotalQuantity = 1 + Number(userCart.attributes.totalQuantity);
        const updatedTotalPrice = Number(userCart.attributes.totalPrice) + Number(product.attributes.price);
  
        const updatedCartData = {
          "data": {
            "totalQuantity": updatedTotalQuantity,
            "totalPrice": updatedTotalPrice,
            "products": [
              ...userCart.attributes.products.data,
              { id: product.id, quantity: 1 },
            ],
          }
        };
        await axios.put(`${config.serverUrlPrefix}/api/carts/${userCart.id}`, updatedCartData, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
      } else {
        await axios.post(`${config.serverUrlPrefix}/api/carts`, {
          "data": {
            "totalQuantity": 1,
            "totalPrice": product.attributes.price,
            "cart_owner": auth.userId,
            "products": [{ id: product.id, quantity: 1 }],
          }
        }, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
      }
      Swal.fire('สำเร็จ!', 'สินค้าถูกเพิ่มลงในตะกร้าแล้ว', 'success');
      onHide();
    } catch (error) {
      Swal.fire('ข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการเพิ่มสินค้าในตะกร้า', 'error');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {product.attributes.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={product.attributes.linkimage} alt={product.attributes.name} style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className="col-md-6">
              <h4>รายละเอียดสินค้า</h4>
              <p>{product.attributes.description}</p>
              <p><h4>ราคา</h4>{product.attributes.price} บาท</p>
              <p><h4>จำนวนที่เหลือ</h4>{product.attributes.quantity}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddToCart}>เพิ่มลงในตระกร้า</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
