import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './views/shippingAddress';

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const steps = ['Login', 'Shipping Address', 'Payment Method', 'Review Order'];


export default function CheckoutSteps(props) {
  const classes = useStyles();

  return (
    <React.Fragment >
      
          <Stepper activeStep={props.activeStep} className={classes.stepper} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
    </React.Fragment>
  );
}