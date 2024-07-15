// import { createContext, useState, useEffect, useContext } from "react";
// import { FirebaseContext } from './FirebaseContext';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [allUsers, setAllUsers] = useState([]);
//     const { firebase } = useContext(FirebaseContext);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const snapshot = await firebase.firestore().collection('users').get();
//                 const allUserDetails = snapshot.docs.map((doc) => ({
//                     ...doc.data(),
//                     userId: doc.id,
//                 }));
//                 console.log('allUserDetails =', allUserDetails);
//                 setAllUsers(allUserDetails);

//                 const signedinUser = firebase.auth.currentUser;
//                 console.log('signedinUser=', signedinUser.username)

//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, [firebase]);

//     return (
//         <UserContext.Provider value={{ allUsers, setAllUsers }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

import { createContext, useState, useEffect, useContext } from "react";
import { FirebaseContext } from './FirebaseContext';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); // Add currentUser
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const loggedInUserId = user.uid; // Get the logged-in user's ID
                console.log('loggedInUserId =', loggedInUserId)
                firebase.firestore().collection('users').get().then((snapshot) => {
                    const users = snapshot.docs.map((user) => ({
                        ...user.data(),
                        userId: user.id,
                    }));
                    setAllUsers(users);

                    const loggedInUser = users.find(user => user.id === loggedInUserId);
                    console.log('loggerInUser sanu=', loggedInUser)
                    setCurrentUser(loggedInUser);
                });
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, [firebase]);

    return (
        <UserContext.Provider value={{ allUsers, currentUser }}>
            {children}
        </UserContext.Provider>
    );
};
