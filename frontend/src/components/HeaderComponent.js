import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: '#03fcf4',
        // position: 'absolute',
        // top: 0,
        width: '100%',
        marginBottom: 50,
    },
    title: {
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '30px',
        letterSpacing: 0.3,
        display: 'table',
        margin: 'auto',
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
});

const HeaderComponent = (props) => {
    // const { icon, title, ...otherProps } = props;
    return (
        <Row className={css(styles.container)} vertical="center" horizontal="space-between">
            <span className={css(styles.title)}>Matcha</span>
        </Row>
    );
};

export default HeaderComponent;