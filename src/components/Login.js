import React, {useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import NavBar from "./Home/NavBar";
import firebase from "../firebase/config";

const Login = () => {

    const [routeRedirect, setRouteRedirect] = useState(false);

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
        loginError: "",
        passwordError: ""
    });

    const [borders, setBorders] = useState({
        errorEmail: "",
        noneEmail: "",
        errorPassword: "",
        nonePassword: ""
    });

    const handleChangeEmail = (email) => {
        setLoginDetails(prevState => {
            return {
                ...prevState,
                email: email
            }
        })
    };

    const handleChangePassword = (password) => {
        setLoginDetails(prevState => {
            return {
                ...prevState,
                password: password
            }
        })
    };

    const login = async () => {
        let response = await firebase.login(loginDetails.email, loginDetails.password);
        if (response.hasOwnProperty("message")) {
            console.log(response.message);
        }
        if (response.hasOwnProperty("user")) {
            setRouteRedirect(true);
        }
    };

    const redirect = routeRedirect;
    if (redirect) {
        return <Redirect to="/"/>;
    }


    const validateEmail = () => {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(loginDetails.email) || (loginDetails.email === "")) {
            setLoginDetails(prevState => {
                return {
                    ...prevState,
                    loginError: "Podany email jest nieprawidłowy!"
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
        if (loginDetails.password.length < 6) {
            setLoginDetails(prevState => {
                return {
                    ...prevState,
                    passwordError: "Podane hasło jest za krótkie!"
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        if (isEmailValid && isPasswordValid) {
            setLoginDetails(prevState => {
                return {
                    ...prevState,
                    loginError: "",
                    passwordError: ""
                }
            });
            setBorders(prevState => {
                return {
                    ...prevState,
                    errorEmail: "",
                    noneEmail: "",
                    errorPassword: "",
                    nonePassword: ""
                }
            });
            login();
        }
    };

    return <>
        <div className="loginContainer container">
            <ul className="login">
                <li><Link to="/login">Zaloguj</Link></li>
                <li><Link to="/registration">Załóż konto</Link></li>
            </ul>
            <NavBar/>
            <div className="panelLogin">
                <h2>Zaloguj się</h2>
                <div className="panelLoginDecoration"></div>
                <label htmlFor="" className="panelLoginInputContainer">
                    <label htmlFor="" className="panelLoginInputEmail">
                        Email<br/> <input className={borders.noneEmail} type="email" onChange={(event) => handleChangeEmail(event.target.value)}/>
                        <div className={borders.errorEmail}></div>
                        <div className="loginError">{loginDetails.loginError}</div>
                    </label>
                    <br/>
                    <label htmlFor="" className="panelLoginInputPassword">
                        Hasło<br/> <input className={borders.nonePassword} type="password" onChange={(event) => handleChangePassword(event.target.value)}/>
                        <div className={borders.errorPassword}></div>
                        <div className="passwordError">{loginDetails.passwordError}</div>
                    </label>
                </label>
                <div className="panelLoginSubmitContainer">
                    <Link to="/registration" className="linkSubmit">Załóż konto</Link>
                    <button type="submit" onClick={handleSubmit}>Zaloguj się</button>
                </div>
                <Link className="logOutLink" to="/">Strona główna</Link>
            </div>
        </div>
    </>
};

export default Login;