import React from "react";
import PropTypes from "prop-types";

function SaveButton(props) {
  if (props.persisted) {
    return null;
  }

  return (
    <button className="h6 btn btn-small btn-outline  blue bg-light-silver-on-hover right">
      Save Portfolio
    </button>
  );
}

const PortfolioHeader = props => (
  <section className="mnx1">
    <div className="container border-box px3 mt0 mb1">
      <div className="pt3 inline-block col-12 align-top">
        <SaveButton persisted={props.persisted} />
        <h1 className="h3 mt0 mb1 regular">
          <b>{props.name}</b>
        </h1>
        <p className="muted smallest-text left-align">
          {props.loading
            ? "-"
            : "Market data may be delayed by up to 5 minutes."}
        </p>
      </div>
    </div>
  </section>
);

PortfolioHeader.defaultProps = {};

PortfolioHeader.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
};

export default PortfolioHeader;
