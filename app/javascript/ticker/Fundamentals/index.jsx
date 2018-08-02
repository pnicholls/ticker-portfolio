import React from "react";
import PropTypes from "prop-types";
import FundamentalsTable from "../FundamentalsTable/index";

const Fundamentals = props => (
  <section>
    <div className="large-container px3 border-box">
      <FundamentalsTable securities={props.securities} />
    </div>
  </section>
);

Fundamentals.defaultProps = {};
Fundamentals.propTypes = {
  securities: PropTypes.array.isRequired
};

export default Fundamentals;
