import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import { Row, Column } from 'simple-flexbox';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
    },
    field: {
        width: 300,
        margin: '35px 0px 0px 0px',
        backgroundColor: '#FFF',
        color: '#ff596a',
    },
    field2: {
        width: 300,
        margin: '0px',
        backgroundColor: '#FFF',
        color: '#ff596a',
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
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: '400',
        textDecorationLine: 'none',
        fontSize: '0.875rem',
        lineHeight: '1.43',
        letterSpacing: '0.01071em',
        '&:hover': {
            textDecorationLine: 'underline',
        },
    },
    msg: {
        width: 300,
        // height: 80,
        fontSize: 16,
        // backgroundColor: 'white',
        // wordWrap: 'break-word',
        // color: values.color,
    },
});

const RegisterComponent = (props) => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        showPassword: false,
        resMsg: '',
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

    // const loginScreen = event => {
    //     event.preventDefault();
    //     props.registerScreen(false);
    // };

    const registerUser = event => {
        event.preventDefault();
        
        const userInfo = {
            username: values.username,
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
        };

        let flag = false

        axios.post(process.env.REACT_APP_API + '/register', userInfo)
            .then(res => {
                console.log(res.data);
                if (res.status === 200)
                    setValues({ color: 'green', resMsg: res.msg });
                else
                    setValues({ color: 'red', resMsg: res.msg });
            });
        // setValues({ color: 'green', resMsg: 'jou ma se poes' });
        // document.getElementById("outlined-adornment-password").focus();
    };

    return (
        <Row className={ classes.container }>
            <Column className={ classes.mainBlock } vertical="flex-start" horizontal="center">
                <HeaderComponent />
                <Column className={classes.root} vertical="center" horizontal="center">
                    <form className={classes.form} noValidate autoComplete="off">
                        <Column vertical="center" horizontal="center">
                            <Typography className={classes.msg} style={{ color: values.color }} >{ values.resMsg }</Typography>
                            <TextField required className={classes.field2} label="Email" variant="outlined" value={values.email} onChange={handleChange('email')}/>
                            <TextField required className={classes.field} label="Username" variant="outlined" value={values.username} onChange={handleChange('username')}/>
                            <TextField required className={classes.field} label="Surname" variant="outlined" value={values.lastname} onChange={handleChange('lastname')}/>
                            <TextField required className={classes.field} label="First Name" variant="outlined" value={values.firstname} onChange={handleChange('firstname')}/>
                            <FormControl required className={classes.field} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                style={{ color: '#ff596a' }}
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                            <Link className={classes.text} to="/login">Login Instead?</Link>
                            <Button className={classes.btn} variant="contained" onClick={registerUser}>Register</Button>
                        </Column>
                    </form>
                </Column>
                <FooterComponent />
            </Column>
        </Row>
    );
};

export default RegisterComponent;