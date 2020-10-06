import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import NavBar from "../Home/NavBar";
import firebase from "../../firebase/config";
import Contact from "../Contact";

const StepTwo = (props) => {

    const goBack = (e) => {
        e.preventDefault();
        props.prevStep();
    };

    const [currentOptionsMap, setCurrentOptionsMap] = useState(props.optionsMap);
    const [userState, setUserState] = useState(null);

    const handleOptionChange = (e) => {
        props.handleStepTwoChange(e.target.value);
        let currentOption = currentOptionsMap.get(e.target.value);

        for (let [key, value] of currentOptionsMap) {
            if (value !== currentOption) {
                value.selected = false;
            }
        }

        currentOption.selected = true;
        setCurrentOptionsMap(props.optionsMap.set(e.target.value, currentOption));
    };

    const checkIfCanGoToNextStep = () => {
        for (let [key, value] of currentOptionsMap) {
            if (value.selected === true) {
                return true;
            }
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

    const moveOn = (e) => {
        if (checkIfCanGoToNextStep()) {
            e.preventDefault();
            props.nextStep();
        } else {
            alert("Wybierz jedną z opcji!")
        }
    };

    if (userState === null) {
        return <>
            <ul className="login">
                <li>Cześć!</li>
                <li><Link to="/donation">Oddaj rzeczy</Link></li>
                <li><Link to="/logout" onClick={logOut}>Wyloguj</Link></li>
            </ul>
            <NavBar/>
            <p>Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy:</p>

            <label>Liczba 60l worków:

                <select name="numberOfBags" onChange={(e) => handleOptionChange(e)}>
                    <option>--- wybierz ---</option>
                    {[...currentOptionsMap].map(([key, value]) => {
                        return <option value={key} selected={value.selected} key={key}>{value.numberOfBags}</option>
                    })}
                </select>
            </label>

            <button onClick={goBack}>WSTECZ</button>
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
                    <p className="labelText">Wszystkie rzeczy do oddania zapakuj w 60l worki. Dokładną instrukcję jak poprawnie spakować rzeczy znajdziesz TUTAJ.</p>
                </div>
            </div>
            <div className="stepTwoForm">
                <div className="stepTwoFormBackground"></div>
                <div className="stepTwoFormCurrentStep">Krok 2/4</div>
                <h2 className="stepTwoFormTitle">Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy:</h2>

                <label className="stepTwoFormContainer">Liczba 60l worków:

                    <select name="numberOfBags" className="stepTwoFormSelect" onChange={(e) => handleOptionChange(e)}>
                        <option>--- wybierz ---</option>
                        {[...currentOptionsMap].map(([key, value]) => {
                            return <option value={key} selected={value.selected} key={key}>{value.numberOfBags}</option>
                        })}
                    </select>
                </label>

                <button className="stepTwoFormBtn" onClick={goBack}>WSTECZ</button>
                <button className="stepTwoFormBtn" onClick={moveOn}>DALEJ</button>
            </div>
            <Contact/>
        </>
    }
};

export default StepTwo;
