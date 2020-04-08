import React from 'react';
import Header from "./Header";
import ThreeColumns from "./ThreeColumns";
import SimpleSteps from "./SimpleSteps";
import AboutUs from "./AboutUs";
import WhoWeHelp from "./WhoWeHelp";
import Contact from "./Contact";

const Home = () => {
    return <>
        <Header/>
        <ThreeColumns/>
        <SimpleSteps/>
        <AboutUs/>
        <WhoWeHelp/>
        <Contact/>
    </>
};

export default Home;