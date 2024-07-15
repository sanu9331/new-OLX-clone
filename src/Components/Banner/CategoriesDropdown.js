import React from 'react';
import './CategoriesDropdown.css';
import Arrow from '../../assets/Arrow';

function CategoriesDropdown() {
    return (
        <div className="categoriesDropdown">
            {/* <div className="dropdownHeader">
                <span>ALL CATEGORIES</span>
                <Arrow />
            </div> */}
            <div className="categoriesContent">
                <div className="category">
                    <h4>Cars</h4>
                </div>
                <div className="category">
                    <h4>Electronics & categories</h4>
                    <p>TV,video,audio</p>
                    <p>kitchen & other applications</p>
                    <p>compitors & laptops</p>
                    <p>Cameras and lenses</p>
                    <p>AC's</p>
                    <p>Games & entertainment</p>
                </div>
                <div className="category">
                    <h4>Properties</h4>
                    <p>For Sale: Houses & Apartments</p>
                    <p>For Rent: Houses & Apartments</p>
                    <p>Lands & Plots</p>
                    <p>For Rent: Shops & Offices</p>
                    <p>For Sale: Shops & Offices</p>
                    <p>PG & Guest Houses</p>
                </div>
                <div className="category">
                    <h4>Mobiles</h4>
                    <p>Mobile Phones</p>
                    <p>Accessories</p>
                    <p>Tablets</p>
                </div>
                {/* Add more categories similarly */}
            </div>
        </div>
    );
}

export default CategoriesDropdown;
