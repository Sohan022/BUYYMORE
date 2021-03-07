import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../../actions/userActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'ZCOOL KuaiLe',
    fontSize:'30px'
  },
  appbar:{
    background: '#2E3B55',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    paddingLeft:'30px',
    paddingRight:'30px'
  },
  link:{
      color:'#fff',
      textDecoration:'none'
  },
  cart:{
    fontSize:'2rem',
  },
  dropdownIcon:{
    marginLeft:'3px',
    fontSize:'1.2rem'
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  list:{
    textDecoration:'none',
    color:'black',
    
  }
}));


export default function ButtonAppBar() {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const cart = useSelector((state)=> state.cart);
  const {cartItems} = cart;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={classes.root}>
      
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
          <Link to='/' className={classes.link}>BUYYMORE</Link>
            
          </Typography>
          <Button color="inherit">
            <Link to='/cart' className={classes.link}>
            <Badge
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                badgeContent={cartItems.length}
                color="secondary"
              >
                <ShoppingCartOutlinedIcon className={classes.cart}></ShoppingCartOutlinedIcon> 
              </Badge>
            </Link>
          </Button>
          { userInfo 
          ? <div >
           <Button
            color="inherit" 
            className={classes.profile} 
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
              {userInfo.name}
              <ExpandMoreIcon className={classes.dropdownIcon}></ExpandMoreIcon>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          {/* <MenuItem onClick={handleClose}>
                            <Link to='#' className={classes.list}>My Profile</Link>
                          </MenuItem> */}
                          {(userInfo.isAdmin)
                          ?<MenuItem onClick={handleClose}>
                            <Link to={`/${userInfo._id}/addproduct`} className={classes.list}>Add Product</Link>
                          </MenuItem>
                          : <MenuItem onClick={handleClose}>
                          <Link to='/allorder' className={classes.list}>Orders</Link>
                        </MenuItem>
                        }
                          <MenuItem onClick={handleClose}>
                            <Link to='/logout' onClick={logoutHandler} className={classes.list}>Logout</Link>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              
            </Button>
            </div>
          : <Button color="inherit">
              <Link to='/login' className={classes.link}>Login</Link>
            </Button>
        }
          
        </Toolbar>
      </AppBar>


    </div>
  );
}
