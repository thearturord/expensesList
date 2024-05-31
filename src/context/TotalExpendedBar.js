import React, {useState, useEffect, useContext} from "react";
import useExpensesByMonth from "../hooks/useExpensesByMonth";

const TotalExpendedContext = React.createContext();

const useTotalExpended = () => useContext(TotalExpendedContext)

const TotalExpendedProvider = ({children}) => {
    const [total, changeTotal] = useState(0);
    const expenses = useExpensesByMonth();

    useEffect(() => {
        let sum = 0;
        expenses.forEach((expense) => {
            sum += expense.quantity;
        });

        changeTotal(sum);
    }, [expenses]);

    return(
        <TotalExpendedContext.Provider value={{total: total}}>
            {children}
        </TotalExpendedContext.Provider>
    )
}

export {useTotalExpended, TotalExpendedProvider};