import { createContext, useState, useEffect } from "react";
import firebase from "firebase";

export const PostContext = createContext(null);

function Post({ children }) {
    const [postDetails, setPostDetails] = useState()
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('products').get().then((snapshot) => {
            const allPost = snapshot.docs.map((product) => {
                return {
                    ...product.data(),
                    id: product.id,
                }
            })
            console.log('all post:', allPost);
            setAllProducts(allPost);

        })
    }, [])

    return (
        <PostContext.Provider value={{ postDetails, setPostDetails, allProducts, setAllProducts }}>
            {children}
        </PostContext.Provider>
    )
}

export default Post;