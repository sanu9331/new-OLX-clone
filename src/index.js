import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import firebase from './firebase/config';
import { AuthProvider } from './store/FirebaseContext'
import { UserProvider } from './store/UserContext';

const initialUser = null;
const initialSetUser = () => { };

ReactDOM.render(<FirebaseContext.Provider value={{ firebase }}>
    <AuthProvider> {/* Wrap App with AuthProvider */}
        <UserProvider value={{ user: initialUser, setUser: initialSetUser }}>
            <App />
        </UserProvider>
    </AuthProvider>
</FirebaseContext.Provider >, document.getElementById('root'));
