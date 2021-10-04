import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Register from './Register.js';
import Login from './Login.js';


export default function FirstPage() {
    return (
        <Router>
        <div className="firstPage">
            <h2>Välkomen till denna texteditor!</h2>
            <p>För att komma igång med ditt skrivande kan du</p>
            <Link to="/register" className="link">Registrera dig här!</Link>
            <p>eller</p>
            <Link to="/login" className="link">Logga in här!</Link>
        </div>
        <Switch>
          <Route path="/register">
            <Register regUser />
          </Route>
          <Route path="/login">
            <Login loginUser />
          </Route>
        </Switch>
        </Router>
    );
}