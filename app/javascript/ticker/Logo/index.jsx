import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query, graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { appComponent } from "../App/index";
import numeral from "numeral";
import _ from "lodash";

function configurationForChangechangePercent(changePercent) {
  const styleClass = changePercent === null ? "muted" : "";

  let color = "black";
  if (changePercent > 0) {
    color = "green";
  }

  if (changePercent < 0) {
    color = "red";
  }

  return { class: styleClass, color: color };
}

function titleForSecurity(security) {
  let title = "Ticker home";

  if (security === null) {
    return title;
  }

  const changePercent = security.quote.changePercent;
  if (changePercent === 0) {
    return `The ${security.name} is unchanged`;
  }

  const direction = changePercent > 0 ? "up" : "down";
  const change = numeral(security.quote.changePercent)
    .format("0.00%")
    .toUpperCase();

  return `The ${security.name} is ${direction} ${change}`;
}

const Logo = props => {
  const security = _.get(props, "data.security", null);
  const changePercent = _.get(props, "data.security.quote.changePercent", null);
  const configuration = configurationForChangechangePercent(changePercent);
  const title = titleForSecurity(security);

  if (changePercent === null) {
    props.data.startPolling(1000 * 30);
  }

  return (
    <a
      href="/"
      className={`logo ${configuration.class} fill-${configuration.color} bg-${
        configuration.color
      }`}
    >
      <svg
        className="align-middle"
        viewBox="0 0 5 5"
        width={props.width}
        height={props.height}
      >
        <title>{title}</title>
        <path d="M0,0v5h5V0z M1,1h3v3H2V3H1z" />
      </svg>
    </a>
  );
};

Logo.defaultProps = {
  symbol: "DIA",
  height: 28,
  width: 28
};

Logo.propTypes = {
  symbol: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};

const GET_SECURITY = gql`
  query Security($symbol: String!) {
    security(symbol: $symbol) {
      id
      name
      symbol
      quote {
        changePercent
      }
    }
  }
`;

const enhancedLogo = compose(
  appComponent(),
  graphql(GET_SECURITY, {
    options: props => ({
      variables: { symbol: props.symbol },
      pollInterval: 1000 * 0.5
    })
  })
)(Logo);

export default enhancedLogo;
