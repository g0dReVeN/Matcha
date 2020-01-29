import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: 200,
      paddingBottom: 10,
    },
});

const scaryAnimals = [
  { label: "Alligators", value: 1 },
  { label: "Crocodiles", value: 2 },
  { label: "Sharks", value: 3 },
  { label: "Small crocodiles", value: 4 },
  { label: "Smallest crocodiles", value: 5 },
  { label: "Snakes", value: 6 },
];

const TagBarComponent = (props) => {
    const classes = useStyles();

    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    return (
        <div className={classes.root}>
            <div className="container">
            <Typography align='center'>
                {props.label}
            </Typography>
                <CreatableSelect isMulti onChange={handleChange}/>
            </div>
        </div>
    );
};

export default TagBarComponent;