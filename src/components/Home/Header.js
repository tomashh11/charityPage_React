import React, {useEffect, useState} from 'react';
import NavBar from './NavBar';
import {Link} from "react-router-dom";
import firebase from "../../firebase/config";

const Header = () => {

        const [userState, setUserState] = useState(null);

        useEffect(() => {
            firebase.getUserState().then(user => {
                if (user) {
                    setUserState(user);
                }
            })
        });

        const logOut = () => {
            firebase.logOut();
            setUserState(null);
        };

        const checkUserLoggedIn = () => {
            alert("Najpierw musisz się zalogować!")
        };

        if (userState === null) {
            return <>
                <div className="container headerContainer" id="start">
                    <ul className="login">
                        <li><Link to="/login">Zaloguj</Link></li>
                        <li><Link to="/registration">Załóż konto</Link></li>
                    </ul>
                    <NavBar/>
                    <div className="slogan">
                        <div className="text">
                            <p>Zacznij pomagać! <br/> Oddaj niechciane rzeczy w zaufane ręce</p>
                        </div>
                        <div className="decoration"></div>
                        <div className="options">
                            <Link className="thingsLink" onClick={() => checkUserLoggedIn()} to="/login"> oddaj<br/> rzeczy</Link>
                            <Link className="charityLink" onClick={() => checkUserLoggedIn()} to="/login"> zorganizuj<br/> zbiórkę</Link>
                        </div>
                    </div>
                </div>
            </>
        } else {
            return <>
                <div className="container headerContainer" id="start">
                    <ul className="login">
                        <li>Cześć {userState.email}!</li>
                        <li><Link to="/donation">Oddaj rzeczy</Link></li>
                        <li><Link to="/logout" onClick={logOut}>Wyloguj</Link></li>
                    </ul>
                    <NavBar/>
                    <div className="slogan">
                        <div className="text">
                            <p>Zacznij pomagać! <br/> Oddaj niechciane rzeczy w zaufane ręce</p>
                        </div>
                        <div className="decoration"></div>
                        <div className="options">
                            <Link className="thingsLink" to="/donation"> oddaj<br/> rzeczy</Link>
                            <Link className="charityLink" to="/collection"> zorganizuj<br/> zbiórkę</Link>
                        </div>
                    </div>
                </div>
            </>
        }
    }
;

export default Header;