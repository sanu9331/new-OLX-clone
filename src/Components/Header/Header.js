import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

//icons
import { TfiAgenda, TfiSettings } from "react-icons/tfi";
import { HiExclamationCircle } from "react-icons/hi";
import { VscHeartFilled, VscSignIn, VscCommentUnresolved } from "react-icons/vsc";
import { IoNotifications, IoChatbox } from "react-icons/io5";


function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();

  console.log('sanu:', isAuthenticated)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-language">
              ENGLISH
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>ENGLISH</Dropdown.Item>
              <Dropdown.Item>हिंदी</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <IoChatbox />
          <span>   </span>
          <IoNotifications />

        </div>

        {isAuthenticated ? '' : <button onClick={() => navigate('/login')} className='isAuth-login' type='btn-sm'>Login</button>}
        {/* {isAuthenticated && <span className='logout' onClick={() => {
          firebase.auth().signOut();
          navigate('/login');
        }}>logout</span>} */}

        {/* <b>profile</b> */}
        {isAuthenticated && (
          <Dropdown className="profile">
            <Dropdown.Toggle variant="link" id="dropdown-basic">{isAuthenticated.displayName}
              <img
                src="https://cdn.vectorstock.com/i/1000v/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" // Replace with actual profile image URL
                alt="Profile"
                className="profileImage" width='40px' height='40px'
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/MyAds"><VscHeartFilled /> my adds</Dropdown.Item>
              <Dropdown.Item as={Link} to=""><TfiAgenda /> Buy bussiness packages</Dropdown.Item>
              <Dropdown.Item as={Link} to=""><HiExclamationCircle /> help</Dropdown.Item>
              <Dropdown.Item as={Link} to=""><TfiSettings /> Settings</Dropdown.Item>
              <Dropdown.Item onClick={() => {
                firebase.auth().signOut();
                navigate('/login');
              }}><VscSignIn /> Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}



        <div className="sellMenu" onClick={() => isAuthenticated ? navigate('/create') : alert('please login to continue')}>
          < SellButton ></SellButton>
          <div className="sellMenuContent" >
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div >
    </div >
  );
}

export default Header;
