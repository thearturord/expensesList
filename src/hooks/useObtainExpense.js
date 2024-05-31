import {useEffect, useState} from "react";
import { db } from "../firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";

const useObtainExpense = (id) => {
    const navigate = useNavigate();
    const [expense, changeExpense] = useState("");

    useEffect(() => {

        const obtainExpense = async() => {
            const documento = await getDoc(doc(db, "expenses", id));
            
            if(documento.exists){
                changeExpense(documento);
            } else {
                navigate("/ExpensesList")
            }
        }

        obtainExpense();

    }, [navigate, id])

    return [expense];
}
 
export default useObtainExpense;