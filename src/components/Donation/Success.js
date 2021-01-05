import React, {useEffect, useState} from 'react';
import firebase from "../../firebase/config";
import {Link} from "react-router-dom";
import NavBar from "../Home/NavBar";
import Contact from "../Contact";

const Success = () => {

        const [userState, setUserState] = useState(null);

        const logOut = () => {
            firebase.logOut();
            setUserState(null);
        };

        useEffect(() => {
            firebase.getUserState().then(user => {
                if (user) {
                    setUserState(user);
                }
            })
        });

        if (userState === null) {
            return <>
                <h2>Dziękujemy za przesłanie formularza Na maila prześlemy wszelkie informacje o odbiorze.</h2>
            </>
        } else {
            return <>
                <div className="successContainer">
                    <div className="mainStepsContainer">
                        <ul className="login">
                            <li>Cześć {userState.email}!</li>
                            <li><Link to="/donation">Oddaj rzeczy</Link></li>
                            <li><Link to="/logout" onClick={logOut}>Wyloguj</Link></li>
                        </ul>
                        <NavBar/>
                        <div className="mainForm">
                            <div className="backgroundImage"></div>
                            <div className="textContent">
                                <h1 className="charityTitle">Oddaj rzeczy, których już nie chcesz <br/> POTRZEBUJĄCYM</h1>
                                <div className="decoration"></div>
                                <h2 className="steps">Wystarczą 4 proste kroki:</h2>
                                <div className="stepsContainer">
                                    <div className="stepOne">
                                        <h3 className="stepTitle">1</h3>
                                        <p className="stepText">Wybierz <br/> rzeczy</p>
                                        <div className="stepOneBorder"></div>
                                    </div>
                                    <div className="stepTwo">
                                        <h3 className="stepTitle">2</h3>
                                        <p className="stepText">Spakuj je <br/> w worki</p>
                                        <div className="stepTwoBorder"></div>
                                    </div>
                                    <div className="stepThree">
                                        <h3 className="stepTitle">3</h3>
                                        <p className="stepText">Wybierz <br/> fundację</p>
                                        <div className="stepThreeBorder"></div>
                                    </div>
                                    <div className="stepFour">
                                        <h3 className="stepTitle">4</h3>
                                        <p className="stepText">Zamów <br/> kuriera</p>
                                        <div className="stepFourBorder"></div>
                                    </div>
                                </div>
                                <div className="successBackground"></div>
                            </div>
                        </div>
                        <div className="successMessageContainer">
                            <h2 className="successMessage">Dziękujemy za przesłanie formularza</h2>
                            <h2 className="successMessage">Na maila prześlemy wszelkie</h2>
                            <h2 className="successMessage">informacje o odbiorze.</h2>
                        </div>
                        <div className="successDecoration"></div>
                        <Link className="mainPage" to="/">Strona główna</Link>
                    </div>
                </div>
                <Contact/>
            </>
        }
    }
;

export default Success;
