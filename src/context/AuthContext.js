import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";


const AuthContext = React.createContext();

// hook to access the context

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [user, changeUser] = useState();
    const [loading, changeLoading] = useState(true);

    // check 1 time if user is logged in
    useEffect(() => {
        // check user status with firebase
        const cancelSubscription = onAuthStateChanged(auth, (user) => {
            changeUser(user);
            changeLoading(false);
        });

        return cancelSubscription;
    }, []);

    return ( 
        <AuthContext.Provider value={{user: user}}>
            {!loading && children}
        </AuthContext.Provider>
     );
}
 
export {AuthProvider, AuthContext, useAuth};