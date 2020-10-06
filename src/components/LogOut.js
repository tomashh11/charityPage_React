import React from 'react';
import {Link} from "react-router-dom";
import NavBar from "./Home/NavBar";

const LogOut = () => {

    return <>
        <div className="loginContainer container">
            <ul className="login">
                <li><Link to="/login">Zaloguj</Link></li>
                <li><Link to="/registration">Załóż konto</Link></li>
            </ul>
            <NavBar/>
            <div className="panelLogOut">
                <h2>Wylogowanie nastąpiło pomyślnie</h2>
                <div className="panelLoginDecoration"></div>
                <Link className="logOutLink" to="/">Strona główna</Link>
            </div>
        </div>
    </>
};

export default LogOut;