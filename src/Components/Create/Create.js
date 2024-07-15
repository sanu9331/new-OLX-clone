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
  const [errors, setErrors] = useState({});
  const date = new Date();
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!name) tempErrors.name = "Name is required.";
    if (!category) tempErrors.category = "Category is required.";
    if (!price) tempErrors.price = "Price is required.";
    if (price && (isNaN(price) || price <= 0)) tempErrors.price = "Price must be a valid number greater than 0.";
    if (!description) tempErrors.description = "Description is required.";
    if (image.length === 0) tempErrors.image = "At least one image is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

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
      <div className="formContainer">
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
          {errors.name && <p className="error" style={{ color: 'red' }}>{errors.name}</p>}
          <label htmlFor="category">Category</label>
          <br />
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
          {errors.category && <p className="error" style={{ color: 'red' }}>{errors.category}</p>}
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
          {errors.price && <p className="error" style={{ color: 'red' }}>{errors.price}</p>}
          <label htmlFor="description">Description</label>
          <br />
          <input
            className="input"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
          {errors.description && <p className="error" style={{ color: 'red' }}>{errors.description}</p>}
          <br />

          {image.length > 0 && (
            <div>
              {image.map((image, index) => (
                <img key={index} alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)} />
              ))}
            </div>
          )}
          {errors.image && <p className="error" style={{ color: 'red' }}>{errors.image}</p>}
          <input multiple onChange={handleImageChange} type="file" />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>Upload and Submit</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
