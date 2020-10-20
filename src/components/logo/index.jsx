/*
    logo组件
 */
import React from "react";

import logo from "./logo.png";
import "./index.css";

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={logo} alt="logo" className="logo-img"/>
        </div>
    )
}