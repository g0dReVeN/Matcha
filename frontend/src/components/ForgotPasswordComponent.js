import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import { Column } from 'simple-flexbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: '100%',
        color: '#ff596a',
        '& label': {
            color: '#ff596a',
            '&.Mui-focused': {
                color: '#ff596a',
            },
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#ff596a',
            },
            '&:hover fieldset': {
                border: '5px solid #ff596a'
            },
            '&.Mui-focused fieldset': {
                border: '5px solid #ff596a'
            },
        },
    },
    form: {
		marginTop: 70,
		width: 300,
    },
    field: {
        width: 300,
        margin: '35px 0px 0px 0px',
        backgroundColor: '#FFF',
		color: '#ff596a',
		marginTop: 0,
    },
    btn: {
        width: 300,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        margin: '20px 0px 0px 0px',
        color: '#FFF',
        backgroundColor: '#ff596a',
        '&:hover': {
            backgroundColor: 'rgba(255,89,106, 0.9) ',
        },
    },
    text: {
        color: '#ff596a',
    },
    msg: {
        width: 300,
        // height: 80,
        fontSize: 18,
        // wordWrap: 'break-word',
        color: 'red',
    },
});

const ForgotPasswordComponent = (props) => {
    // const { icon, title, ...otherProps } = props;
    const classes = useStyles();

    const preventDefault = event => event.preventDefault();

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const handleChange = value => event => {
        setValues({ ...values, [value]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
	
	const loginScreen = event => {
        event.preventDefault();
        props.resetPassword(false);
    };

    const loginUser = event => {
        event.preventDefault();

        const userInfo = {
            username: values.username,
            password: values.password,
        };

        axios.post('http://localhost:5000' + '/login', userInfo)
            .then(res => {
                // console.log(res.data.token);
                if (res.status === 200)
                    props.mainContent(res.data.token);
            });
    };

    return (
        <Column className={classes.root} vertical="center" horizontal="center">
			<form className={classes.form} noValidate autoComplete="off">
                <Column vertical="center" horizontal="center">
					<Typography className={classes.msg} id="resMsg"></Typography>
					<TextField 
						required 
						className={classes.field} 
						label="Username for password reset"
						variant="outlined" 
						value={values.username} 
						onChange={handleChange('username')}
					/>
					<Link className={classes.text} href="#" onClick={loginScreen} variant="body2">
						{'Login Instead?'}
					</Link>
					<Button className={classes.btn} onClick={preventDefault} variant="contained">Reset Password</Button>
				</Column>
            </form>
        </Column>
    );
};

export default ForgotPasswordComponent;