import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CheckoutSteps from '../checkoutSteps';
import {useSelector, useDispatch} from 'react-redux';
import { savePaymentMethod} from '../../actions/cartActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1604118469935-7a9ff84bef1b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjh8fHNob3BwaW5nJTIwYmFnfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'top-center',
        height:'100vh',
      },
  appBar: {
    position: 'relative',
  },
  layout: {
      paddingTop:'60px',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  form:{
      marginLeft:'35px',
      marginRight:'35px'
  },
  title:{
    fontWeight:'bold'
  }
}));

export default function PaymentMethod(props) {
    const classes = useStyles();
    
      const [payMethod, setPayMethod] = React.useState('Prepaid');

  const handleChange = (e) => {
    setPayMethod(e.target.value);
  };
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod} = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  
    const dispatch = useDispatch();
    useEffect(() => {
      if(paymentMethod){
        setPayMethod(paymentMethod);
      }
      else{
        setPayMethod('Prepaid')
      }
    }, [paymentMethod])
    const handleNext = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(payMethod));
        props.history.push('/revieworder');
    }
    const handleBack =(e) =>{
      e.preventDefault();
      props.history.push('/shipping');
    }

  return (
    <React.Fragment>
        <div className={classes.image}>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <CheckoutSteps activeStep={2}></CheckoutSteps>
              <div className={classes.form}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment Method
                    </Typography>
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="payMethod" name="payMethod" value={payMethod} onChange={handleChange}>
                        <FormControlLabel value="Prepaid" control={<Radio />} label="Prepaid" />
                        <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
                      </RadioGroup>
                    </FormControl>
                    <div className={classes.buttons}>
                        <Button className={classes.button} onClick={handleBack}>
                        Back
                        </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        Next
                    </Button>
                    </div>
              </div>
        </Paper>
      </main>
      </div>
      
    </React.Fragment>
  );
}