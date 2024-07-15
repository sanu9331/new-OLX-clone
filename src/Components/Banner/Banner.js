import React, { useState } from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow';
import CategoriesDropdown from './CategoriesDropdown';

function Banner() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu" onClick={toggleDropdown}>
            <span>ALL CATEGORIES</span>
            <Arrow />
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        {showDropdown && <CategoriesDropdown />}
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
