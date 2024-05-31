import { useEffect, useState } from "react";
import useExpensesByMonth from "./useExpensesByMonth";

const useExpensesByCategory = () => {
    const [expensesByCategory, changeExpensesByCategory] = useState([]);
    const expenses = useExpensesByMonth();

    useEffect(() => {
        const expensesSum = expenses.reduce((result, actual) => {
            const actualCategory = actual.category;
            const actualQuantity = actual.quantity;
    
            result[actualCategory] += actualQuantity;
    
            return result;
        }, {
            "Food": 0,
            "Payments": 0,
            "Home": 0,
            "Fare fees": 0,
            "Clothing": 0,
            "Health and Hygiene": 0,
            "Shopping": 0,
            "Entertainment": 0
        });
    
        changeExpensesByCategory(Object.keys(expensesSum).map((element) => {
            return {category: element, quantity:expensesSum[element]}
        }));
    }, [expenses, changeExpensesByCategory]);
    
    return expensesByCategory;
}
 
export default useExpensesByCategory;