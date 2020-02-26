import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Row, Column } from 'simple-flexbox';
import Typography from '@material-ui/core/Typography';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

const useStyles = makeStyles({
    container: {
        height: '100%',
        minHeight: '100vh',
    },
    mainBlock: {
        backgroundColor: '#FFF',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url("/assets/background4.jpg")',
        width: '100%',
		position: 'relative'
		
	},
	root: {
		color: '#ff596a',
	},
	err: {
        fontSize: 300,
    },
    msg: {
		fontSize: 80,
		textAlign: 'center',
    },
});

export default function PageNotFoundComponent() {
    const classes = useStyles();

    return (
        <Row className={ classes.container }>
            <Column className={ classes.mainBlock } vertical="flex-start" horizontal="center">
                <HeaderComponent />
                <Column className={classes.root} vertical="center" horizontal="center">
                    <Typography className={classes.err}>404</Typography>
					<Typography className={classes.msg}>There's no love found on this page</Typography>
                </Column>
                <FooterComponent />
            </Column>
        </Row>
    );
};