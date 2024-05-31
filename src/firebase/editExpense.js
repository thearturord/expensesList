import {db} from "./firebaseconfig";
import { doc , updateDoc } from "firebase/firestore";

const editExpense = async({id, category, description, quantity, date}) => {
    const document = doc(db, "expenses", id);    
    return await updateDoc(document, {
        category: category,
        description: description,
        quantity: Number(quantity),
        date: date
    });
}

export default editExpense;