import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SideBarComponent from './components/SideBarComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import MainContentComponent from './components/MainContentComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';
import ResetPasswordComponent from './components/ResetPasswordComponent';
import PageNotFoundComponent from './components/PageNotFoundComponent';
import './App.css';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh',
    },
    mainBlock: {
        backgroundColor: '#FFF',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url("/assets/background4.jpg")',
        width: '100%',
        position: 'relative'
    }
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            // isLoggedIn: false,
            // register: false,
            // forgotPassword: false,
            userInfo: {},
        };
    }

    componentDidMount() {
        if (localStorage.hasOwnProperty('access_token')) {
            jwt.verify(localStorage.access_token, process.env.REACT_APP_JWT_PUBLIC_KEY, { algorithms: ['ES256'] }, (err, payload) => {
                if (err) {
                    localStorage.clear();
                    console.log(err);
                }
                else
                    this.setState({
                        // isLoggedIn: true,
                        userInfo: payload,
                    });
            });
        }
        else {
            localStorage.clear();
        }
        // window.addEventListener('resize', this.resize);
    }

    // componentWillUnmount() {
    // window.removeEventListener('resize', this.resize);
    // }

    // resize = () => this.forceUpdate();

    // registerScreen = value => {
    //     this.setState({ register: value });
    // };

    // resetPassword = value => {
    //     this.setState({ forgotPassword: value });
    // };

    // logOut = value => {
    //     this.setState({ isLoggedIn: value });
    // };

    // mainContent = token => {
    //     localStorage.access_token = token;
    //     this.setState({
    //         isLoggedIn: true,
    //         userInfo: jwt.verify(localStorage.access_token, process.env.REACT_APP_JWT_PUBLIC_KEY, { algorithms: ['ES256'] }),
    //     });
    // };

    render() {
        return (
            <Router>
                <Switch>
                    <Route 
                        exact path="/"
                        render={ () => { return (
                                <Row className={ css(styles.container) }>
                                    <SideBarComponent userInfo={ this.state.userInfo } />
                                    <Column className={ css(styles.mainBlock) } vertical="flex-start" horizontal="center">
                                        <HeaderComponent />
                                        <MainContentComponent />
                                        <FooterComponent />
                                    </Column>
                                </Row>
                            )}
                        }
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