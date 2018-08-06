import React from "react";
import PropTypes from "prop-types";
import OverviewTable from "../OverviewTable/index";

const Overview = props => (
  <section>
    <div className="large-container px3 border-box">
      <OverviewTable
        securities={props.securities}
        removeHandler={props.removeHandler}
      />
    </div>
  </section>
);

Overview.defaultProps = {};

Overview.propTypes = {
  securities: PropTypes.array.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default Overview;
