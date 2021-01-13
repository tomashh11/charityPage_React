import React, {useState} from 'react';

const Contact = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
        nameError: '',
        emailError: '',
        messageError: '',
        success: '',
    });

    const [borders, setBorders] = useState({
        errorText: "",
        errorEmail: "",
        errorTextarea: "",
        noneText: "",
        noneEmail: "",
        noneTextarea: ""
    });

    const handleChangeName = (name) => {
        setForm(prevState => {
            return {
                ...prevState,
                name: name
            }
        })
    };

    const handleChangeEmail = (email) => {
        setForm(prevState => {
            return {
                ...prevState,
                email: email
            }
        })
    };

    const handleChangeMessage = (message) => {
        setForm(prevState => {
            return {
                ...prevState,
                message: message
            }
        })
    };

    const nameValidate = () => {
        if (form.name.includes(' ') || form.name === '') {
            setForm(prevState => {
                return {
                    ...prevState,
                    nameError: 'Podane imię jest nieprawidłowe!'
                }
            });
            setBorders(prevState => {
                return {
                    ...prevState,
                    errorText: "errorUnderline",
                    noneText: "borderNone"
                }
            });
            return false;
        }
        else return true;
    };

    const emailValidate = () => {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(form.email) || form.email === '') {
            setForm(prevState => {
                return {
                    ...prevState,
                    emailError: 'Podany email jest nieprawidłowy!'
                }
            });
            setBorders(prevState => {
                return {
                    ...prevState,
                    errorEmail: "errorUnderline",
                    noneEmail: "borderNone"
                }
            });
            return false;
        }
        else return true;
    };

    const messageValidate = () => {
        if (form.message.length <= 120) {
            setForm(prevState => {
                return {
                    ...prevState,
                    messageError: 'Wiadomość musi mieć conajmniej 120 znaków!'
                }
            });
            setBorders(prevState => {
                return {
                    ...prevState,
                    errorTextarea: "errorUnderlineTextarea",
                    noneTextarea: "borderNone"
                }
            });
            return false;
        }
        else return true;
    };

    const validate = () => {
        setForm(prevState => {
            return {
                ...prevState,
                success: `Wiadomość została wysłana!
                    Wkrótce się skontaktyjemy.`
            }
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidName = nameValidate();
        const isValidEmail = emailValidate();
        const isValidMessage = messageValidate();
        if (isValidName && isValidEmail && isValidMessage) {
            validate();
            setForm(prevState => {
                return {
                    ...prevState,
                    messageError: null,
                    nameError: null,
                    emailError: null,
                }
            });
            setBorders(prevState => {
                return {
                    ...prevState,
                    errorText: "",
                    noneText: "",
                    errorEmail: "",
                    noneEmail: "",
                    errorTextarea: "",
                    noneTextarea: ""
                }
            });
            fetch(`${process.env.REACT_APP_API_URL_CL}`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    };

    return <>
        <div className="contactContainer container" id="contact">
            <div className="contactImg"></div>
            <div className="contactCopyrights">Copyright by Coders Lab</div>
            <div className="contactIcons">
                <div className="contactFacebook"></div>
                <div className="contactInstagram"></div>
            </div>
            <div className="subHeaderContainer">
                <h2 className="contactHeader">Skontaktuj się z nami</h2>
                <div className="contactDecoration">
                    <div className="success">{form.success}</div>
                </div>
                <form action="">
                    <label htmlFor="" className="headerInputContainer">
                        <label htmlFor="" className="headerInputText">
                            Wpisz swoje imię<br/> <input className={borders.noneText} type="text" placeholder="Krzysztof" onChange={event => handleChangeName(event.target.value)}/>
                            <div className={borders.errorText}></div>
                            <div className="errors">{form.nameError}</div>
                        </label>
                        <label htmlFor="" className="headerInputEmail">
                            Wpisz swoj email<br/> <input className={borders.noneEmail} type="email" placeholder="abc@xyz.pl" onChange={event => handleChangeEmail(event.target.value)}/>
                            <div className={borders.errorEmail}></div>
                            <div className="errors">{form.emailError}</div>
                        </label>
                    </label>
                    <label htmlFor="" className="contactTextArea">
                        Wpisz swoją wiadomość<br/> <textarea className={borders.noneTextarea} rows="5" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." onChange={event => handleChangeMessage(event.target.value)}/>
                        <div className={borders.errorTextarea}></div>
                        <div className="errors">{form.messageError}</div>
                    </label>
                    <br/>
                    <div className="submitContainer">
                        <button type="submit" onClick={handleSubmit}>Wyślij</button>
                    </div>
                </form>
            </div>
        </div>
    </>
};

export default Contact;