import React, {useEffect, useState} from 'react';

const WhoWeHelp = () => {
    const [currentTopic, setCurrentTopic] = useState("fundations");
    const [fundations, setFundations] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const fundationsPerPage = 3;

    const indexOfLastFundation = currentPage * fundationsPerPage;
    const indexOfFirstFundation = indexOfLastFundation - fundationsPerPage;

    useEffect(() => {
        fetch(`http://localhost:3000/${currentTopic}`)
            .then(res => res.json())
            .then(response => setFundations(response))
    }, [currentTopic]);

    let currentFundations = [];
    if (fundations) {
        currentFundations = fundations.slice(indexOfFirstFundation, indexOfLastFundation);
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    };

    const renderFundations = currentFundations.map((fund, index) => {
        return <>
            <li key={index}>
                <div className="liContainer">
                    <div className="liSubContainer">
                        <div className="liHeader">{fund.header}</div>
                        <div className="liSubheader">{fund.subheader}</div>
                    </div>
                    <div className="liDesc">{fund.desc}</div>
                </div>
                <div className="liUnderline" id={index}></div>
            </li>
        </>
    });

    let pageNumbers = [];
    if (fundations) {
        for (let i = 1; i <= Math.ceil(fundations.length / fundationsPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    const renderPageNumbers = pageNumbers.map((number) => {
        if (currentTopic === "localOrganizations") {
            return <li key={number} id={number} onClick={handleClick} className="liPage"></li>
        } else {
            return <li key={number} id={number} onClick={handleClick} className="liPage">{number}</li>
        }
    });

    const changeTopic = (topic) => {
        setCurrentTopic(topic);
        setCurrentPage(1);
    };

    return <>
        <div className="whoWeHelpContainer container" id="fundation">
            <h2 className="whoWeHelpHeader">Komu pomagamy?</h2>
            <div className="decorationsLogo"></div>
            <div className="btnContainer">
                <button value={"fundations"} onClick={(event) => changeTopic(event.target.value)}>Fundacjom</button>
                <button value={"organizations"} onClick={(event) => changeTopic(event.target.value)}>Organizacjom<br/>pozarządowym
                </button>
                <button value={"localOrganizations"} onClick={(event) => changeTopic(event.target.value)}>Lokalnym<br/>zbiórkom
                </button>
            </div>
            <p className="whoWeHelpSlogan">W naszej bazie znajdziesz listę zweryfikowanych Fundacji, z którymi
                współpracujemy.
                Możesz sprawdzić czym się zajmują, komu pomagają i czego potrzebują.</p>
            <ul>
                {renderFundations}
            </ul>
            <ul className="pageNumbers">
                {renderPageNumbers}
            </ul>
        </div>
    </>
};

export default WhoWeHelp;