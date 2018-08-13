import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query, graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { SECURITY_SUBSCRIPTION } from "../../src/lib/Queries";
import { appComponent } from "../App/index";
import numeral from "numeral";
import _ from "lodash";

const SECURITY_QUERY = gql`
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

  if (security === null || security.quote === null) {
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
  return (
    <Query query={SECURITY_QUERY} variables={{ symbol: props.symbol }}>
      {({ subscribeToMore, ...result }) => {
        const security = _.get(result, "data.security", {
          id: null,
          quote: {
            changePercent: null
          }
        });

        if (security.id) {
          subscribeToMore({
            document: SECURITY_SUBSCRIPTION,
            variables: { id: security.id }
          });
        }

        const changePercent = _.get(security, "quote.changePercent", null);
        const configuration = configurationForChangechangePercent(
          changePercent
        );
        const title = titleForSecurity(security);

        return (
          <a
            href="/"
            className={`logo ${configuration.class} fill-${
              configuration.color
            } bg-${configuration.color}`}
          >
            <svg
              className="align-middle"
              viewBox="0 0 5 5"
              width={props.width}
              height={props.height}
            >
              <title>{title}</title>
              <rect width={props.width} height={props.height} />
            </svg>
          </a>
        );
      }}
    </Query>
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

const enhancedLogo = compose(appComponent())(Logo);

export default enhancedLogo;
