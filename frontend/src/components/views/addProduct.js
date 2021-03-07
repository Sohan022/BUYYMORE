import React, {useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { addProduct } from '../../actions/productActions';
import AlertMessage from '../AlertMessage';

const useStyles = makeStyles((theme) => ({
    picture: {
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
  removeButton:{
      position:'relative',
      top:33,
      '&:hover':{
        cursor:'pointer'
    }
  },
  addButton:{
      position:'relative',
      top:6,
      '&:hover':{
          cursor:'pointer'
      }
  }
}));

export default function AddProduct(props) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [describe, setDescribe] = useState([{ value: null }]);
    
  function handleChange(i, event) {
    const values = [...describe];
    values[i].value = event.target.value;
    setDescribe(values);
  }

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo} = userLogin;
    


    if(!userInfo){
        props.history.push('/login');
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(name && brand && category && image && price && stock && describe){
          const description = describe.map(function (obj) {
            return obj.value;
          });
        dispatch(addProduct({
          name:name,
          brand:brand,
          category:category,
          image:image,
          price:Number(price),
          stock:Number(stock),
          description:description,
        }));
        props.history.push('/');
      }
    }

    function handleAdd() {
        const values = [...describe];
        values.push({ value: null });
        setDescribe(values);
    }

    function handleRemove(i) {
        const values = [...describe];
        values.splice(i, 1);
        setDescribe(values);
    }
  return (
    <React.Fragment>
      {(!userInfo.isAdmin)
      ?<AlertMessage type="warning">You didn't have permission to add product</AlertMessage>
    :
        <div className={classes.picture}>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Add Product
          </Typography>
              <div className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                        <TextField required id="name" name="name" label="Name of Product" fullWidth onChange={(e)=>setName(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required id="brand" name="brand" label="Brand"  fullWidth onChange={(e)=>setBrand(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required id="category" name="category" label="Category" fullWidth onChange={(e)=>setCategory(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField required id="image" name="image" label="Image URL" fullWidth onChange={(e)=>setImage(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required id="stock" name="stock" label="Stock" fullWidth onChange={(e)=>setStock(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField required id="price" name="price" label="Price(₹)" fullWidth onChange={(e)=>setPrice(e.target.value)}/>
                        </Grid>
                        {describe.map((field, idx) => {
                            return <>
                            {
                                describe.length > 1
                            ?   <>
                                <Grid item xs={11} key={`${field}-${idx}`}>
                                    <TextField id="description" name="description" value={field.value || ""} label={`Description Line ${idx+1}`} fullWidth onChange={e => handleChange(idx, e)}/>
                                </Grid>
                                
                                <RemoveCircleOutlineIcon className={classes.removeButton} onClick={()=>handleRemove(idx)}></RemoveCircleOutlineIcon>
                                </>
                            : <Grid item xs={12} key={`${field}-${idx}`}>
                                    <TextField id="description" name="description" value={field.value || ""} label={`Description Line ${idx+1}`} fullWidth onChange={e => handleChange(idx, e)}/>
                                </Grid>
                        }
                                </>
                        
                        })}
                        <p>Add more description <AddCircleOutlineIcon className={classes.addButton} onClick={()=>handleAdd()}></AddCircleOutlineIcon></p>
                        
                    </Grid>
                    <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.button}
                    >
                        Add Product
                    </Button>
                    </div>
              </div>
        </Paper>
      </main>
      </div>
}
    </React.Fragment>
  );
}