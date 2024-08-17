import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import auth from "../firebase/firebase.config";



export const AuthContext = createContext(null);

const AuthProvider = () => {

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

    
    return (
        <div>
            
        </div>
    );
};

export default AuthProvider;