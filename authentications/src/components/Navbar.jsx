import React, { useEffect, useState } from "react";
import './Navbar.css';
import { NavLink } from "react-router-dom";
import profileimg from '../assets/img10.webp';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './store';

const Navbar = () => {
  // const [userData, setUserData] = useState({});

  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let loginUserData = localStorage.getItem('user');
  const [displayName, setDisplayName] = useState("");

  const getuser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/login/success", { withCredentials: true });
      // setUserData(res.data.user);
      console.log("response", res);
      dispatch(setUser(res.data.user));

      if (res.data.user.fullName) {
        setDisplayName(res.data.user.fullName);
      }
    }
    catch (err) {
      console.log("Error Fetching User", err);
    }
  }

  useEffect(() => {
    let loginUserData = localStorage.getItem('user');
    if (loginUserData) {
      dispatch(setUser(JSON.parse(loginUserData)));
      setDisplayName(JSON.parse(loginUserData).fullName);
    }

    getuser();
  }, [loginUserData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.open("http://localhost:3001/logout", "_self")
    dispatch(clearUser());
  }

  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-12 mx-auto">
            <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between pe-2 ps-2">
              <NavLink className="navbar-brand" to="/">Analog's</NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink activeClassName="menu_active" className="nav-link" aria-current="page" to="/">Home</NavLink>
                  </li>
                  {
                    Object.keys(userData).length > 0 ? (
                      <>

                        <li>
                          <NavLink activeClassName="menu_active" className="nav-link" aria-current="page" to="/" onClick={handleLogout}>Logout</NavLink>
                        </li>
                        <li>
                          <div className="nav-link text-dark" style={{ fontWeight: 'bold' }}>{displayName}</div>
                        </li>
                      </>

                    )
                      :
                      <>
                        <li className="nav-item">
                          <NavLink activeClassName="menu_active" className="nav-link" to="/signup">Signup</NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink activeClassName="menu_active" className="nav-link" to="/login">Login</NavLink>
                        </li>
                      </>
                  }

                  <li className="nav-item">
                    <img src={userData.image ? userData.image : profileimg} alt="Profile pic" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>);
}

export default Navbar;