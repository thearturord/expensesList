import React from "react";
import {Header, Titulo} from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnReturn from "../elements/BtnReturn";
import ToolBarTotal from "./ToolBarTotal";
import useExpensesByCategory from "./../hooks/useExpensesByCategory";
import {ListaDeCategorias, ElementoListaCategorias, Categoria, Valor} from "./../elements/ListElements";
import IconCategory from "./../elements/IconCategory";
import convertToCurrency from "./../functions/convertToCurrency";

const ExpensesByCategory = () => {

    const expensesByCategory = useExpensesByCategory();

    console.log(expensesByCategory)

    return ( 
        <>
            <Helmet>
                <title>Expenses By Category</title>
            </Helmet>

            <Header>
                <BtnReturn/>
                <Titulo>Expenses By Category</Titulo>                
            </Header>

           <ListaDeCategorias>
                { expensesByCategory.map((element, index) => {
                    return(
                        <ElementoListaCategorias key={index}>
                            <Categoria>
                                <IconCategory id={element.category} />
                                    {element.category}                                
                            </Categoria>
                            <Valor>{convertToCurrency(element.quantity)}</Valor>
                        </ElementoListaCategorias>
                    );
                })}
           </ListaDeCategorias>

            <ToolBarTotal/>
        </> 
        );
}
 
export default ExpensesByCategory;