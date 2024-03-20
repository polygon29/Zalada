import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

//Public
import PublicHome from './pages/Public/HomePage';
import Category from './pages/Public/category'
import Cpu from './pages/Public/category/Cpu';
import Case from './pages/Public/category/Case';
import Harddisk from './pages/Public/category/Harddisk';
import KeyboardMouse from './pages/Public/category/KeyboardMouse';
import Mainboard from './pages/Public/category/Mainboard';
import Memory from './pages/Public/category/Memory';
import Monitor from './pages/Public/category/Monitor';
import Powersupply from './pages/Public/category/Powersupply';
import PublicContact from './pages/Public/contact';

//Member
import Profile from './pages/Member/Profile/Profile';
import Waitpay from './pages/Member/Profile/waitpay';
import Waitdelivery from './pages/Member/Profile/waitdelivery';
import Waitsuccess from './pages/Member/Profile/waitsuccess';
import MemberHome from './pages/Member/HomePage';
import BuyItem from './pages/Member/buyitem';
import Contact from './pages/Member/contact';
import MemberNotify from './pages/Member/Notify';
import Cart from './pages/Member/cart'
import MemberCategory from './pages/Member/category'
import MemberCpu from './pages/Member/category/Cpu';
import MemberCase from './pages/Member/category/Case'
import MemberHarddisk from './pages/Member/category/Harddisk';
import MemberKeyboardMouse from './pages/Member/category/KeyboardMouse';
import MemberMainboard from './pages/Member/category/Mainboard';
import MemberMemory from './pages/Member/category/Memory';
import MemberMonitor from './pages/Member/category/Monitor';
import MemberPowersupply from './pages/Member/category/Powersupply';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/cpu" element={<Cpu />} />
        <Route path="/category/harddisk" element={<Harddisk />} />
        <Route path="/category/case" element={<Case />} />
        <Route path="/category/KeyboardMouse" element={<KeyboardMouse />} />
        <Route path="/category/mainboard" element={<Mainboard />} />
        <Route path="/category/memory" element={<Memory />} />
        <Route path="/category/monitor" element={<Monitor />} />
        <Route path="/category/powersupply" element={<Powersupply />} />
        <Route path="/contact" element={<PublicContact />} />

        <Route path="/member/category" element={<MemberCategory />} />
        <Route path="/member/category/Cpu" element={<MemberCpu />} />
        <Route path="/member/category/Case" element={<MemberCase />} />
        <Route path="/member/category/Harddisk" element={<MemberHarddisk />} />
        <Route path="/member/category/KeyboardMouse" element={<MemberKeyboardMouse />} />
        <Route path="/member/category/Mainboard" element={<MemberMainboard />} />
        <Route path="/member/category/Memory" element={<MemberMemory />} />
        <Route path="/member/category/Monitor" element={<MemberMonitor />} />
        <Route path="/member/category/Powersupply" element={<MemberPowersupply />} />
        <Route path="/member/profile" element={<Profile />} />
        <Route path="/member/home" element={<MemberHome />} />
        <Route path="/member/buyitem" element={<BuyItem />} />
        <Route path="/member/contact" element={<Contact />} />
        <Route path="/member/cart" element={<Cart />} />
        <Route path="/member/notify" element={<MemberNotify />} />
        <Route path="/member/profile/waitpay" element={<Waitpay />} />
        <Route path="/member/profile/waitdelivery" element={<Waitdelivery />} />
        <Route path="/member/profile/waitsuccess" element={<Waitsuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
