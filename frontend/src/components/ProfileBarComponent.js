import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import logOut from '../icons/logout.svg';
import UserNotifPanelComponent from './UserNotifPanelComponent';

const styles = StyleSheet.create({
    container: {
        // marginLeft: 32,
        // marginRight: 32,
        height: 70,
        backgroundColor: '#ff596a',
        position: 'relavtive'
    },
    proPic: {
        left: 10,
        position: 'absolute',
        backgroundColor: '#FFF',
        border: '1px solid #FFF',
        borderRadius: '50%',
        height: 40,
        width:  40
    },
    title: {
        left: 65,
        position: 'absolute',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontSize: 19,
        fontWeight: 'bold',
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: '#FFF',
    },
    frameR: {
        left: 165,
        position: 'absolute',
        textAlign: 'center',
        color: '#ff596a',
        fontWeight: 'bold',
        lineHeight: 2.2,
        borderBottom: '32px solid #FFF',
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        height: 0,
        width: 32,
    },
    logoutB: {
        position: 'absolute',
        left: 300,
        height: 40,
        width:  40
    }
});

const ProfileBarComponent = (props) => {
    return (
        <Row className={css(styles.container)} horizontal="start" vertical="center">
            <div className={css(styles.proPic)}></div>
            <div className={css(styles.title)}>{props.name}</div>
            <div className={css(styles.frameR)}>{props.frameR}</div>
            <div className={css(styles.logoutB)}>
                <img src={logOut}></img>
            </div>
        </Row>
    );
}

ProfileBarComponent.defaultProps = {
    name: "My Profile",
    frameR: 100
};

export default ProfileBarComponent;