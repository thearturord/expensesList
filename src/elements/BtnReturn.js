import React from "react";
import styled from "styled-components";
import {ReactComponent as IconArrow} from "./../images/flecha.svg"
import {useNavigate} from 'react-router-dom';

const Btn = styled.button`
    display: block;
    width: 3.12rem; /* 50px */
    height: 3.12rem; /* 50px */
    line-height: 3.12rem; /* 50px */
    text-align: center;
    margin-right: 1.25rem; /* 20px */
    border: none;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.31rem; /* 5px */
    cursor: pointer;
 
    @media(max-width: 60rem){ /* 950px */
        width: 2.5rem; /* 40px */
        height: 2.5rem; /* 40px */
        line-height: 2.5rem; /* 40px */
    }
`;
 
const Icono = styled(IconArrow)`
    width: 50%;
    height: auto;
    fill: #fff;
`;

const BtnReturn = ({ruta = '/'}) => {
	const navigate = useNavigate();

	return (
		<Btn onClick={() => navigate(ruta)}><Icono /></Btn>
	);
}
 
export default BtnReturn;