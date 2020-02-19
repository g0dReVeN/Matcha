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
    },
    field: {
        width: 300,
        margin: '35px 0px 0px 0px',
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
                // console.log(res.data.token);
                if (res.status === 200)
                    props.mainContent(res.data.token);
            });
    };

    return (
        <Column className={classes.root} vertical="center" horizontal="center">
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
                                        style={{ color: '#ff596a' }}
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
                    <Button className={classes.btn} onClick={loginUser} variant="contained">Login</Button>
                    <Button className={classes.btn} onClick={registerScreen} variant="contained">Register</Button>
                </Column>
            </form>
        </Column>
    );
};

export default LoginComponent;