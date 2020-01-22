import React from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    container: {
        marginLeft: 32,
        marginRight: 32,
        height: 70
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: '24px',
        letterSpacing: '0.4px',
        color: '#111111',
        opacity: 0.7,
        marginLeft: 12
    }
});

const ProfileBarComponent = () => {
    return (
        <Row className={css(styles.container)} horizontal="center" vertical="center">
            <span className={css(styles.title)}>My Profile</span>
        </Row>
    );
}

export default ProfileBarComponent;