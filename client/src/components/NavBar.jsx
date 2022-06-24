import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button, Container} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'



const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "white"}} to={SHOP_ROUTE}>Device DOM</NavLink>
                {user.isAuth 
                    ?
                    <Nav style={{marginLeft: "auto"}}>
                        <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Admin panel</Button>
                        <Button variant={"outline-light"} style={{marginLeft: 10}} onClick={() => navigate(BASKET_ROUTE)}>Cart</Button>
                        <Button variant={"outline-light"} style={{marginLeft: 10}} onClick={() => logOut()}>Log out</Button>
                    </Nav>
                    :
                    <Nav style={{marginLeft: "auto"}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Authorize</Button>
                    </Nav>
                } 
            </Container>
        </Navbar>
    );
});

export default NavBar;