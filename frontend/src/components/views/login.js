import React, { useState, useEffect} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Loading from '../Loading';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../actions/userActions';


const useStyles = makeStyles((theme) => ({  
    
    image: {
      backgroundImage: 'url(https://images.unsplash.com/photo-1611095564350-2cbe940a8d99?ixid=MXwxMjA3fDF8MHxzZWFyY2h8MjF8fHNpZ258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60)',
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
        transform:' translate(-50%, -50%)',
        
    },
    link:{
      textDecoration:'none',

    },
    space:{
      marginLeft:'5px',
      textDecoration:'none'
    },
    alert:{
      color:'red',
      fontSize:'0.9rem'
    }
  }));

const Login=(props)=>{

    const classes = useStyles();
    // const history = useHistory();

    // const sendData = (user)=>{
    //     axios.post('/auth/signin',user)
    //     .then(res => history.push('/'))
    //     .catch(err => console.log(err));
    // }

    const [user, setUser] = useState({ email: '', password: ''});
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading, error } = userLogin;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
      };
      const handleSubmit = (e) => {
        e.preventDefault(); 
        if (user.email && user.password) {
          dispatch(login(user.email, user.password));
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
                    <h2>Login</h2>
                    <p className={classes.alert}>{error}</p>
                </Grid>
                <form>
                    <TextField label='Email' value={user.email} name='email' onChange={handleChange} className={classes.input} fullWidth required/>
                    <TextField label='Password' value={user.password} type='password' name='password' onChange={handleChange} fullWidth required/>
                    
                    <Button type='submit' color='primary' variant="contained" className={classes.btnstyle} onClick={handleSubmit} fullWidth>Login</Button>
                </form>
                <Typography >
                     <Link href="#" className={classes.link}>
                        Forgot password?
                </Link>
                </Typography>
                <Typography > Don't have an account? 
                     <Link to={`/register?redirect=${redirect}`} className={classes.link, classes.space}>
                         Register
                </Link>
                </Typography>
            </Paper>
            </div>
        </Grid>
    )
}

export default Login