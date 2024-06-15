
import * as React from 'react';
import Signup from './components/Signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Error from './components/Error';
import Forgotpassword from './components/Forgotpassword';
import Resetpassword from './components/Resetpassword';


function Home() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' Component={HomePage}></Route>
                <Route path="/signup" Component={Signup}></Route>
                <Route path="/login" Component={Login}></Route>
                <Route path='/forgotpassword' Component={Forgotpassword}></Route>
                <Route path='/resetpassword/:id/:token' Component={Resetpassword}></Route>

                <Route path='*' Component={Error}></Route>
            </Routes>

        </>
    )
}

export default Home
