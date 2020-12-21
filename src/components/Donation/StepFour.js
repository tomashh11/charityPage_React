import React, {useEffect, useState} from 'react';
import firebase from "../../firebase/config";
import {Link} from "react-router-dom";
import NavBar from "../Home/NavBar";
import Contact from "../Contact";

const StepFour = (props) => {

        const [userState, setUserState] = useState(null);

        const validatePostcode = () => {
            const regExp = /^\d{2}(-\d{3})?$/;

            if (regExp.test(props.values.postCode)) {
                return true;
            } else {
                return false;
            }
        };

        const validatePhoneNumber = () => {
            if ((/^[0-9]+$/.test(props.values.phoneNumber)) && props.values.phoneNumber.length > 8) {
                return true;
            } else {
                return false;
            }
        };

        const moveOn = (e) => {
            if (validatePhoneNumber() && validatePostcode() && props.values.street.length > 1 && props.values.city.length > 1 && props.values.date !== "" && props.values.time !== "") {
                e.preventDefault();
                props.nextStep();
            } else {
                alert(`Uzupełnij brakujące pola!`);
            }
        };

        const goBack = (e) => {
            e.preventDefault();
            props.prevStep();
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
                <p>Podaj adres oraz termin odbioru rzeczy przez kuriera</p>
                <p>Adres odbioru:</p>
                <div>
                    <label>
                        Ulica<input type="text" name="street" value={props.values.street}
                                    onChange={(e) => props.handleStreet(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Miasto<input type="text" name="city" value={props.values.city}
                                     onChange={(e) => props.handleCity(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Kod pocztowy<input type="text" name="postCode" value={props.values.postCode}
                                           onChange={(e) => props.handlePostCode(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Numer telefonu<input type="text" name="phoneNumber" value={props.values.phoneNumber}
                                             onChange={(e) => props.handlePhoneNumber(e.target.value)}/>
                    </label>
                </div>
                <br/>
                <p>Termin odbioru:</p>
                <div>
                    <label>
                        Data<input type="date" name="date" value={props.values.date}
                                   onChange={(e) => props.handleDate(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Godzina<input type="time" name="time" value={props.values.time}
                                      onChange={(e) => props.handleTime(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Uwagi dla kuriera<input type="textarea" name="messageToCourier"
                                                value={props.values.messageToCourier}
                                                onChange={(e) => props.handleMessage(e.target.value)}/>
                    </label>
                </div>
                <br/>
                <button onClick={moveOn}>DALEJ</button>
                <button onClick={goBack}>WSTECZ</button>
            </>
        } else {
            return <>
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
                        </div>
                        <div className="yellowLabel">
                            <div className="labelBackground"></div>
                            <h3 className="labelTitle">Ważne!</h3>
                            <p className="labelStepFourText">Podaj adres oraz termin odbioru rzeczy.</p>
                        </div>
                    </div>
                    <div className="stepFourForm">
                        <div className="stepFourFormBackground"></div>
                        <div className="stepFourFormCurrentStep">Krok 4/4</div>
                        <p className="stepFourFormTitle">Podaj adres oraz termin odbioru rzeczy przez kuriera</p>
                        <p className="stepFourFormAddress">Adres odbioru:</p>
                        <div>
                            <label className="addressContainer">
                                Ulica<input type="text" name="street" className="stepFourInputStreet"
                                            value={props.values.street}
                                            onChange={(e) => props.handleStreet(e.target.value)}/>
                            </label>
                        </div>
                        <div>
                            <label className="addressContainer">
                                Miasto<input type="text" name="city" className="stepFourInputCity" value={props.values.city}
                                             onChange={(e) => props.handleCity(e.target.value)}/>
                            </label>
                        </div>
                        <div>
                            <label className="addressContainerPostCode">
                                <div className="stepFourPostCode">Kod pocztowy</div>
                                <input type="text" name="postCode" className="stepFourInputPostCode"
                                       value={props.values.postCode}
                                       onChange={(e) => props.handlePostCode(e.target.value)}/>
                            </label>
                        </div>
                        <div>
                            <label className="addressContainerPhoneNumber">
                                <div className="stepFourPhoneNumber">Numer telefonu</div>
                                <input type="text" name="phoneNumber" className="stepFourInputPhoneNumber"
                                       value={props.values.phoneNumber}
                                       onChange={(e) => props.handlePhoneNumber(e.target.value)}/>
                            </label>
                        </div>
                        <br/>
                        <p className="stepFourDateOfReceipt">Termin odbioru:</p>
                        <div>
                            <label className="stepFourDateOfReceiptDateContainer">
                                Data<input type="date" name="date" className="stepFourDateOfReceiptDateInput"
                                           value={props.values.date}
                                           onChange={(e) => props.handleDate(e.target.value)}/>
                            </label>
                        </div>
                        <div>
                            <label className="stepFourDateOfReceiptTimeContainer">
                                Godzina<input type="time" name="time" className="stepFourDateOfReceiptTimeInput"
                                              value={props.values.time}
                                              onChange={(e) => props.handleTime(e.target.value)}/>
                            </label>
                        </div>
                        <div>
                            <label className="stepFourDateOfReceiptMessageToCourierContainer">
                                <div className="stepFourMessageToCourierContainer">Uwagi dla kuriera</div>
                                <input type="textarea" name="messageToCourier"
                                       className="stepFourDateOfReceiptMessageToCourierInput"
                                       value={props.values.messageToCourier}
                                       onChange={(e) => props.handleMessage(e.target.value)}/>
                            </label>
                        </div>
                        <br/>
                        <button className="stepFourBtn" onClick={goBack}>WSTECZ</button>
                        <button className="stepFourBtn" onClick={moveOn}>DALEJ</button>
                    </div>
                    <Contact/>
                </div>
            </>
        }
    }
;

export default StepFour;
