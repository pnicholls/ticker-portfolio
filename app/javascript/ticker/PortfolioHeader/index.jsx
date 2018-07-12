import React from "react";
import PropTypes from "prop-types";

const PortfolioHeader = props => (
  <section className="mnx1">
    <div className="container border-box px3 mt0 mb1">
      <div className="pt3 inline-block col-12 align-top">
        <h1 className="h3 mt0 mb1 regular">
          <b>{props.name}</b>
        </h1>
        <p className="muted smallest-text left-align">
          {props.isLoading
            ? "-"
            : "Market data may be delayed by up to 5 minutes."}
        </p>
      </div>
    </div>
  </section>
);

PortfolioHeader.defaultProps = {};

PortfolioHeader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string
};

export default PortfolioHeader;
