import { observer } from 'mobx-react-lite';
import React, {useState} from 'react';
import { useContext } from 'react';
import { Card, Container, Form, Button} from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';



const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className="m-auto">{isLogin ? "Authorisation" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="E-mail..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}                    
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"                    
                    />
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isLogin ? 
                                <div>
                                    Don't have an account yet? <NavLink to={REGISTRATION_ROUTE}>Register now!</NavLink>
                                </div>
                                :
                                <div>
                                    If you have an account <NavLink to={LOGIN_ROUTE}>log in!</NavLink>
                                </div>
                            }
                            <Button
                                onClick={click}
                                variant={"outline-success"}
                            >
                                {isLogin ? "Log in" : "Register"}
                            </Button>
                        </div>
                </Form>  
            </Card>
        </Container>
    );
});

export default Auth;