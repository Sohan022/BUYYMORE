import React, {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CheckoutSteps from '../../components/checkoutSteps';
import {useSelector, useDispatch} from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';

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
  }
}));

export default function ShippingAddress(props) {
    const classes = useStyles();
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo} = userLogin;


    if(!userInfo){
        props.history.push('/login');
    }
    const cart = useSelector((state) => state.cart);
    const { shippingAddress} = cart;

    useEffect(() => {
        if(shippingAddress){
            setFullName(shippingAddress.fullName)
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setState(shippingAddress.state)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }
    }, [shippingAddress])
    const dispatch = useDispatch();

    const handleNext = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,state,postalCode,country}));
        props.history.push('/paymentmethod');
    }

  return (
    <React.Fragment>
        <div className={classes.image}>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <CheckoutSteps activeStep={1}></CheckoutSteps>
              <div className={classes.form}>
                <Typography variant="h6" gutterBottom>
                        Shipping Address
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                        <TextField required id="fullName" name="fullName" label="Full Name" value={fullName} fullWidth onChange={(e)=>setFullName(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField required id="address" name="address" label="Address" value={address} fullWidth onChange={(e)=>setAddress(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required id="city" name="city" label="City" value={city} fullWidth onChange={(e)=>setCity(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField id="state" name="state" label="State/Province/Region" value={state} fullWidth onChange={(e)=>setState(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required id="postalCode" name="postalCode" label="Zip / Postal code" value={postalCode} fullWidth onChange={(e)=>setPostalCode(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required id="country" name="country" label="Country" value={country} fullWidth onChange={(e)=>setCountry(e.target.value)}/>
                        </Grid>
                        
                    </Grid>
                    <div className={classes.buttons}>
                        <Button className={classes.button} disabled>
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