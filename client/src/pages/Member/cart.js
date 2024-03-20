import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLocalState from '../../component/utils/useLocalStorage';
import Navbar from '../../component/navbar/MemberNavbar';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom';
import './cart.css';
import config from '../../config';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [auth] = useLocalState({}, 'auth');
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`${config.serverUrlPrefix}/api/carts?filters[cart_owner][id][$eq]=${auth.userId}&populate=*`, {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        });
        const userCart = response.data.data[0];
        if (userCart) {

          const productsWithDefaultQuantity = userCart.attributes.products.data.map(item => ({
            ...item,
            quantity: item.quantity || 1
          }));
          setCart(productsWithDefaultQuantity);
          calculateTotal(productsWithDefaultQuantity);
        } else {
          setCart([]);
          calculateTotal([]);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, [auth]);


  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.attributes.price, 0);
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(total);
    setTotalItems(items);
  };


  const handlePurchase = async () => {

    Swal.fire({
      title: 'ยืนยันการสั่งซื้อ',
      text: 'คุณต้องการที่จะสั่งซื้อสินค้าที่เลือกหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#0050FA', 
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const cartResponse = await axios.get(`${config.serverUrlPrefix}/api/carts?filters[cart_owner][id][$eq]=${auth.userId}&populate=*`, {
            headers: {
              Authorization: `Bearer ${auth.jwt}`,
            },
          });
          const userCart = cartResponse.data.data[0];
  
          if (!userCart) {
            console.error('No cart found for this user.');
            return;
          }
  
     
          const orderTime = new Date().toISOString();
          const historyData = {
            data: {
              "OrderTime": orderTime,
              "history_owner": auth.userId,
              "Owner": auth.userId.toString(),
              "status": "รอชำระเงิน",
              "products": userCart.attributes.products.data
            }
          };
          const historyResponse = await axios.post(`${config.serverUrlPrefix}/api/histories`, historyData, {
            headers: {
              Authorization: `Bearer ${auth.jwt}`,
            },
          });
  
          for (const product of userCart.attributes.products.data) {
            const historyItemData = {
              data: {
                quantity: cart.find(item => item.id === product.id)?.quantity || 0,
                product: product.id,
                history: historyResponse.data.data.id,
              }
            };
            await axios.post(`${config.serverUrlPrefix}/api/history-Items`, historyItemData, {
              headers: {
                Authorization: `Bearer ${auth.jwt}`,
              },
            });
          }
  
          for (const product of userCart.attributes.products.data) {
            const currentQuantity = product.attributes.quantity;
            const purchasedQuantity = cart.find(item => item.id === product.id)?.quantity || 0;
            const newQuantity = currentQuantity - purchasedQuantity;
  
  
            await axios.put(`${config.serverUrlPrefix}/api/products/${product.id}`, {
              data: {
                quantity: newQuantity,
              },
            }, {
              headers: {
                Authorization: `Bearer ${auth.jwt}`,
              },
            });
          }
  
          await axios.put(`${config.serverUrlPrefix}/api/carts/${userCart.id}`, {
            data: {
              products: [],
              totalPrice: 0,
              totalQuantity: 0
            },
          }, {
            headers: {
              Authorization: `Bearer ${auth.jwt}`,
            },
          });
          
          setCart([]);
          navigate('/member/buyitem');
        } catch (error) {
          console.error('Error during purchase process:', error);
     
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'เกิดข้อผิดพลาดในการดำเนินการสั่งซื้อ',
          });
        }
      }
    });
  };


  const handleRemoveFromCart = async (productId) => {
    
    Swal.fire({
      title: 'ยืนยันการนำออกสินค้า',
      text: 'คุณต้องการที่จะนำสินค้าออกจากตะกร้าหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#D70000', 
    }).then(async (result) => {
      if (result.isConfirmed) {
      
        try {
          const newCartProducts = cart.filter(product => product.id !== productId);
          setCart(newCartProducts);
          calculateTotal(newCartProducts);

          const response = await axios.get(`${config.serverUrlPrefix}/api/carts?filters[cart_owner][id][$eq]=${auth.userId}&populate=*`, {
            headers: {
              Authorization: `Bearer ${auth.jwt}`,
            },
          });
          const userCart = response.data.data[0];

          if (userCart) {
            const updatedCartData = {
              "data": {
                "totalQuantity": newCartProducts.reduce((acc, product) => acc + Number(product.quantity), 0),
                "totalPrice": newCartProducts.reduce((acc, product) => acc + Number(product.quantity) * Number(product.attributes.price), 0),
                "products": newCartProducts.map(product => ({ id: product.id })),
              }
            };
            await axios.put(`${config.serverUrlPrefix}/api/carts/${userCart.id}`, updatedCartData, {
              headers: {
                Authorization: `Bearer ${auth.jwt}`,
              },
            });
          }
          
          Swal.fire({
            icon: 'success',
            title: 'นำออกสินค้าสำเร็จ',
            text: 'คุณได้ทำการนำสินค้าออกจากตะกร้าเรียบร้อยแล้ว',
          });
        } catch (error) {
          console.error('Error removing item from cart:', error);

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'เกิดข้อผิดพลาดในการลบสินค้าออกจากตะกร้า',
          });
        }
      }
    });
  };



  const handleQuantityChange = async (e, productId) => {
    const newQuantity = e.target.value.trim() === '' ? null : Number(e.target.value.trim());

    try {
      const response = await axios.get(`${config.serverUrlPrefix}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      });
      const productAvailableQuantity = response.data.data.attributes.quantity;

      if (newQuantity !== null && newQuantity > productAvailableQuantity) {
        Swal.fire({ // แสดง SweetAlert2 ในกรณีที่จำนวนสินค้าเกินกว่าที่มีในสต็อค
          icon: 'error',
          title: 'Oops...',
          text: `จำนวนสินค้าเกินกว่าที่มีในสต็อค! มีสินค้าในสต็อคเพียง ${productAvailableQuantity} ชิ้น`,
        });
        return;
      }
      const updatedCart = cart.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
      setCart(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error('Error fetching product details:', error);
      Swal.fire({ // แสดง SweetAlert2 ในกรณีที่เกิดข้อผิดพลาดในการอัปเดตจำนวนสินค้า
        icon: 'error',
        title: 'Oops...',
        text: 'เกิดข้อผิดพลาดในการอัปเดตจำนวนสินค้า',
      });
    }
  };



  const handleQuantityBlur = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId && (product.quantity === '' || product.quantity < 1)) {
        return { ...product, quantity: 1 };
      }
      return product;
    });
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  return (
    <div className='cartbg'>
      <Navbar />
      <div className='main222'>
        <div className="CartContainer">
          <div className="Header">
            <h3 className="Heading">ตะกร้าสินค้า</h3>
          </div>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div className="Cart-Items" key={item.id}>
                <div className="image-box">
                  <img src={item.attributes.linkimage} alt={item.attributes.name} style={{ height: "120px" }} />
                </div>
                <div className="about">
                  <h1 className="title">{item.attributes.name}</h1>
                  <h3 className="subtitle">
                    จำนวน:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item.id)}
                      onBlur={() => handleQuantityBlur(item.id)}
                      min="1"
                      style={{ width: '60px', marginLeft: '10px' }}
                    />
                  </h3>
                </div>
                <div className="prices">
                  <div className="amount">{formatNumber(item.attributes.price)} บาท</div>
                  <div className="remove">
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>นำออก</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="EmptyCartMessage">
              <p>ตะกร้าสินค้าว่างเปล่า</p>
            </div>
          )}
          <hr />
          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">จำนวน</div>
                <div className="items">{totalItems} ชิ้น</div>
              </div>
              <div className="total-amount">รวม  ฿{formatNumber(totalPrice)}</div>
            </div>
            <div className="button-right">
              <Button onClick={handlePurchase}>สั่งซื้อ</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;