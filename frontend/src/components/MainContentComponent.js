import React from 'react';
import { Row } from 'simple-flexbox';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCardComponent from './ProfileCardComponent';

const useStyles = makeStyles(theme => ({
    container: {
      marginBottom: 50,
    },
}));

const MainContentComponent = () => {
    const classes = useStyles();

    return (
        <Row className={classes.container} >
            <ProfileCardComponent></ProfileCardComponent>
        </Row>
      );
};

export default MainContentComponent;