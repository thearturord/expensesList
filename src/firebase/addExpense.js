import {db} from "./firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const addExpense = ({category, description, quantity, date, uidUser}) => {
   return addDoc(collection(db, "expenses"), {
        category: category,
        description: description,
        quantity: Number(quantity),
        date: date,
        uidUser: uidUser
    });
}

export default addExpense;