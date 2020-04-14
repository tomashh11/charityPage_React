import React from "react";
import {Link} from "react-scroll";

const NavBar = () => {
    return <>
            <ul className="pageInfo">
                <Link activeClass="active" to="start" spy={true} smooth={true} offset={0} duration={500}>Start</Link>
                <Link activeClass="active" to="about" spy={true} smooth={true} offset={0} duration={500}>O co
                    chodzi?</Link>
                <Link activeClass="active" to="aboutUs" spy={true} smooth={true} offset={0} duration={500}>O nas</Link>
                <Link activeClass="active" to="fundation" spy={true} smooth={true} offset={0} duration={500}>Fundacje i
                    organizacje</Link>
                <Link activeClass="active" to="contact" spy={true} smooth={true} offset={0}
                      duration={500}>Kontakt</Link>
            </ul>
    </>
};

export default NavBar;