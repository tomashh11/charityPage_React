import React from 'react';
import Home from "./components/Home";
import Login from "./components/Login";
import {HashRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";
import LogOut from "./components/LogOut";
import MainForm from "./components/Donation/MainForm";

function App() {
    return (
            <>
                <HashRouter>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/registration' component={Registration}/>
                        <Route exact path='/logout' component={LogOut}/>
                        <Route exact path='/donation' component={MainForm}/>
                        <Route path='/' component={Home}/>
                    </Switch>
                </HashRouter>
            </>
    );
}

export default App;
