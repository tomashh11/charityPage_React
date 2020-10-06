import React from 'react';
import {Link} from "react-router-dom";
import firebase from "../../firebase/config";

const SimpleSteps = () => {

    const checkUserLoggedIn = () => {
        alert("Najpierw musisz się zalogować!")
    };

    if (firebase.checkUserLoggedIn() === true) {
        return <>
            <div className="container mainSimpleSteps" id="about">
                <div className="simpleStepsHeader">Wystarczą 4 proste kroki</div>
                <div className="decorationLogo"></div>
                <div className="simpleStepsMain">
                    <div className="singleStep">
                        <div className="choose"></div>
                        <div className="singleStepHeader">Wybierz rzeczy</div>
                        <div className="singleStepUnderline"></div>
                        <div className="singleStepText">ubrania, zabawki,<br/> sprzęt i inne</div>
                    </div>
                    <div className="singleStep">
                        <div className="pack"></div>
                        <div className="singleStepHeader">Spakuj je</div>
                        <div className="singleStepUnderline"></div>
                        <div className="singleStepText">skorzystaj z <br/> na śmieci</div>
                    </div>
                    <div className="singleStep">
                        <div className="decide"></div>
                        <div className="singleStepHeader">Zdecyduj komu <br/> chcesz pomóc</div>
                        <div className="singleStepUnderline"></div>
                        <div className="singleStepText">wybierz zaufane <br/> miejsce</div>
                    </div>
                    <div className="singleStep">
                        <div className="courier"></div>
                        <div className="singleStepHeader">Zamów kuriera</div>
                        <div className="singleStepUnderline"></div>
                        <div className="singleStepText">kurier przyjedzie <br/> dogodnym terminie</div>
                    </div>
                </div>
                <div className="simpleStepButton">
                    <Link className="donationLink" to="/donation"> oddaj <br/> rzeczy</Link>
                </div>
            </div>
        </>
    } else {
        return <>
            <div className="container mainSimpleSteps" id="about">
                <div className="simpleStepsHeader">Wystarczą 4 proste kroki</div>
                <div className="decorationLogo"></div>
                <div className="simpleStepsMain">
                    <div className="singleStep">
                        <div className="choose"></div>
                        <div className="singleStepHeader">Wybierz rzeczy</div>
                        <div className="singleStepUnderline"></div>
                        <div className="singleStepText">ubrania, zabawki,<br/> sprzęt i inne</div>
                    </div>
                    <div className="singleStep">
                        <div className="pack"></div>
                        <div className="singleStepHeader">Spakuj je</div>
                        <div className="singleStepUnderline"></div>
                        <div className="singleStepText">skorzystaj z <br/> na śmieci</div>
                    </div>
                    <div className="singleStep">
                        <div className="decide"></div>
                        <div className="singleStepHeader">Zdecyduj komu <br/> chcesz pomóc</div>
                        <div className="singleStepUnderline"></div>
                        <div className="singleStepText">wybierz zaufane <br/> miejsce</div>
                    </div>
                    <div className="singleStep">
                        <div className="courier"></div>
                        <div className="singleStepHeader">Zamów kuriera</div>
                        <div className="singleStepUnderline"></div>
                        <div className="singleStepText">kurier przyjedzie <br/> dogodnym terminie</div>
                    </div>
                </div>
                <div className="simpleStepButton">
                    <Link className="donationLink" onClick={() => checkUserLoggedIn()} to="/login"> oddaj <br/> rzeczy</Link>
                </div>
            </div>
        </>
    }
};

export default SimpleSteps;