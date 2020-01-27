import React from 'react';
import { string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Row, Column } from 'simple-flexbox';
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

const RegisterComponent = (props) => {
    // const { icon, title, ...otherProps } = props;
    const classes = useStyles();

    const preventDefault = event => event.preventDefault();

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = event => {
        event.preventDefault();
      };

    return (
        <Column className={classes.root} vertical="center" horizontal="center">
            <HeaderComponent />
            <form className={classes.form} noValidate autoComplete="off">
                <Column vertical="center" horizontal="center">
                    <TextField required className={classes.field} label="Email" variant="outlined" />
                    <TextField required className={classes.field} label="Username" variant="outlined" />
                    <TextField required className={classes.field} label="Surname" variant="outlined" />
                    <TextField required className={classes.field} label="First Name" variant="outlined" />
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
                    <Button className={classes.btn} variant="outlined">Register</Button>
                    <Link className={classes.text} href="#" onClick={preventDefault} variant="body2">
                        {'Login Instead?'}
                    </Link>
                </Column>
            </form>
            <FooterComponent />
        </Column>
    );
};

export default RegisterComponent;