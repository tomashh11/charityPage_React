import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import NavBar from "./Home/NavBar";
import firebase from "../firebase/config";

const Registration = () => {

        const [routeRedirect, setRedirect] = useState(false);

        const [registerDetails, setRegisterDetails] = useState({
            email: "",
            password: "",
            confirmPassword: "",
            emailRegisterError: "",
            passwordRegisterError: "",
            passwordRegisterConfirmError: ""
        });

        const [borders, setBorders] = useState({
            errorEmail: "",
            noneEmail: "",
            errorPassword: "",
            nonePassword: "",
            errorConfirmPassword: "",
            noneConfirmPassword: ""
        });

        const signIn = async () => {
            let response = await firebase.signIn(registerDetails.email, registerDetails.password);
            if (response.hasOwnProperty("message")) {
                console.log(response.message);
            }
            if (response.hasOwnProperty("user")) {
                setRedirect(true);
            }
        };

        const redirect = routeRedirect;
        if (redirect) {
            return <Redirect to="/"/>
        }

        const handleEmail = (email) => {
            setRegisterDetails(prevState => {
                return {
                    ...prevState,
                    email: email
                }
            })
        };

        const handlePassword = (password) => {
            setRegisterDetails(prevState => {
                return {
                    ...prevState,
                    password: password
                }
            })
        };

        const handleConfirmPassword = (passwordConfirm) => {
                setRegisterDetails(prevState => {
                        return {
                            ...prevState,
                            confirmPassword: passwordConfirm
                        }
                    }
                )
            }
        ;

        const validateEmail = () => {
            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!reg.test(registerDetails.email) || (registerDetails.email === "")) {
                setRegisterDetails(prevState => {
                    return {
                        ...prevState,
                        emailRegisterError: "Podany email jest nieprawidłowy!"
                    };
                });
                setBorders(prevState => {
                    return {
                        ...prevState,
                        errorEmail: "errorUnderline",
                        noneEmail: "borderNone"
                    }
                });
                return false;
            } else {
                return true;
            }
        };

        const validatePassword = () => {
            if (registerDetails.password.length < 6) {
                setRegisterDetails(prevState => {
                    return {
                        ...prevState,
                        passwordRegisterError: "Podane hasło jest za krótkie!"
                    }
                });
                setBorders(prevState => {
                    return {
                        ...prevState,
                        errorPassword: "errorUnderline",
                        nonePassword: "borderNone"
                    }
                });
                return false;
            } else {
                return true;
            }
        };

        const validateConfirmPassword = () => {
            if (registerDetails.password !== registerDetails.confirmPassword) {
                setRegisterDetails(prevState => {
                    return {
                        ...prevState,
                        passwordRegisterConfirmError: "Powtórz hasło!"
                    }
                });
                setBorders(prevState => {
                    return {
                        ...prevState,
                        errorConfirmPassword: "errorUnderline",
                        noneConfirmPassword: "borderNone"
                    }
                });
                return false;
            } else {
                return true;
            }
        };

        const handleRegister = (e) => {
            e.preventDefault();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isPasswordConfirmValid = validateConfirmPassword();
            if (isEmailValid && isPasswordValid && isPasswordConfirmValid) {
                setRegisterDetails(prevState => {
                    return {
                        ...prevState,
                        emailRegisterError: "",
                        passwordRegisterError: "",
                        passwordRegisterConfirmError: ""
                    }
                });
                setBorders(prevState => {
                    return {
                        ...prevState,
                        errorEmail: "",
                        noneEmail: "",
                        errorPassword: "",
                        nonePassword: "",
                        errorConfirmPassword: "",
                        noneConfirmPassword: ""
                    }
                });
                signIn();
            } else {
                setBorders(prevState => {
                    return {
                        ...prevState,
                        errors: "errorUnderline",
                        none: "borderNone"
                    }
                });
            }
        };

        return <>
            <div className="loginConfirmContainer container">
                <ul className="login">
                    <li><Link to="/login">Zaloguj</Link></li>
                    <li><Link to="/registration">Załóż konto</Link></li>
                </ul>
                <NavBar/>
                <div className="panelLogin">
                    <h2>Załóż konto</h2>
                    <div className="panelLoginDecoration"></div>
                    <label htmlFor="" className="panelLoginInputContainer">
                        <label htmlFor="" className="panelLoginInputEmail">
                            Email<br/> <input className={borders.noneEmail} type="email"
                                              onChange={(event) => handleEmail(event.target.value)}/>
                            <div className={borders.errorEmail}></div>
                            <div className="emailRegisterError">{registerDetails.emailRegisterError}</div>
                        </label>
                        <br/>
                        <label htmlFor="" className="panelLoginInputPassword">
                            Hasło<br/> <input className={borders.nonePassword} type="password"
                                              onChange={(event) => handlePassword(event.target.value)}/>
                            <div className={borders.errorPassword}></div>
                            <div className="passwordRegisterError">{registerDetails.passwordRegisterError}</div>
                        </label>
                        <br/>
                        <label htmlFor="" className="panelLoginInputPasswordConfirm">
                            Powtórz hasło<br/> <input className={borders.noneConfirmPassword} type="password"
                                                      onChange={(event) => handleConfirmPassword(event.target.value)}/>
                            <div className={borders.errorConfirmPassword}></div>
                            <div
                                className="passwordRegisterConfirmError">{registerDetails.passwordRegisterConfirmError}</div>
                        </label>
                    </label>
                    <div className="panelLoginSubmitContainer">
                        <Link to="/login" className="linkSubmit">Zaloguj się</Link>
                        <button type="submit" onClick={handleRegister}>Załóż konto</button>
                        <Link className="logOutLink" to="/">Strona główna</Link>
                    </div>
                </div>
            </div>
        </>
    }
;

export default Registration;