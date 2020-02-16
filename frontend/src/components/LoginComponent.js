import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import { Column } from 'simple-flexbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
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
    root: {
        width: '100%',
    },
    form: {
        marginTop: 70,
    },
    field: {
        width: 300,
        margin: '35px 0px 0px 0px',
    },
    btn: {
        width: 300,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        margin: '20px 0px 0px 0px',
    },
    text: {
        color: 'grey',
    },
});

const LoginComponent = (props) => {
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

    const registerScreen = event => {
        event.preventDefault();
        props.registerScreen(true);
    };

    const loginUser = event => {
        event.preventDefault();

        const userInfo = {
            username: values.username,
            password: values.password,
        };

        axios.post('http://localhost:5000' + '/login', userInfo)
            .then(res => {
                console.log(res.data);
                if (res.status === 200)
                    props.mainContent(true);
            });
    };

    return (
        <Column className={classes.root} vertical="center" horizontal="center">
            <HeaderComponent />
            <form className={classes.form} noValidate autoComplete="off">
                <Column vertical="center" horizontal="center">
                    <TextField required className={classes.field} label="Username" variant="outlined" value={values.username} onChange={handleChange('username')}/>
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
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    <Link className={classes.text} href="#" onClick={preventDefault} variant="body2">
                        {'Forgot Password?'}
                    </Link>
                    <Button className={classes.btn} onClick={loginUser}  variant="outlined">Login</Button>
                    <Button className={classes.btn} onClick={registerScreen} variant="outlined">Register</Button>
                </Column>
            </form>
            <FooterComponent />
        </Column>
    );
};

export default LoginComponent;