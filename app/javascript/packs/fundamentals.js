import React from "react";
import ReactDOM from "react-dom";
import Fundamentals from "ticker/fundamentals/index";

const fundamentals = document.querySelector(".fundamentals");
const portfolioId = fundamentals.dataset.portfolioId;
ReactDOM.render(
  <Fundamentals portfolioId={Number(portfolioId)} />,
  fundamentals
);
