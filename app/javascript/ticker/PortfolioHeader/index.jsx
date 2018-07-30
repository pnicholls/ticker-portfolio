import React from "react";
import PropTypes from "prop-types";

const SaveButton = props => {
  if (props.persisted) {
    return null;
  }

  return (
    <button
      className="h6 btn btn-small btn-outline blue bg-light-silver-on-hover mr3 mt1 right"
      onClick={props.saveHandler}
    >
      Save Portfolio
    </button>
  );
};

const NavMenu = props => {
  function classForItem(item) {
    return item === props.selectedNavItem ? "blue" : "";
  }

  return (
    <div className="mxn1 right md-show border-bottom">
      <a
        href={`#overview`}
        onClick={event => {
          props.navMenuHandler("overview", event);
        }}
        className={`btn btn-outline-none h6 blue-on-hover ${classForItem(
          "overview"
        )}`}
      >
        Overview
      </a>
      <a
        href={`/#performance`}
        onClick={event => {
          props.navMenuHandler("performance", event);
        }}
        className={`btn btn-outline-none h6 blue-on-hover ${classForItem(
          "performance"
        )}`}
      >
        Performance
      </a>
      <a
        href={`/#fundamentals`}
        onClick={event => {
          props.navMenuHandler("fundamentals", event);
        }}
        className={`btn btn-outline-none h6 blue-on-hover ${classForItem(
          "fundamentals"
        )}`}
      >
        Fundamentals
      </a>
      <a
        href={`/#transactions`}
        onClick={event => {
          props.navMenuHandler("transactions", event);
        }}
        className={`btn btn-outline-none h6 blue-on-hover ${classForItem(
          "transactions"
        )}`}
      >
        Transactions
      </a>
    </div>
  );
};

const PortfolioHeader = props => (
  <section className="mnx1">
    <div className="container border-box px3 mt0 mb1">
      <div className="pt3 inline-block col-12 align-top">
        <NavMenu
          selectedNavItem={props.selectedNavItem}
          navMenuHandler={props.navMenuHandler}
        />
        <SaveButton
          persisted={props.persisted}
          saveHandler={props.saveHandler}
        />
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
  name: PropTypes.string.isRequired,
  saveHandler: PropTypes.func.isRequired
};

export default PortfolioHeader;
