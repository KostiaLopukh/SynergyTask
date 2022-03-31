import React from 'react';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import Users from "./pages/Users/Users";
import Groups from "./pages/Groups/Groups";
import css from './App.module.css';

const App = () => {
    return (
        <div>
            <div className={css.navigate}>
                <NavLink to={'/users'}
                         className={({isActive}) => isActive ? css.active : css.notActive}>Users</NavLink>
                <NavLink to={'/groups'}
                         className={({isActive}) => isActive ? css.active : css.notActive}>Groups</NavLink>
            </div>
            <Routes>
                <Route path={'/users'} element={<Users/>}/>
                <Route path={'/groups'} element={<Groups/>}/>
            </Routes>
        </div>
    );
};

export default App;
