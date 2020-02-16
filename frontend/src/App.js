import React from 'react';
import axios from 'axios';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SideBarComponent from './components/SideBarComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import MainContentComponent from './components/MainContentComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
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
        backgroundColor: '#f5f7fa',
        padding: 30,
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
            userInfo: {},
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000' + '/admin/userInfo')
            .then(res => {
                console.log(res.data);
                if (res.status === 200)
                    this.setState({
                        isLoggedIn: true,
                        userInfo: res.data,
                    });
            });

        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    registerScreen = value => {
        this.setState({ register: value });
    };

    mainContent = value => {
        this.setState({ isLoggedIn: value });
    };

    render() {
        if (this.state.isLoggedIn)
            return (
                <Row className={css(styles.container1)}>
                    <SideBarComponent />
                    <Column className={css(styles.mainBlock)} vertical="flex-start" horizontal="center">
                        <HeaderComponent />
                        <MainContentComponent />
                        <FooterComponent />
                    </Column>
                </Row>
            );
        else if (this.state.register)
            return (
                <RegisterComponent registerScreen={this.registerScreen} />
            );
        else
            return (
                <LoginComponent mainContent={this.mainContent} registerScreen={this.registerScreen} />
            );
    }
}

export default App;