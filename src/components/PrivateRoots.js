import React from "react";
import { useAuth } from "../context/AuthContext";
import {Navigate} from "react-router-dom";

const PrivateRoots = ({children}) => {
    const {user} = useAuth();

    if(user){
        return children;
    } else {
        return <Navigate replace to="/LoggingIn" />
    }
}
 
export default PrivateRoots;