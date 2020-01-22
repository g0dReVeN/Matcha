import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import SideBarComponent from './components/SideBarComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import './App.css';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    // content: {
    //     marginTop: 54
    // },
    mainBlock: {
        backgroundColor: '#f5f7fa',
        padding: 30,
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
        return (
            <Row className={css(styles.container)}>
                <SideBarComponent />
                <Column flexGrow={1} className={css(styles.mainBlock)}>
                    <div>
                        <HeaderComponent />
                    </div>
                    <div>1</div>
                    <div>1</div><div>1</div>

<div>1</div>
<div>1</div><div>1</div><div>1</div><div>1</div>
<div>1</div><div>1</div><div>1</div><div>1</div>
<div>1</div><div>1</div><div>1</div><div>1</div>
<div>1</div><div>1</div><div>1</div><div>1</div>
<div>1</div><div>1</div><div>1</div><div>1</div>
<div>1</div><div>1</div><div>1</div><div>1</div>
<div>1</div><div>1</div><div>1</div><div>1</div>
<div>1</div><div>1</div><div>1</div><div>1</div>
                    <FooterComponent />
                </Column>
            </Row>
        );
    }
}

export default App;