import React from 'react';
import { Column } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    container: {
        width: 350,
        paddingTop: 32,
        borderRight: '1px solid #e0e4e9'
    },
    menuItemList: {
        marginTop: 52
    },
    separator: {
        borderTop: '1px solid #DFE0EB',
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

const SideBarComponent = () => {
    return (
        <Column className={css(styles.container)}>
            <div></div>
        </Column>
    );
};

export default SideBarComponent;