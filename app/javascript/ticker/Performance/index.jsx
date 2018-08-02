import React from "react";
import PropTypes from "prop-types";
import PerformanceTable from "../PerformanceTable/index";

const Performance = props => (
  <section>
    <div className="large-container px3 border-box">
      <PerformanceTable securities={props.securities} />
    </div>
  </section>
);

Performance.defaultProps = {};
Performance.propTypes = {
  securities: PropTypes.array.isRequired
};

export default Performance;
