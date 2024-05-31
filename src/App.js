import React from "react";
import { Helmet } from "react-helmet";
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from "./elements/Header";
import Button from "./elements/Button";
import ButtonLogOut from "./elements/ButtonLogOut";
import FormExpense from "./components/FormExpense";
import ToolBarTotal from "./components/ToolBarTotal";

const App = () => {
  return (
      <>
        <Helmet>
          <title>Add Expenses</title>
        </Helmet>

        <Header>
          <ContenedorHeader>
            <Titulo>Add Expense</Titulo>
            <ContenedorBotones>
              <Button to="ExpensesByCategory">Categories</Button>
              <Button to="ExpensesList">List of Expenses</Button>
              <ButtonLogOut/>
            </ContenedorBotones>
          </ContenedorHeader>
        </Header>

        <FormExpense/>

        <ToolBarTotal/>
      </> 
     );
}
 
export default App;