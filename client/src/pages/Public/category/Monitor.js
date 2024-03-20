import '../home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from '../../../component/navbar/PublicNavbar';
import ProductModal from '../ProductModal';
import config from '../../../config';


const Case = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setModalShow(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.serverUrlPrefix}/api/categories?filters[name][$eq]=Monitor&populate=*`);
                setProducts(response.data.data);
                console.log('API Response:', response.data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='bg'>
            <Navbar />
            <br />
            <div className="container">
                <div className="row">
                    {products.map((category) => (
                        <div key={category.id}>
                            <h2>{category.attributes.name}</h2><br />
                            <div className="row">
                                {category.attributes.products.data.map((product) => (
                                    <div className="col-md-3 my-3 homepage-card" key={product.id} onClick={() => handleShowModal(product)}>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={product.attributes.linkimage} style={{ objectFit: 'cover', height: '15rem' }} />
                                            <Card.Body>
                                                <Card.Title>{product.attributes.name}</Card.Title>
                                                <Card.Text>
                                                    {/* Display other product details as needed */}
                                                    <h4 style={{ color: '#003AA7' }}>฿{product.attributes.price}</h4>

                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedProduct && (
                <ProductModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    product={selectedProduct}
                />
            )}
        </div>

    );
};

export default Case;
