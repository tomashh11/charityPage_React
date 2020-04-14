import React from 'react';
import NavBar from './NavBar';
import {Link} from "react-router-dom";


const Header = () => {
    return <>
        <div className="container headerContainer" id="start">
            <ul className="login">
                <li><Link to="/login">Zaloguj</Link></li>
                <li><Link to="/registration">Załóż konto</Link></li>
            </ul>
            <NavBar />
            <div className="slogan">
                <div className="text">
                    <p>Zacznij pomagać! <br/> Oddaj niechciane rzeczy w zaufane ręce</p>
                </div>
                <div className="decoration"></div>
                <ul className="options">
                    <li><Link to="/donation"> oddaj<br/> rzeczy</Link></li>
                    <li><Link to="/collection"> zorganizuj<br/> zbiórkę</Link></li>
                </ul>
            </div>
        </div>
    </>
};

export default Header;