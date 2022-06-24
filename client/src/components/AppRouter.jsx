import React from 'react';
import { useContext } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element} exact/>
            )}
            {publicRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element} exact/>
            )}
            <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
    );
};

export default AppRouter;