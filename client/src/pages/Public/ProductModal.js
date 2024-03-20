import React from 'react';
import { Modal } from 'react-bootstrap';

const ProductModal = ({ show, onHide, product }) => {
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
        </Modal>
    );
}

export default ProductModal;
