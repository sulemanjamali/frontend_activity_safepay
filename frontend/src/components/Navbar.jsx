import React from "react";
import safePayLogo from "../assets/Safepay-logo-01.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="safepay-navbar">
      <div className="container">
        <div className="safepay-container">
        <div className="safepay-logo">
             <img src={safePayLogo} className="logo" alt="Vite logo"  height={50} width={100}/>
        </div>
                <ul className="">
                    <li className="">
                        <Link to='/home'>Home</Link>
                    </li>
                    <li className="">
                        <Link to='/info'>Info</Link>
                    </li>
                </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
