import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

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
        // border: '1px solid #FFF',
        border: '5px double #ff596a',
        borderRadius: '50%',
        height: 40,
        width:  40,
        cursor: 'pointer',
    },
    title: {
        left: 70,
        position: 'absolute',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontSize: 19,
        fontWeight: 'bold',
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: '#FFF',
        cursor: 'pointer',
    },
    frameR: {
        right: 60,
        position: 'absolute',
        backgroundColor: '#FFF',
        // textAlign: 'center',
        // textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ff596a',
        fontWeight: 'bold',
        // lineHeight: 2.2,
        // borderBottom: '32px solid #f5f7fa',
        // borderLeft: '8px solid transparent',
        // borderRight: '8px solid transparent',
        // height: 0,
        // width: 32,
        height: 40,
        width:  40,
        border: '5px double #ff596a',
        borderRadius: '50%',
        // ':hover': {
        //     borderBottom: '32px solid #FFF',
        // },
        // cursor: 'pointer',
    },
    logoutB: {
        position: 'absolute',
        left: 300,
        height: 40,
        width:  40,
        // borderRadius: '50%',
        // cursor: 'pointer',
    },
    logout: {
        // ':hover': {
        //     fill: '#000',
        // },
        borderRadius: '50%',
        cursor: 'pointer',
    }
});

const ProfileBarComponent = (props) => {
    const signOut = event => {
        event.preventDefault();

        localStorage.removeItem('access_token');
        props.logOut(false);
    };

    return (
        <Row className={css(styles.container)} horizontal="start" vertical="center">
            <div className={css(styles.proPic)}></div>
            <div className={css(styles.title)}>{props.username}</div>
            <div className={css(styles.frameR)}>{props.frameRating}</div>
            <div className={css(styles.logoutB)}>
                <img className={css(styles.logout)} src="/assets/logout.svg" onClick={signOut} ></img>
            </div>
        </Row>
    );
}

ProfileBarComponent.defaultProps = {
    username: "My Profile",
    frameRating: 100,
};

export default ProfileBarComponent;