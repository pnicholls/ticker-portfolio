import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Portfolio = props => (
  <div>
    <div />
    This is the table
  </div>
);

Portfolio.defaultProps = {
  name: "World"
};

Portfolio.propTypes = {
  name: PropTypes.string
};

export default Portfolio;
