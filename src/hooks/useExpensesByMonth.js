import {useState, useEffect} from "react";
import {db} from "./../firebase/firebaseconfig";
import { startOfMonth, endOfMonth , getUnixTime } from "date-fns";
import {useAuth} from "./../context/AuthContext";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";

const useExpensesByMonth = () => {
    const [expenses, changeExpenses] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const startMonth = getUnixTime(startOfMonth(new Date()));
        const endMonth = getUnixTime(endOfMonth(new Date()));

        if(user){
            const consult = query(
                collection(db, "expenses"),
                orderBy("date", "desc"),
                where("date", ">=", startMonth),
                where("date", "<=", endMonth),
                where("uidUser", "==", user.uid)
            );

            const unsuscribe = onSnapshot(consult, (snapshot) => {
                changeExpenses(snapshot.docs.map((document) => {
                    return {...document.data(), id: document.id}
                }))
            }, (error) => {console.log(error)})

            return unsuscribe;
        }        
    }, [user])

    return expenses;
}

export default useExpensesByMonth;