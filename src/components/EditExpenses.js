import React from "react";
import {Header, Titulo} from "../elements/Header";
import { Helmet } from "react-helmet";
import BtnReturn from "../elements/BtnReturn";
import ToolBarTotal from "./ToolBarTotal";
import FormExpense from "./FormExpense";
import {useParams} from "react-router-dom";
import useObtainExpense from "../hooks/useObtainExpense";

const ExpenseEdit = () => {

    const {id} = useParams();
    const [expense] = useObtainExpense(id);
    

    return ( 
        <>
            <Helmet>
                <title>Edit Expenses</title>
            </Helmet>

            <Header>
                <BtnReturn ruta="/ExpensesList"/>
                <Titulo>Edit Expenses</Titulo>                
            </Header>

            <FormExpense expense={expense} />

            <ToolBarTotal/>
        </>
        );
}
 
export default ExpenseEdit;