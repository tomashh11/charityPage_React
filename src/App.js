import React from 'react';
import * as Scroll from 'react-scroll';
import {
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom';
import Home from "./components/Home";

function App() {
    return (
        <HashRouter>
            <>
                <Home/>
            </>
        </HashRouter>
    );
}

export default App;
