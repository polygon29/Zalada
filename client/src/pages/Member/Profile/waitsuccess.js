import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalState from "../../../component/utils/useLocalStorage";
import Navbar from "../../../component/navbar/MemberNavbar";
import { Badge, Card, Container, Row, Col } from "react-bootstrap";
import "./waitpay.css";
import { useNavigate } from 'react-router-dom';
import config from '../../../config';


const Waitpay = () => {
  const [histories, setHistories] = useState([]);
  const [auth] = useLocalState({}, "auth");


  useEffect(() => {
    const getHistories = async () => {
      try {
        const userId = encodeURIComponent(auth.userId); 
     
        const url = `${config.serverUrlPrefix}/api/histories?filters[Owner][$eq]=${userId}&filters[status][$eq]=จัดส่งสำเร็จ&populate[history_items][populate]=*`;

        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });

        setHistories(data.data);
      } catch (error) {
        console.error("Error fetching histories:", error);
      }
    };
    if (auth.userId && auth.jwt) {
      getHistories();
    }
  }, [auth.jwt, auth.userId]);


  return (
    <div className="waitpay">
      <Navbar />
      <Container fluid className="Wmaincon">
        <Row className="justify-content-center">
          {histories.map((history) => {
            const totalPrice = history.attributes.history_items.data.reduce((acc, historyItem) => {
              const productPrice = historyItem.attributes.product.data.attributes.price;
              const quantity = historyItem.attributes.quantity;
              return acc + (productPrice * quantity);
            }, 0);

            return (
              <Col md={8} key={history.id} className="Wcard">
                <Card className="h-100 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="text-center">
                      <Card.Title className="Wcard-title">STATUS: <Badge bg="success">{history.attributes.status}</Badge></Card.Title>
                      <p>หมายเลขคำสั่งซื้อ: {history.id}</p>
                      <p>เวลาสั่งซื้อ: {new Date(history.attributes.OrderTime).toLocaleString()}</p>
                    </div>
                    <hr className="Whr" />
                    <div className="text-start">
                      {history.attributes.history_items.data.map((historyItem) => {
                        const product = historyItem.attributes.product.data.attributes;
                        return (
                          <div key={historyItem.id}>
                            <h4 className="mb-3">{product.name}</h4>
                            <p>ราคา: ฿{product.price}</p>
                            <p>จำนวนที่ซื้อ: {historyItem.attributes.quantity}</p>
                            <Card.Img
                              src={product.linkimage}
                              alt={product.name}
                              className="Wcard-img mt-3"
                              style={{ width: '15%' }}
                            />
                            <hr className="Whr" />
                          </div>
                        );
                      })}
                      <h4 className="text-right">รวม: ฿{totalPrice}</h4>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Waitpay;
