import React, { useState, useContext, useEffect } from 'react';
import './MyAds.css';
import { SlOptionsVertical } from "react-icons/sl";
import { PostContext } from '../../store/PostContext';
import { UserContext } from '../../store/UserContext';

const MyAds = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [userProducts, setUserProducts] = useState([]);

    const { allProducts } = useContext(PostContext);
    const { currentUser } = useContext(UserContext);
    const { allUsers } = useContext(UserContext);
    console.log('user?', allUsers)
    console.log('Myad products=', allProducts);
    console.log('Myad userProducts=', userProducts);
    console.log('currenUser', currentUser)

    useEffect(() => {
        if (currentUser && allProducts.length > 0) {
            // Filter products that belong to the logged-in user
            const userSpecificProducts = allProducts.filter((item) => item.userId === currentUser.id);
            console.log('userSpecificProducts', userSpecificProducts);
            setUserProducts(userSpecificProducts);

        }
    }, [currentUser, allProducts]);



    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className="my-ads">
            <div className="tabs">
                <span className="tab active">ADS</span>
                <span className="tab">FAVOURITES</span>
            </div>
            <div className="filter-bar">
                <input type="text" placeholder="Search by Ad Title" />
                <div className="filter-buttons">
                    <button className="active">View all (1)</button>
                    <button>Active Ads (0)</button>
                    <button>Inactive Ads (0)</button>
                    <button>Pending Ads (1)</button>
                    <button>Moderated Ads (0)</button>
                </div>
            </div>
            <div className="ad-card">

                {userProducts.map((item) => (
                    <div key={item.id} className="ad-item">
                        <div className="ad-header">
                            <div className="ad-date">FROM: {item.createdAt}</div>
                        </div>
                        <div className="ad-details">
                            <img src={item.url} alt="Ad" />
                            <div className="ad-info">
                                <h3>{item.name}</h3>
                                {/* <p>{item.year} - {item.mileage}</p> */}
                                <p>{item.description}</p>
                                <p>₹ {item.price}</p>
                            </div>
                            <div className="ad-actions">
                                <span onClick={toggleOptions} className="options-button"><SlOptionsVertical /></span>
                                {showOptions && (
                                    <div className="options-menu">
                                        <button>Edit</button>
                                        <button>Remove</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="ad-stats">
                            <span>Views: {item.views}</span>
                            <span>Likes: {item.likes}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div >
    );
};

export default MyAds;
