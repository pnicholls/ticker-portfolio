import React from "react";
import PropTypes from "prop-types";
import FundamentalsTable from "../FundamentalsTable/index";
import AddSecurityForm from "../AddSecurityForm/index";

const Fundamentals = props => (
  <section>
    <div className="container px3 border-box">
      <FundamentalsTable
        data={props.data}
        removeHandler={props.removeHandler}
      />
    </div>
    <div className="px2 pt2">
      <AddSecurityForm
        addHandler={props.addHandler}
        removeHandler={props.removeHandler}
      />
    </div>
  </section>
);

Fundamentals.defaultProps = {};

Fundamentals.propTypes = {
  data: PropTypes.array.isRequired,
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default Fundamentals;
