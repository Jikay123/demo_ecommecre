import { Avatar, Button, Collapse, IconButton, List, ListItem, ListItemIcon } from '@material-ui/core'
import { ExpandLess, ExpandMore, ShoppingCart } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../Firebase'

function Nav() {
    const [user, setUser] = useState([])
    const [open, setOpen] = useState(false)
    const [choose, setChoose] = useState(false);
    const cart = useSelector(state => state.cart.data);
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        })

    }, [user])

    const handeMoveCart = () => {
        history.push('/cart')
    }

    const handleMoveLogin = () => {
        history.push('/login');
    }

    const handleLogout = () => {
        auth.signOut();
        history.push('/login')
    }
    const handleGoHome = () => {
        setChoose(false);
        setTimeout(() => {
            history.push('/');
        }, 720)
    }
    const handleGoShop = () => {
        setChoose(false);
        setTimeout(() => {
            history.push('/smartphone');
        }, 720)
    }
    const handleGoContact = () => {
        setChoose(false);
        setTimeout(() => {
            // history.push('/');
            history.push('#contact');
        }, 720)
    }

    return (
        <nav className="navbar">
            <img onClick={() => history.push('/')} src=" ../Assets/logo.png"
                alt="logo" className="navbar__logo" />
            <ul className={"navbar__item " + (choose === true ? "open" : "")}>
                <li onClick={handleGoHome}>Home</li>
                <li onClick={handleGoShop}>Shop</li>
                <li onClick={handleGoContact}>Contact</li>
            </ul>
            <div className="navbar__info">
                <div className="navbar__info--cart">
                    <Button className="button--cart" onClick={handeMoveCart}>
                        <ShoppingCart />
                        <p className="quantity">{cart.length}</p>
                    </Button>
                </div>
                {user.email ? (
                    <div style={{ position: "relative" }}>
                        <ListItem onClick={() => setOpen(!open)} style={{ cursor: "pointer" }} >
                            <ListItemIcon >
                                <Avatar src={user.photoURL}>{user.photoURL ? "" : user.displayName?.charAt(0)}</Avatar>
                            </ListItemIcon>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse style={{ position: "absolute", background: "#fff", borderRadius: '8px', width: '100px' }} in={open} timeout="auto">
                            <List component="div" >
                                <ListItem style={{ display: 'flex', flexDirection: 'column', width: '100%' }} >
                                    <ListItemIcon style={{ display: 'block', width: '100%' }}>
                                        <Button onClick={handleLogout}>Logout</Button>
                                    </ListItemIcon>
                                    <ListItemIcon>
                                        <Button onClick={() => history.push('/historis')}>History</Button>
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </Collapse>

                    </div>

                ) : (<Button onClick={handleMoveLogin} variant="contained" className="navbar__info--login">
                    Login
                </Button>)}
                <div className="hamburger" onClick={() => setChoose(!choose)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
