import React, {useEffect, useState} from 'react';
import Contact from "../Contact";
import NavBar from "../Home/NavBar";
import firebase from "../../firebase/config";
import {Link} from "react-router-dom";

const StepOne = (props) => {

        const [currentStepOneMap, setCurrentStepOneMap] = useState(props.stateMap);
        const [userState, setUserState] = useState(null);

        const handleSelectChange = (e, inputKey) => {
            props.handleStepOneChange(e.target.value);
            let currentValue = currentStepOneMap.get(inputKey);

            for (let [key, value] of currentStepOneMap) {
                if (value !== currentValue) {
                    value.checked = false;
                }
            }
            ;

            currentValue.checked = true;
            setCurrentStepOneMap(props.stateMap.set(inputKey, currentValue));
        };

        const checkIfCanGoToNextStep = () => {
            for (let [key, value] of currentStepOneMap) {
                if (value.checked === true) {
                    return true
                }
            }
        };

        const moveOn = (e) => {
            if (checkIfCanGoToNextStep()) {
                e.preventDefault();
                props.nextStep();
            } else {
                alert("Wybierz jedną z opcji aby przejśc dalej!");
            }

        };

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
                <ul className="login">
                    <li>Cześć!</li>
                    <li><Link to="/donation">Oddaj rzeczy</Link></li>
                    <li><Link to="/logout" onClick={logOut}>Wyloguj</Link></li>
                </ul>
                <NavBar/>
                <p>Zaznacz co chcesz oddać:</p>

                {[...currentStepOneMap].map(([key, value]) => {
                    return <div key={key}>
                        <label>
                            <input
                                type="radio"
                                name="chosenThing"
                                checked={value.checked}
                                value={value.text}
                                onChange={(e) => handleSelectChange(e, key)}/>
                            {value.text}
                        </label>
                    </div>
                })}
                <button onClick={moveOn}>DALEJ</button>
                <Contact/>
            </>
        } else {
            return <>
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
                    </div>
                    <div className="yellowLabel">
                        <div className="labelBackground"></div>
                        <h3 className="labelTitle">Ważne!</h3>
                        <p className="labelText">Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy wiedzieć
                            komu najlepiej je przekazać.</p>
                    </div>
                </div>
                <div className="stepOneForm">
                    <div className="stepOneFormBackground"></div>
                    <div className="stepOneFormCurrentStep">Krok 1/4</div>
                    <h2 className="stepOneFormTitle">Zaznacz co chcesz oddać:</h2>

                    {[...currentStepOneMap].map(([key, value]) => {
                        return <div key={key}>
                            <label className="stepOneFormContainer">
                                <input
                                    type="radio"
                                    name="chosenThing"
                                    className="stepOneFormInput"
                                    checked={value.checked}
                                    value={value.text}
                                    onChange={(e) => handleSelectChange(e, key)}/>
                                {value.text}
                            </label>
                        </div>
                    })}
                    <Link className="mainPage" to="/">Strona główna</Link>
                    <button onClick={moveOn}>DALEJ</button>
                </div>
                <Contact/>
            </>
        }
    }
;

export default StepOne;
