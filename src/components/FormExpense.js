import React, {useState, useEffect} from "react";
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from "./../elements/ElementsOfForm";
import Button from "./../elements/Button";
import {ReactComponent as IconPlus} from "./../images/plus.svg";
import SelectCategories from "./SelectCategories";
import DatePicker from "./DatePicker";
import fromUnixTime from "date-fns/fromUnixTime";
import getUnixTime from "date-fns/getUnixTime";
import addExpense from "../firebase/addExpense";
import {useAuth} from "./../context/AuthContext";
import Alert from "./../elements/Alert";
import { useNavigate } from "react-router-dom";
import editExpense from "../firebase/editExpense";

const FormExpense = ({expense}) => {
    const [inputDescription, changeInputDescription] = useState("");
    const [inputQuantity, changeInputQuantity] = useState("");
    const [category, changeCategory] = useState("Home");
    const [date, changeDate] = useState(new Date());
    const [alertStatus, changeAlertStatus] = useState(false);
    const [alert, changeAlert] = useState({});

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(expense){
            if(expense.data().uidUser === user.uid){
                changeCategory(expense.data().category);
                changeDate(fromUnixTime(expense.data().date));
                changeInputDescription(expense.data().description);
                changeInputQuantity(expense.data().quantity)
            } else {
                navigate("/ExpensesList")
            }
        }
    }, [expense, user, navigate]);

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name === "description"){
            changeInputDescription(e.target.value);
        } else if (e.target.name === "quantity") {
            changeInputQuantity(e.target.value.replace(/[^0-9.]/g, ""));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let quantity = parseFloat(inputQuantity).toFixed(2);

        if(inputDescription !== "" && inputQuantity !== ""){

            if(quantity){
                if(expense){
                    editExpense({
                        id: expense.id,
                        category: category,
                        description: inputDescription,
                        quantity: quantity,
                        date: getUnixTime(date)                        
                    }).then(() => {
                        navigate("/ExpensesList")
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    addExpense({
                        category: category,
                        description: inputDescription,
                        quantity: quantity,
                        date: getUnixTime(date),
                        uidUser: user.uid
                    })
                    .then(() => {
                        changeCategory("Home");
                        changeInputDescription("");
                        changeInputQuantity("");
                        changeDate(new Date());
    
                        changeAlertStatus(true);
                        changeAlert({type: "true", message:"The information was successfully added"});
                    })
                    .catch(() => {
                        changeAlertStatus(true);
                        changeAlert({type: "error", message:"The was an issue sending the information."});
                    })
                }
                
            } else {
                changeAlertStatus(true);
                changeAlert({type: "error", message:"The quantity is not valid"});
            }            
        } else {
            changeAlertStatus(true);
            changeAlert({type: "error", message:"Missing information"})
        }

        
    }

    return ( 
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategories
                    category={category}
                    changeCategory={changeCategory}
                />
                <DatePicker date={date} changeDate={changeDate}/>
            </ContenedorFiltros>

            <div>
                <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="description"
                    value={inputDescription}
                    onChange={handleChange}
                />
                <InputGrande
                    type="text"
                    name="quantity"
                    id="quantity"
                    placeholder="$0.00"
                    value={inputQuantity}
                    onChange={handleChange}
                />
            </div>
            <ContenedorBoton>
                <Button as="button" primario conIcono type="submit">
                   {expense ? "Edit Expense" : "Add Expense"} <IconPlus/>
                </Button>
            </ContenedorBoton>
            <Alert
                type={alert.type}
                message={alert.message}
                alertStatus={alertStatus}
                changeAlertStatus={changeAlertStatus}
            />
        </Formulario>
     );
}
 
export default FormExpense;
