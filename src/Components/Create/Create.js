import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from "../../store/FirebaseContext";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  const date = new Date();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const url = await Promise.all(
      image.map(async (image) => {
        const uploadTask = await firebase.storage().ref(`/images/${image.name}`).put(image);
        return await uploadTask.ref.getDownloadURL();
      })
    );

    firebase.firestore().collection('products').add({
      name,
      category,
      price,
      url,
      description,
      userId: isAuthenticated.uid,
      createdAt: date.toDateString(),
    });

    navigate('/');
  };

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        {/* <input
          className="input"
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
        /> */}
        <select
          className="input"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
        >
          <option value="">Select</option>
          <option value="Cars">Cars</option>
          <option value="Electronics">Electronics</option>
          <option value="Mobile Phones">Mobile Phones</option>
          <option value="Cameras">Cameras</option>
          <option value="Bicycles">Bicycles</option>
          <option value="Furniture">Furniture</option>
          <option value="Fashion">Fashion</option>
          <option value="Accessories">Accessories</option>
          <option value="Two-Wheelers">Two-Wheelers</option>
        </select>

        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="price"
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <input
          className="input"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
        /><br />

        {image.length > 0 && (
          <div>
            {image.map((image, index) => (
              <img key={index} alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)} />
            ))}
          </div>
        )}

        <br />
        <input multiple onChange={handleImageChange} type="file" />
        <br />
        <button className="uploadBtn" onClick={handleSubmit}>Upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;
