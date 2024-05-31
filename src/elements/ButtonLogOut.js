import React from "react";
import {ReactComponent as IconLogOut} from "./../images/log-out.svg";
import Button from "./Button";
import { auth } from "../firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ButtonLogOut = () => {
    const navigate = useNavigate();

    const logOut = async () => {
        try{
            await signOut(auth);
            navigate("/LoggingIn")
        } catch(error) {
            console.log(error)
        }
       
    }

    return ( 
        <Button iconoGrande as="button" onClick={logOut}>
            <IconLogOut/>
        </Button>
     );
}
 
export default ButtonLogOut;