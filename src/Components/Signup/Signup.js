import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim input values
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    // Reset previous errors
    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    // Basic username validation
    if (!trimmedUsername) {
      setUsernameError('Username is required');
      return;
    }

    // Basic email validation
    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Basic phone number validation (optional)
    if (!trimmedPhone || !/^\d{10}$/.test(trimmedPhone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }

    // Basic password length validation
    if (!trimmedPassword || trimmedPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    // Create user with Firebase authentication
    firebase.auth().createUserWithEmailAndPassword(trimmedEmail, trimmedPassword)
      .then((result) => {
        console.log("User created: ", result.user);
        result.user.updateProfile({ displayName: trimmedUsername })
          .then(() => {
            // Add user details to Firestore
            firebase.firestore().collection('users').add({
              id: result.user.uid,
              username: trimmedUsername,
              phone: trimmedPhone
            }).then(() => {
              console.log("User added to Firestore");
              navigate('/login');
            })
          })
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            id="username"
            name="username"
          />
          <br />
          {usernameError && <span className="error">{usernameError}</span>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            id="email"
            name="email"
          />
          <br />
          {emailError && <span className="error">{emailError}</span>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.trim())}
            id="phone"
            name="phone"
          />
          <br />
          {phoneError && <span className="error">{phoneError}</span>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            id="password"
            name="password"
          />
          <br />
          {passwordError && <span className="error">{passwordError}</span>}
          <br />
          <button>Signup</button>
        </form>
        <a onClick={() => navigate('/login')}>Login</a>
      </div >
    </div >
  );
}
