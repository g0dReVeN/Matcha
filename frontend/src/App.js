import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./routes/Route";
import RootComponent from './components/RootComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';
import ResetPasswordComponent from './components/ResetPasswordComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';
import './App.css';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route 
                        exact path="/"
                        render={ (props) => <RootComponent {...props} /> }
                        // Auth
                    />
                    <Route exact path="/login">
                        <LoginComponent />
                    </Route>
                    <Route exact path="/register">
                        <RegisterComponent />
                    </Route>
                    <Route exact path="/forgotPassword">
                        <ForgotPasswordComponent />
                    </Route>
                    <Route 
                        exact path="/resetPassword/:resetToken" 
                        render={ (props) => <ResetPasswordComponent {...props} /> }
                    />
                    <Route
                        path="*"
                        render={ () => <PageNotFoundComponent/> }
                    />
                </Switch>
            </Router>
        );
    };
};