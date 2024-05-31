import {useState, useEffect} from "react";
import { db } from "../firebase/firebaseconfig";
import { useAuth } from "../context/AuthContext";
import { collection, onSnapshot, query, orderBy, where, limit, startAfter } from "firebase/firestore";

const useObtainExpenses = () => {
    const {user} = useAuth();
    const [expenses, changeExpenses] = useState([]);
    const [lastExpense, changeLastExpense] = useState(null);
    const [moreToLoad, changeMoreToLoad] = useState(false);

    const obtainMoreExpenses = () => {

        const consult = query(
            collection(db, "expenses"), 
            where("uidUser", "==", user.uid),
            orderBy("date", "desc"),
            limit(10),
            startAfter(lastExpense)
        );

       onSnapshot(consult, (snapshot) => {
            if(snapshot.docs.length > 0){
                changeLastExpense(snapshot.docs[snapshot.docs.length -1]);

                changeExpenses(expenses.concat(snapshot.docs.map((expense) => {
                    return {...expense.data(), id: expense.id}
                })));
            } else {
                changeMoreToLoad(false);
            }
        }, error => {console.log(error)});
    }

    useEffect(() => {
        const consult = query(
            collection(db, "expenses"), 
            where("uidUser", "==", user.uid),
            orderBy("date", "desc"),
            limit(10)
        );

        const unsuscribe = onSnapshot(consult, (snapshot) => {
            if(snapshot.docs.length > 0){
                changeLastExpense(snapshot.docs[snapshot.docs.length -1]);
                changeMoreToLoad(true);
            } else {
                changeMoreToLoad(false);
            }

            changeExpenses(snapshot.docs.map((expense) => {
                return {...expense.data(), id: expense.id}
            }));
        });

        return unsuscribe;
    }, [user]);

    return [expenses, obtainMoreExpenses, moreToLoad];
}
 
export default useObtainExpenses;