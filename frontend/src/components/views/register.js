import React, { useState, useEffect } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../Loading';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../actions/userActions';
import {Link} from  'react-router-dom';


const useStyles = makeStyles((theme) => ({  
    
    image: {
      backgroundImage: 'url(https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cmVnaXN0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'top-center',
      height:'100vh',
    },
    paperStyle:{
        padding: 30,
    },
    avatarStyle:{
        backgroundColor:'#1bbd7e'
    },
    btnstyle:{
        margin:'25px 0'
    },
    input:{
        marginBottom:'15px'
    },
    form:{
        width:350,
        verticalAlign:'middle',
        margin:'0 auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform:' translate(-50%, -50%)'
        
    },
    link:{
        textDecoration:'none',
        marginLeft:'5px'
    },
    alert:{
      color:'red',
      fontSize:'0.9rem'
    }
  }));

const Register=(props)=>{

    const classes = useStyles();
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const [user, setUser] = useState({ email: '', password: '', name:''});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
      };
      const handleSubmit = (e) => {
        e.preventDefault(); 
        if (user.email && user.password && user.name) {
            dispatch(register(user.name, user.email, user.password));
        }
      };

      useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);

    return(
        <Grid className={classes.image}>
            {loading && <Loading></Loading>}
            <div className={classes.form}>
            <Paper elevation={10} className={classes.paperStyle}>
                <Grid align='center'>
                     <Avatar className={classes.avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Register</h2>
                    <p className={classes.alert}>{error}</p>
                </Grid>
                <form>
                    <TextField label='Email' value={user.email} name='email' onChange={handleChange} className={classes.input} fullWidth required/>
                    <TextField label='Name' value={user.name} name='name' onChange={handleChange} className={classes.input} fullWidth required/>
                    <TextField label='Password' value={user.password} type='password' name='password' onChange={handleChange} fullWidth required/>
                    
                    <Button type='submit' color='primary' variant="contained" className={classes.btnstyle} onClick={handleSubmit} fullWidth>Register</Button>
                </form>
                
                
                <Typography > Already have an account? 
                     <Link to={`/login?redirect=${redirect}`} className={classes.link}>
                         Login 
                </Link>
                </Typography>
            </Paper>
            </div>
        </Grid>
    )
}

export default Register;