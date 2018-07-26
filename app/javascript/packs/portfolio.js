import React from "react";
import ReactDOM from "react-dom";
import Portfolio from "ticker/Portfolio/index";

const portfolio = document.querySelector(".portfolio");
const portfolioId = portfolio.dataset.portfolioId;
ReactDOM.render(<Portfolio portfolioId={Number(portfolioId)} />, portfolio);
