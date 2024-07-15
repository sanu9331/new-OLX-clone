import React from 'react';
import './SellerCard.css';

const SellerCard = ({ currentUser }) => {
    if (!currentUser) {
        return <p style={{ color: 'mediumseagreen' }}>Loading...</p>; // Loading state
    }
    console.log('currentUser=', currentUser)
    return (
        <div className="seller-card">
            <div className="seller-info">
                <img
                    src="https://via.placeholder.com/50" // Replace with actual image source
                    alt="seller"
                    className="seller-image"
                />
                <div className="seller-name">
                    {currentUser.username}
                </div>
                <div className="arrow">
                    &gt;
                </div>
            </div>
            <button className="chat-button">
                Chat with seller
            </button>
            <div className="contact-info">
                <i className="phone-icon">&#128222;</i>
                <span className="phone-number">{currentUser.phone}</span>
            </div>
        </div>
    );
};

export default SellerCard;
