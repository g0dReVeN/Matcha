import React from 'react';
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
import './App.css';

const styles = StyleSheet.create({
    container1: {
        height: '100%',
        minHeight: '100vh',
    },
    container2: {
        height: '100%',
        width: '100%',
    },
    // content: {
    //     marginTop: 54
    // },
    mainBlock: {
        backgroundColor: '#FFF',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url("/assets/background4.jpg")',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // padding: 30,
        width: '100%',
        position: 'relative'
    }
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            register: false,
            forgotPassword: false,
            userInfo: {},
        };
    }

    componentDidMount() {
        if (localStorage.hasOwnProperty('access_token')) {
            // this.setState({ isLoadding: -1 });
            // localStorage.removeItem('access_token');
            // axios.get('http://localhost:5000', { headers: { 'Authorization': localStorage.access_token } })
            //     .then(res => {
            //         localStorage.removeItem('access_token');
            //         if (res.success === true)
                        // this.setState({
                        //     isLoadding: false,
                        //     isLoggedIn: true,
                        //     userInfo: jwt.decode(localStorage.access_token, { json: true }),
                        // });
            //         else {
            //             localStorage.clear();
            //             this.setState({ isLoadding: false });
            //         }
            //     });
            jwt.verify(localStorage.access_token, process.env.REACT_APP_JWT_PUBLIC_KEY, { algorithms: ['ES256'] }, (err, payload) => {
                if (err) {
                    localStorage.clear();
                    console.log(err);
                }
                else
                    this.setState({
                        isLoggedIn: true,
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

    registerScreen = value => {
        this.setState({ register: value });
    };

    resetPassword = value => {
        this.setState({ forgotPassword: value });
    };

    logOut = value => {
        this.setState({ isLoggedIn: value });
    };

    mainContent = token => {
        localStorage.access_token = token;
        this.setState({
            isLoggedIn: true,
            userInfo: jwt.verify(localStorage.access_token, process.env.REACT_APP_JWT_PUBLIC_KEY, { algorithms: ['ES256'] }),
        });
    };

    render() {
        if (this.state.isLoggedIn)
            return (
                <Row className={ css(styles.container1) }>
                    <SideBarComponent userInfo={ this.state.userInfo } logOut={this.logOut} />
                    <Column className={ css(styles.mainBlock) } vertical="flex-start" horizontal="center">
                        <HeaderComponent />
                        <MainContentComponent />
                        <FooterComponent />
                    </Column>
                </Row>
            );
        else if (this.state.register)
            return (
                <Row className={ css(styles.container1) }>
                    <Column className={ css(styles.mainBlock) } vertical="flex-start" horizontal="center">
                        <HeaderComponent />
                        <RegisterComponent registerScreen={ this.registerScreen } />
                        <FooterComponent />
                    </Column>
                </Row>
            );
        else if (this.state.forgotPassword)
            return (
                <Row className={ css(styles.container1) }>
                    <Column className={ css(styles.mainBlock) } vertical="flex-start" horizontal="center">
                        <HeaderComponent />
                        <ForgotPasswordComponent resetPassword={ this.resetPassword } />
                        <FooterComponent />
                    </Column>
                </Row>
            );
        else
            return (
                <Row className={css(styles.container1)}>
                    <Column className={ css(styles.mainBlock) } vertical="flex-start" horizontal="center">
                        <HeaderComponent />
                        <LoginComponent mainContent= {this.mainContent } registerScreen={ this.registerScreen } resetPassword={ this.resetPassword } />
                        <FooterComponent />
                    </Column>
                </Row>
            );
    }
}

export default App;