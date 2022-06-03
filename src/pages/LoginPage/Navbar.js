import React from "react";
import { NavLink } from "react-router-dom";
import Home from "./Home";

const Navbar =()=>{
    return (
        <div id="header">
        <div className="container">
            <div className="navbar">
                <nav className="navleft v-res-hight ">
                    <ul className="list v-resp" id="menuitems">
                    <li><NavLink to="/">Home</NavLink></li> 
                        <li><NavLink to="/login">Login</NavLink></li>   
                    </ul>
            
                </nav>
            </div>
            </div>
            </div>
    )
    
}

export default Navbar;