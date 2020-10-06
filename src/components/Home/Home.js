import React from 'react';
import Header from "./Header";
import ThreeColumns from "./ThreeColumns";
import SimpleSteps from "./SimpleSteps";
import AboutUs from "./AboutUs";
import WhoWeHelp from "./WhoWeHelp";
import Contact from "../Contact";
import {HashRouter} from "react-router-dom";

const Home = () => {
    return <>
        <HashRouter>
            <Header/>
            <ThreeColumns/>
            <SimpleSteps/>
            <AboutUs/>
            <WhoWeHelp/>
            <Contact/>
        </HashRouter>
    </>
};

export default Home;