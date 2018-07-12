import React from "react";
import ReactDOM from "react-dom";
import Portfolio from "ticker/Portfolio/index";

const portfolio = document.querySelector(".portfolio");
const id = portfolio.dataset.id;
ReactDOM.render(<Portfolio id={Number(id)} />, portfolio);
