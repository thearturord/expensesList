import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elements/Contenedor';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditExpenses from "./components/EditExpenses";
import ExpensesByCategory from "./components/ExpensesByCategory";
import ExpensesList from "./components/ExpensesList";
import LoggingIn from "./components/LoggingIn";
import UserRegister from "./components/UserRegister";
import {Helmet} from "react-helmet";
import favicon from "./images/logo.png";
import Background from './elements/Background';
import { AuthProvider } from './context/AuthContext';
import PrivateRoots from "./components/PrivateRoots";
import {TotalExpendedProvider} from "./context/TotalExpendedBar";

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>

    <AuthProvider>
      <TotalExpendedProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path="/LoggingIn" element={<LoggingIn />}/>
              <Route path="/UserRegister" element={<UserRegister />}/>

              <Route path="/ExpensesByCategory" element={
                  <PrivateRoots>
                    <ExpensesByCategory />
                  </PrivateRoots>
              }/>

              <Route path="/ExpensesList" element={
                  <PrivateRoots>
                    <ExpensesList />
                  </PrivateRoots>
              }/>

              <Route path="/EditExpenses/:id" element={
                  <PrivateRoots>
                    <EditExpenses />
                  </PrivateRoots>
              }/>

              <Route path="/" element={
                  <PrivateRoots>
                    <App />
                  </PrivateRoots>
              }/>
            </Routes>
          </Contenedor>    
        </BrowserRouter>
      </TotalExpendedProvider>
    </AuthProvider>

    <Background/>
  </>
);

