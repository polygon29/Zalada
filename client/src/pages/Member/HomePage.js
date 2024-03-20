import './home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Navbar from '../../component/navbar/MemberNavbar';
import Carousel from 'react-bootstrap/Carousel';
import ProductModal from './ProductModal';
import config from '../../config';


const Home = () => {
    const [pics, setPics] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setModalShow(true);
    };
    
    useEffect(() => {
        const fetchPics = async () => {
            try {
                const response = await axios.get(`${config.serverUrlPrefix}/api/pics`);
                setPics(response.data.data); 
            } catch (error) {
                console.error('Error fetching pics:', error);
            }
        };

        fetchPics();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.serverUrlPrefix}/api/products?filters[status][$eq]=สินค้าแนะนำประจำวัน`);
                setProducts(response.data.data);
                console.log('API Response:', response.data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main">
            <Navbar />
            <br></br>
            <div>
            <Carousel>
                {pics.map(pic => (
                    <Carousel.Item key={pic.id}>
                        <img
                            className="d-block w-100"
                            src={pic.attributes.PicURL}
                            alt={"Slide " + pic.id}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            </div><br></br><br></br>
            <div className="container margin1"><br></br>
                <h3 className='text-left' style={{ color: '#003AA7' }}>สินค้าแนะนำประจำวัน</h3>
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-3 my-3 homepage-card" key={product.id} onClick={() => handleShowModal(product)}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={product.attributes.linkimage} style={{ objectFit: 'cover', height: '15rem' }} />
                                <Card.Body>
                                    <Card.Title>{product.attributes.name}</Card.Title>
                                    <Card.Text>
                                        <h4 style={{ color: '#003AA7' }}>฿{product.attributes.price}</h4>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
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


export default Home;

