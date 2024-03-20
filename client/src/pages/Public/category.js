import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../component/navbar/PublicNavbar';
import './category.css';
import { Image } from 'react-bootstrap';
import config from '../../config';


const Category = () => {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        const fetchDataCategory = async () => {
            try {
                const response = await axios.get(`${config.serverUrlPrefix}/api/categories`);
                setCategoryList(response.data.data);
                console.log('API Response:', response.data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataCategory();
    }, []);

    return (
        <div className="bg">
            <Navbar />
            <div className="text-center my-5">
                <div className="row">
                    {categoryList.map((category, index) => (
                        <div key={index} className="col-md-6 mb-2">
                            <a href={`/category/${category.attributes.name}`} style={{ textDecoration: "none" }}>
                                <center>
                                    <div className="category-card">
                                        <div className="category-icon-container">
                                            <Image src={category.attributes.linkimage} alt="Telegram Icon" width="70px" />
                                        </div><br></br>
                                        <h3 className="category-name">{category.attributes.name}</h3>
                                    </div>
                                </center>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;