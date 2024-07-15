//view.js
import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import SellerCard from './SellerCard';
import { UserContext } from '../../store/UserContext';

function View() {
  const { postDetails } = useContext(PostContext);


  const [currentUser, setCurrentUser] = useState(null);
  const { allUsers } = useContext(UserContext);
  console.log('user view=', allUsers)

  const userID = postDetails.userId;
  console.log('user id =', userID);

  useEffect(() => {

    const getCurrentUser = allUsers.find((user) => user.id === userID);
    console.log('current user =', getCurrentUser);
    // setAllUsers(currentUser);
    setCurrentUser(getCurrentUser)

  }, [userID]);

  const images = postDetails.url.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  return (
    <div className="viewParentDiv">
      <div className="contentWrapper">
        <div className="imageShowDiv">
          <ImageGallery
            items={images}
            showThumbnails={true}
            showFullscreenButton={false}
            showPlayButton={false}
            thumbnailPosition="bottom"
          />
        </div>
        <div>
          <div className="description">
            <h4>Details</h4>
            <span>Brand: {postDetails.brand}</span>
            <hr />
            <h4>Description</h4>
            <span>{postDetails.description}</span>
          </div>
        </div>
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>₹{postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
        {/* <div className="contactDetails">
          <p className='sellerDetails' style={{ fontWeight: '400' }}>Seller details</p>
          {user ? (
            <>
              <p>{user.username}</p>
              <p>{user.phone}</p>
            </>
          ) : (
            <p style={{ color: 'mediumseagreen' }}>Loading...</p>
          )}
        </div> */}
        <SellerCard currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>
    </div >
  );
}

export default View;
