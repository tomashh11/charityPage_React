import React, {useState} from 'react';
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import Summary from "./Summary";
import Success from "./Success";

const MainForm = () => {

        const [userStep, setUserStep] = useState({
            step: 1
        });

        const [userForm, setUserForm] = useState({
            chosenThing: "",
            numberOfBags: "",
            localization: "",
            organizationName: "",
            street: "",
            city: "",
            postCode: "",
            phoneNumber: "",
            date: "",
            time: "",
            messageToCourier: ""
        });

        const inputsStepOneMap = new Map();
        inputsStepOneMap.set("goodClothes", {text: "ubrania, które nadają się do ponownego użycia", checked: false});
        inputsStepOneMap.set("badClothes", {text: "ubrania do wyrzucenia", checked: false});
        inputsStepOneMap.set("toys", {text: "zabawki", checked: false});
        inputsStepOneMap.set("books", {text: "książki", checked: false});
        inputsStepOneMap.set("other", {text: "inne", checked: false});
        const [stateMap, setStateMap] = useState(inputsStepOneMap);

        const optionsStepTwoMap = new Map();
        optionsStepTwoMap.set("1 worek", {numberOfBags: "1", selected: false});
        optionsStepTwoMap.set("2 worki", {numberOfBags: "2", selected: false});
        optionsStepTwoMap.set("3 worki", {numberOfBags: "3", selected: false});
        optionsStepTwoMap.set("4 worki", {numberOfBags: "4", selected: false});
        optionsStepTwoMap.set("5 worków", {numberOfBags: "5", selected: false});
        const [optionsMap, setOptionsMap] = useState(optionsStepTwoMap);

        const [helpGroup, setHelpGroup] = useState({
            children: false,
            mothers: false,
            homeless: false,
            disabled: false,
            olders: false
        });

        const cityName = new Map();
        cityName.set("Poznań", {name: "poznan", selected: false});
        cityName.set("Warszawa", {name: "warsaw", selected: false});
        cityName.set("Kraków", {name: "krakow", selected: false});
        cityName.set("Wrocław", {name: "wroclaw", selected: false});
        cityName.set("Katowice", {name: "katowice", selected: false});
        const [cities, setCities] = useState(cityName);

        const helpGroupStepThree = new Map();
        helpGroupStepThree.set("children", {name: "dzieciom", checked: false});
        helpGroupStepThree.set("mothers", {name: "samotnym matkom", checked: false});
        helpGroupStepThree.set("homeless", {name: "bezdomnym", checked: false});
        helpGroupStepThree.set("disabled", {name: "niepełnosprawnym", checked: false});
        helpGroupStepThree.set("olders", {name: "osobom starszym", checked: false});
        const [groups, setGroups] = useState(helpGroupStepThree);

        const nextStep = () => {
            setUserStep(prevState => {
                return {
                    ...prevState,
                    step: step + 1
                }
            })
        };

        const prevStep = () => {
            setUserStep(prevState => {
                return {
                    ...prevState,
                    step: step - 1
                }
            })
        };

        const handleStepOneChange = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "chosenThing": value
                };
            });
        };

        const handleStepTwoChange = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "numberOfBags": value
                };
            });
        };

        const handleStepThreeChange = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "localization": value
                }
            })
        };

        const handleOrganization = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "organizationName": value
                }
            })
        };

        const chooseHelp = (input, event) => {
            setHelpGroup(prevState => {
                return {
                    ...prevState,
                    [input]: event
                }
            });
        };

        const handleStreet = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "street": value
                }
            })
        };

        const handleCity = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "city": value
                }
            })
        };

        const handlePostCode = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "postCode": value
                }
            })
        };

        const handlePhoneNumber = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "phoneNumber": value
                }
            })
        };

        const handleDate = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "date": value
                }
            })
        };

        const handleTime = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "time": value
                }
            })
        };

        const handleMessage = (value) => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    "messageToCourier": value
                }
            })
        };

        const chosenHelpGroup = () => {
            let currentGroup = [];
            for (let [key, value] of groups) {
                if (value.checked === true) {
                    currentGroup.push(value.name);
                }
            }
            return currentGroup.join(", ")
        };

        const clearUserForm = () => {
            setUserForm(prevState => {
                return {
                    ...prevState,
                    chosenThing: "",
                    numberOfBags: "",
                    localization: "",
                    organizationName: "",
                    street: "",
                    city: "",
                    postCode: "",
                    phoneNumber: "",
                    date: "",
                    time: "",
                    messageToCourier: ""
                }
            })
        };

        const {step} = userStep;
        const {chosenThing, numberOfBags, localization, organizationName, street, city, postCode, phoneNumber, date, time, messageToCourier} = userForm;
        const values = {
            chosenThing,
            numberOfBags,
            localization,
            organizationName,
            street,
            city,
            postCode,
            phoneNumber,
            date,
            time,
            messageToCourier
        };

        const {children, mothers, homeless, disabled, olders} = helpGroup;
        const chosenGroup = {
            children,
            mothers,
            homeless,
            disabled,
            olders
        };

        switch (step) {
            case 1:
                return (<>
                    <StepOne
                        nextStep={nextStep}
                        handleStepOneChange={handleStepOneChange}
                        values={values}
                        stateMap={stateMap}
                    />
                </>);
            case 2:
                return (<>
                    <StepTwo
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleStepTwoChange={handleStepTwoChange}
                        values={values}
                        optionsMap={optionsMap}
                    />
                </>);
            case 3:
                return (<>
                    <StepThree
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleStepThreeChange={handleStepThreeChange}
                        handleOrganization={handleOrganization}
                        chooseHelp={chooseHelp}
                        values={values}
                        groups={groups}
                        cities={cities}
                    />
                </>);
            case 4:
                return (<>
                    <StepFour
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleStreet={handleStreet}
                        handleCity={handleCity}
                        handlePostCode={handlePostCode}
                        handlePhoneNumber={handlePhoneNumber}
                        handleDate={handleDate}
                        handleTime={handleTime}
                        handleMessage={handleMessage}
                        values={values}
                    />
                </>);
            case 5:
                return (<>
                    <Summary
                        nextStep={nextStep}
                        prevStep={prevStep}
                        chosenHelpGroup={chosenHelpGroup}
                        chosenGroup={chosenGroup}
                        values={values}
                        clearUserForm={clearUserForm}
                    />
                </>);
            case 6:
                return (<>
                    <Success/>
                </>)
        }
    }
;

export default MainForm;