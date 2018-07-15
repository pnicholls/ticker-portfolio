import React from "react";
import ReactDOM from "react-dom";
import Logo from "ticker/Logo/index";

const logo = document.querySelector(".logo-container");
ReactDOM.render(<Logo symbol="DIA" />, logo);
