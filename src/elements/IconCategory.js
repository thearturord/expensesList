import React from "react";

import {ReactComponent as IconFood} from "./../images/cat_comida.svg";
import {ReactComponent as IconShopping} from "./../images/cat_compras.svg";
import {ReactComponent as IconPayments} from "./../images/cat_cuentas-y-pagos.svg";
import {ReactComponent as IconEntertainment} from "./../images/cat_diversion.svg";
import {ReactComponent as IconHome} from "./../images/cat_hogar.svg";
import {ReactComponent as IconClothing} from "./../images/cat_ropa.svg";
import {ReactComponent as IconHealthAndHygiene} from "./../images/cat_salud-e-higiene.svg";
import {ReactComponent as IconFareFees} from "./../images/cat_transporte.svg";

const IconCategory = ({id}) => {
    switch(id){
        case "Food":
            return <IconFood/>
        case "Payments":
            return <IconPayments/>
        case "Home":
            return <IconHome/>
        case "Fare fees":
            return <IconFareFees/>
        case "Clothing":
            return <IconClothing/>
        case "Health and Hygiene":
            return <IconHealthAndHygiene/>
        case "Shopping":
            return <IconShopping/>
        case "Entertainment":
            return <IconEntertainment/>
        default:
            break;
    }
}
 
export default IconCategory;