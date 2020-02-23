import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import { Column } from 'simple-flexbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
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
        // backgroundColor: 'white',
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

const ForgotPasswordComponent = (props) => {
    // const { icon, title, ...otherProps } = props;
    const classes = useStyles();

    // const preventDefault = event => event.preventDefault();

    // let textInput = null;
    // React.useEffect(()=>{
    //     textInput.focus();
    // });

    const [values, setValues] = React.useState({ password: '', resMsg: '' , color: 'red' });

    const handleChange = value => event => {
        setValues({ ...values, [value]: event.target.value });
	};

	const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
	
	const loginScreen = event => {
        event.preventDefault();
        props.resetPassword(false);
    };

    const resetPassword = event => {
        event.preventDefault();

        if (values.password) {
            // axios.post('http://localhost:5000' + '/resetPassword', { password: values.password })
            //     .then(res => {
            //         if (res.status === 200)
            //             props.resetPassword(false);
            //         else
            //             setValues({ color: 'red', resMsg: res.msg });
            //     });
            setValues({ color: 'green', resMsg: 'jou ma se poes' });
            document.getElementById("outlined-adornment-password").focus();
            
        }

    };

    return (
        <Column className={classes.root} vertical="center" horizontal="center">
			<form className={classes.form} noValidate autoComplete="off">
                <Column vertical="center" horizontal="center">
                    <Typography className={classes.msg} style={{ color: values.color }} >{ values.resMsg }</Typography>
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
                                        onMouseDown={e => e.preventDefault}
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
					<Link className={classes.text} href="#" onClick={loginScreen} variant="body2">
						{'Login Instead?'}
					</Link>
					<Button className={classes.btn} onClick={resetPassword} variant="contained">Reset Password</Button>
				</Column>
            </form>
        </Column>
    );
};

export default ForgotPasswordComponent;