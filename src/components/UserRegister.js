import React, {useState} from "react";
import { Helmet } from "react-helmet";
import {Header, Titulo, ContenedorHeader} from "./../elements/Header";
import Button from "./../elements/Button";
import {Formulario, Input, ContenedorBoton} from "./../elements/ElementsOfForm";
import { ReactComponent as SvgLogin } from "./../images/registro.svg";
import styled from "styled-components";
import {auth} from "./../firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Alert from "../elements/Alert";

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const UserRegister = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [alertStatus, changeAlertStatus] = useState(false);
    const [alert, changeAlert] = useState({});

    const handleChange = (e) => {
        switch(e.target.name){
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "password2":
                setPassword2(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        changeAlertStatus(false);
        changeAlert({});

        // check email address
        const regularExpression = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!regularExpression.test(email)){
            changeAlertStatus(true);
            changeAlert({
                type: "error",
                message: "please use a valid email"
            })
            return;
        }

        if(email === "" || password === "" || password2 === ""){            
            changeAlertStatus(true);
            changeAlert({
                type: "error",
                message: "Empty inputs, please verify"
            })
            return;
        }

        if(password !== password2){            
            changeAlertStatus(true);
            changeAlert({
                type: "error",
                message: "password did not match"
            })
            return;
        }

        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/")
        } catch(error){
            changeAlertStatus(true);

            let message;
            switch(error.code){
                case "auth/invalid-password":
                    message= "the password needs to be at least 6 characters long"
                    break;
                case 'auth/email-already-in-use':
                    message = 'This email address is already in use by another user.'
                break;
                case 'auth/invalid-email':
                    message = 'Invalid email address.'
                break;
                default:
                    message = 'Error while creating account, please contact us for further support.'
                break;
            }

            changeAlert({type: "error", message: message})
        }
    }

    return ( 
    <>
        <Helmet>
            <title>Create Account</title>
        </Helmet>

        <Header>
            <ContenedorHeader>
                <Titulo>Create Account</Titulo>
                <div>
                    <Button to="/LoggingIn">Log in</Button>
                </div>
            </ContenedorHeader>
        </Header>

        <Formulario onSubmit={handleSubmit}>
            <Svg/>
            <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={handleChange}
            />
            <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
            />
            <Input
                type="password"
                name="password2"
                placeholder="Repeat password"
                value={password2}
                onChange={handleChange}
            />

            <ContenedorBoton>
                <Button as="button" primario type="submit">Create Account</Button>
            </ContenedorBoton>

            <Alert
               type={alert.type}
               message={alert.message}
               alertStatus={alertStatus}
               changeAlertStatus={changeAlertStatus}
            />
            
        </Formulario>
    </> 
    );
}
 
export default UserRegister;