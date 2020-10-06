import React, {useEffect, useState} from 'react';
import firebase from "../../firebase/config";
import {Link} from "react-router-dom";
import NavBar from "../Home/NavBar";
import Contact from "../Contact";

const StepThree = (props) => {

        const goBack = (e) => {
            e.preventDefault();
            props.prevStep();
        };

        const [currentCities, setCities] = useState(props.cities);
        const [currentGroups, setCurrentGroups] = useState(props.groups);
        const [userState, setUserState] = useState(null);

        const handleCityChange = (e) => {
            props.handleStepThreeChange(e.target.value);

            let currentCity = currentCities.get(e.target.value);

            for (let [key, value] of currentCities) {
                if (value !== currentCity) {
                    value.selected = false;
                }
            }

            currentCity.selected = true;
            setCities(props.cities.set(e.target.value, currentCity));
        };

        const handleChooseHelp = (e, key) => {
            props.chooseHelp(key, e.target.checked);

            let currentGroup = currentGroups.get(key);
            if (currentGroup.checked === false) {
                currentGroup.checked = true;
            } else {
                currentGroup.checked = false;
            }

            setCurrentGroups(props.groups.set(key, currentGroup));
        };

        const ifCitiesChecked = () => {
            for (let [key, value] of currentCities) {
                if (value.selected === true) {
                    return true
                }
            }
        };

        const ifGroupsChecked = () => {
            for (let [key, value] of currentGroups) {
                if (value.checked === true) {
                    return true
                }
            }
        };

        const moveOn = (e) => {
            if (ifCitiesChecked() && (props.values.organizationName !== "" || ifGroupsChecked())) {
                e.preventDefault();
                props.nextStep();
            } else {
                alert("Wybierz lokalizację oraz komu chcesz pomóc - grupę lub wpisz własną nazwę organizacji")
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
                <p>Lokalizacja:</p>

                <select name="localization" onChange={(e) => handleCityChange(e)}>
                    <option>-- wybierz --</option>
                    {[...currentCities].map(([key, value]) => {
                        return <option value={key} key={key} selected={value.selected}>{key}</option>
                    })}
                </select>

                <p>Komu chcesz pomóc?</p>
                <br/>
                {[...currentGroups].map(([key, value]) => {
                    return <label key={key}>
                        <input type="checkbox" name={key} key={key} checked={value.checked}
                               onChange={(e) => handleChooseHelp(e, key)}/>
                        {value.name}
                    </label>
                })}
                <br/>
                <br/>
                <br/>
                <p>Wpisz nazwę konkretnej organizacji (opcjonalnie)</p>
                <label>
                    <input type="text" name="organizationName" value={props.values.organizationName}
                           onChange={(e) => props.handleOrganization(e.target.value)}/>
                </label>
                <br/>
                <button onClick={moveOn}>DALEJ</button>
                <button onClick={goBack}>WSTECZ</button>
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
                        <p className="labelStepThreeText">Jeśli wiesz komu chcesz pomóc, możesz wpisać nazwę tej organizacji w
                            wyszukiwarce. Możesz też filtrować organizacje po ich lokalizacji bądź celu ich pomocy.</p>
                    </div>
                </div>
                <div className="stepThreeForm">
                    <div className="stepThreeFormBackground"></div>
                    <div className="stepThreeFormCurrentStep">Krok 3/4</div>
                    <p className="stepThreeLocalization">Lokalizacja:</p>

                    <select name="localization" className="stepThreeFormSelect" onChange={(e) => handleCityChange(e)}>
                        <option>-- wybierz --</option>
                        {[...currentCities].map(([key, value]) => {
                            return <option value={key} key={key} selected={value.selected}>{key}</option>
                        })}
                    </select>

                    <p className="stepThreeChooseHelp">Komu chcesz pomóc?</p>
                    <br/>
                    {[...currentGroups].map(([key, value]) => {
                        return <label key={key} className={"stepThreeContainer"+key}>
                            <input type="checkbox" className={"stepThree"+key} name={key} key={key} checked={value.checked}
                                   onChange={(e) => handleChooseHelp(e, key)}/>
                            {value.name}
                        </label>
                    })}
                    <br/>
                    <br/>
                    <br/>
                    <p className="stepThreeOrganizationName">Wpisz nazwę konkretnej organizacji (opcjonalnie)</p>
                    <label className="stepThreeOrganizationNameContainer">
                        <input type="text" name="organizationName" className="stepThreeOrganizationNameInput" value={props.values.organizationName}
                               onChange={(e) => props.handleOrganization(e.target.value)}/>
                    </label>
                    <br/>
                    <button className="stepThreeBtn" onClick={goBack}>WSTECZ</button>
                    <button className="stepThreeBtn" onClick={moveOn}>DALEJ</button>
                </div>
                <Contact/>
            </>
        }
    }
;

export default StepThree;
