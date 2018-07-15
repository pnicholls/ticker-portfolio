import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query, graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { appComponent } from "../App/index";
import _ from "lodash";

function configurationForChangechangePercent(changePercent) {
  const styleClass = changePercent === 0 ? "muted" : "";

  let color = "black";
  if (changePercent > 0) {
    color = "green";
  }

  if (changePercent < 0) {
    color = "red";
  }

  return { class: styleClass, color: color };
}

function titleForChangeChangePercent(changePercent) {
  let title = "Ticker home";

  if (changePercent > 0) {
    title = "The market is up";
  }

  if (changePercent < 0) {
    title = "The market is down";
  }

  return title;
}

const Logo = props => {
  const changePercent = _.get(props, "data.security.quote.changePercent", 0);
  const configuration = configurationForChangechangePercent(changePercent);
  const title = titleForChangeChangePercent(changePercent);

  return (
    <div>
      <a
        href="/"
        className={`logo block border-box left relative z1 bg-clip-content ${
          configuration.class
        } fill-${configuration.color} bg-${configuration.color}`}
      >
        <svg className="align-middle" viewBox="0 0 5 5" width={28} height={28}>
          <title>{title}</title>
          <path d="M0,0v5h5V0z M1,1h3v3H2V3H1z" />
        </svg>
      </a>
      <a
        href="/"
        className="h5 align-middle inline-block no-underline-on-hover black blue-on-hover logo-text"
        title="Ticker home"
      >
        <p className="mb0 mt0 align-middle sm-show nowrap">
          <b>Ticker</b> App
        </p>
      </a>
    </div>
  );
};

Logo.defaultProps = {
  symbol: "DIA"
};

Logo.propTypes = {
  symbol: PropTypes.string.isRequired
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
    options: ({ symbol }) => ({
      variables: { symbol },
      pollInterval: 1000 * 60 * 1
    })
  })
)(Logo);

export default enhancedLogo;
