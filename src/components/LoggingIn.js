import React, {useState} from "react";
import { Helmet } from "react-helmet";
import {Header, Titulo, ContenedorHeader} from "./../elements/Header";
import Button from "./../elements/Button";
import {Formulario, Input, ContenedorBoton} from "./../elements/ElementsOfForm";
import { ReactComponent as SvgLogin } from "./../images/login.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {auth} from "./../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Alert from "../elements/Alert";

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 200px */
    margin-bottom: 1.25rem; /* 20px */
`;

const LoggingIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertStatus, changeAlertStatus] = useState(false);
    const [alert, changeAlert] = useState({});

    const handleChange = (e) => {
        if(e.target.name === "email"){
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
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

        if(email === "" || password === ""){            
            changeAlertStatus(true);
            changeAlert({
                type: "error",
                message: "Empty inputs, please verify"
            })
            return;
        }

        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/")
        } catch(error){
            changeAlertStatus(true);

            let message;
            switch(error.code){
                case "auth/wrong-password":
                    message= "the password is not correct"
                    break;
                case 'auth/user-not-found':
                    message = 'This email address is invalid.'
                break;
                default:
                    message = 'Error while accessing your account, please contact us for further support.'
                break;
            }

            changeAlert({type: "error", message: message})
        }
    }

    return ( 
        <>
            <Helmet>
                <title>Log In</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Log In</Titulo>
                    <div>
                        <Button to="/UserRegister">Register</Button>
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
              
                <ContenedorBoton>
                    <Button as="button" primario type="submit">Log In</Button>
                </ContenedorBoton>
                
            </Formulario>

            <Alert
               type={alert.type}
               message={alert.message}
               alertStatus={alertStatus}
               changeAlertStatus={changeAlertStatus}
            />
        </>
        );
}
 
export default LoggingIn;