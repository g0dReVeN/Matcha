import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SideBarComponent from './components/SideBarComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import './App.css';
import MainContentComponent from './components/MainContentComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        // minHeight: '100vh'
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
        this.state = { selectedItem: 'Tickets' };
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    render() {
        const { selectedItem } = this.state;

        const isLoggedIn = false;

        if (isLoggedIn)
            return (
                <Row className={css(styles.container)}>
                    <SideBarComponent />
                    <Column className={css(styles.mainBlock)} vertical="flex-start" horizontal="center">
                        <HeaderComponent/>
                        <MainContentComponent />
                        <FooterComponent />
                    </Column>
                </Row>
            );
        else
            return (
                <Row className={css(styles.container)} vertical="center" horizontal="center">
                    <LoginComponent />
                </Row>
            );
    }
}

export default App;