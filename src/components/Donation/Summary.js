import React, {useEffect, useState} from 'react';
import firebase from "../../firebase/config";
import {Link} from "react-router-dom";
import NavBar from "../Home/NavBar";
import Contact from "../Contact";

const Summary = (props) => {

        const [userState, setUserState] = useState(null);

        const moveOn = async (e) => {
            e.preventDefault();
            props.nextStep();
            props.clearUserForm();

            let chosenCharity = {
                userId: "",
                chosenThing: props.values.chosenThing,
                numberOfBags: props.values.numberOfBags,
                localization: props.values.localization,
                organizationName: props.values.organizationName,
                street: props.values.street,
                city: props.values.city,
                postCode: props.values.postCode,
                date: props.values.date,
                time: props.values.time,
                messageToCourier: props.values.messageToCourier,
                children: props.chosenGroup.children,
                mothers: props.chosenGroup.mothers,
                homeless: props.chosenGroup.homeless,
                disabled: props.chosenGroup.disabled,
                olders: props.chosenGroup.olders
            };

            await firebase.createCharity(chosenCharity).then(() => {
                console.log("stworzono darowiznę")
            }).catch(err => {
                console.log(err)
            })
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
                <h1>Podsumowanie Twojej darowizny</h1>
                <h2>Oddajesz:</h2>
                <p>{props.values.numberOfBags},{props.values.chosenThing},{props.values.organizationName}</p>
                <p>{props.chosenHelpGroup()}</p>
                <br/>
                <p>dla lokalizacji: {props.values.localization}</p>
                <br/>
                <h2>Adres odbioru:</h2>
                <p>Ulica {props.values.street}</p>
                <p>Miasto {props.values.city}</p>
                <p>Kod pocztowy {props.values.postCode}</p>
                <p>Numer telefonu {props.values.phoneNumber}</p>
                <br/>
                <h2>Termin odbioru:</h2>
                <p>Data {props.values.date}</p>
                <p>Godzina {props.values.time}</p>
                <p>Uwagi dla kuriera {props.values.messageToCourier}</p>
                <button onClick={moveOn}>POTWIERDZAM</button>
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
                            <div className="summaryBackground"></div>
                        </div>
                    </div>
                    <div className="summaryContainer">
                        <h1 className="summaryMainTitle">Podsumowanie Twojej darowizny</h1>
                        <h2 className="summarySecondTitle">Oddajesz:</h2>
                        <div className="shirtIcon"></div>
                        <p className="currentCharity">{props.values.numberOfBags}, {props.values.chosenThing}{props.values.organizationName}, {props.chosenHelpGroup()}</p>
                        <br/>
                        <div className="localizationIcon"></div>
                        <p className="currentLocalization">dla lokalizacji: {props.values.localization}</p>
                        <br/>
                        <h2 className="summaryAddress">Adres odbioru:</h2>
                        <div className="summaryStreetContainer">Ulica<span
                            className="summaryStreet">{props.values.street}</span></div>
                        <div className="summaryCityContainer">Miasto <span
                            className="summaryCity">{props.values.city}</span></div>
                        <div className="summaryPostCodeContainer">
                            <div className="summaryPostCodeTitle">Kod pocztowy</div>
                            <span className="summaryPostCode">{props.values.postCode}</span></div>
                        <div className="summaryPhoneNumberContainer">
                            <div className="summaryPhoneNumberTitle">Numer telefonu</div>
                            <span className="summaryPhoneNumber">{props.values.phoneNumber}</span></div>
                        <br/>
                        <h2 className="summaryDateOfReceiptTitle">Termin odbioru:</h2>
                        <div className="summaryDateOfReceiptContainer">Data <span
                            className="summaryDateOfReceiptDate">{props.values.date}</span></div>
                        <div className="summaryTimeContainer">Godzina <span
                            className="summaryTime">{props.values.time}</span></div>
                        <div className="summaryMessageToCourierContainer">
                            <div className="summaryMessageToCourierTitle">Uwagi dla kuriera</div>
                            <span className="summaryMessageToCourier">{props.values.messageToCourier}</span></div>
                        <button className="summaryBtn" onClick={goBack}>WSTECZ</button>
                        <button className="summaryBtn summaryConfirmBtn" onClick={moveOn}>POTWIERDZAM</button>
                    </div>
                    <Contact/>
                </div>
            </>
        }
    }
;

export default Summary;
