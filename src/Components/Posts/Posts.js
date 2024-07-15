import React, { useContext, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';

function Posts() {
  const navigate = useNavigate();
  const { setPostDetails, allProducts, setAllproducts } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  const { isAuthenticated } = useContext(AuthContext);
  // const [products, setProducts] = useState([]);
  console.log('post- allproducts=', allProducts);


  // useEffect(() => {
  //   firebase.firestore().collection('products').get().then((snapshot) => {
  //     const allPost = snapshot.docs.map((product) => {
  //       return {
  //         ...product.data(),
  //         id: product.id,
  //       }
  //     })
  //     console.log('all post:', allPost);
  //     setProducts(allPost);

  //   })
  // }, [])

  const [visiblePosts, setVisiblePosts] = useState(6); // Initial number of posts to display



  const loadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4);
  };



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {allProducts.map((post) => (
            <div
              key={post.id}
              className="card"
              onClick={() => {
                if (isAuthenticated) {
                  setPostDetails(post);
                  navigate('/viewPost');
                } else {
                  alert('Please login to view this post');
                  // navigate('/login');
                }
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={post.url[0]} alt={post.name} />
              </div>
              <div className="content">
                <p className="rate">₹{post.price}</p>
                <span className="kilometer">{post.name}</span>
                {/* <p className="name">{post.description}</p> */}
                <p className="name">{post.description.length > 25 ? `${post.description.slice(0, 25)}...` : post.description}</p>
              </div>
              <div className="date">
                {/* <span>{post.createdAt}</span> */}
                <span>{new Date(post.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {allProducts.slice(0, visiblePosts).map((post) => (
            <div
              key={post.id}
              className="card"
              onClick={() => {
                if (isAuthenticated) {
                  setPostDetails(post);
                  navigate('/viewPost');
                } else {
                  alert('Please login to view this post');
                  // navigate('/login');
                }
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={post.url[0]} alt={post.name} />
              </div>
              <div className="content">
                <p className="rate">₹{post.price}</p>
                <span className="kilometer">{post.name}</span>
                {/* <p className="name">{post.description}</p> */}
                <p className="name">{post.description.length > 25 ? `${post.description.slice(0, 25)}...` : post.description}</p>
              </div>
              <div className="date">
                {/* <span>{post.createdAt}</span> */}
                <span>{new Date(post.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
        {visiblePosts < allProducts.length && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className="loadmore-button" onClick={loadMore}><b>Load More</b></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
