import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";
import { useEffect } from "react";



export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
      //create user with email
      const userCreate = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

       //sign in user
       const userSignIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
      //google sign in
      const googleSignIn = () =>{
        return signInWithPopup(auth, googleProvider)
     }


     //sign out user
     const userSignOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false);
          setUser(user);
          
          // ...
        } else {
          // User is signed out
          // ...
          setLoading(false);
          setUser(null);
        }
      });

      return () =>{
        unsubscribe();
      }
    },[])

    
    const userInfo = {userCreate, userSignIn, userSignOut, user, setUser, googleSignIn, loading}
    

    return (
        <>
         <AuthContext.Provider value={userInfo}>
            {children}
         </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;