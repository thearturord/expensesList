import React from "react";
import {Header, Titulo} from "./../elements/Header";
import { Helmet } from "react-helmet";
import BtnReturn from "../elements/BtnReturn";
import ToolBarTotal from "./ToolBarTotal";
import useObtainExpenses from "./../hooks/useObtainExpenses";
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from "./../elements/ListElements";
import IconCategory from "./../elements/IconCategory";
import convertToCurrency from "./../functions/convertToCurrency";
import {ReactComponent as IconEdit} from "./../images/editar.svg";
import {ReactComponent as IconDelete} from "./../images/borrar.svg";
import {Link} from "react-router-dom";
import Button from "./../elements/Button";
import {format, fromUnixTime} from "date-fns";
import deleteExpense from "../firebase/deleteExpense";

const ExpensesList = () => {
    const [expenses, obtainMoreExpenses, moreToLoad] = useObtainExpenses();


    const formatDate = (date) => {
        return format(fromUnixTime(date), "dd MMMM yyyy")
    }

    const dateIsEqual = (expenses, index, expense) => {
        if(index !== 0){
            const actualDate = formatDate(expense.date);
            const formerExpenseDate = formatDate(expenses[index -1].date);

            if(actualDate === formerExpenseDate){
                return true;
            } else {
                return false;
            }
        }
    }


    return (  
    <>
        <Helmet>
            <title>Expenses List</title>
        </Helmet>

        <Header>
            <BtnReturn/>
            <Titulo>Expenses List</Titulo>                
        </Header>

        <Lista>
            {expenses.map((expense, index) => {
                return( 
                    <div key={expense.id}>
                        {!dateIsEqual(expenses, index, expense) && <Fecha>{formatDate(expense.date)}</Fecha>}                        
                        <ElementoLista key={expense.id}>
                            <Categoria>
                                <IconCategory id={expense.category} />
                            {expense.category} 
                            </Categoria>

                            <Descripcion>
                                {expense.description}
                            </Descripcion>
                            <Valor>{convertToCurrency(expense.quantity)}</Valor>

                            <ContenedorBotones>
                                <BotonAccion as={Link} to={`/EditExpenses/${expense.id}`}>
                                    <IconEdit />
                                </BotonAccion>
                                <BotonAccion onClick={() => deleteExpense(expense.id)} >
                                    <IconDelete/>
                                </BotonAccion>
                            </ContenedorBotones>
                        </ElementoLista>
                    </div >
                );
            })}

            {moreToLoad &&
                <ContenedorBotonCentral>
                <BotonCargarMas onClick={() => obtainMoreExpenses()}>Load more</BotonCargarMas>
            </ContenedorBotonCentral>
            }            

            {expenses.length === 0 && 
                <ContenedorSubtitulo>
                    <Subtitulo>There is no information to display</Subtitulo>
                    <Button as={Link} to="/">Add Expense</Button> 
                </ContenedorSubtitulo>
            }
        </Lista>

        <ToolBarTotal/>
    </>  
    );
}
 
export default ExpensesList;