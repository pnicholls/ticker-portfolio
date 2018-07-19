import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { appComponent } from "../App/index";
import {
  GET_PORTFOLIO,
  GET_SECURITIES,
  CREATE_PORTFOLIO_SECURITY_LOCALLY,
  DESTROY_PORTFOLIO_SECURITY_LOCALLY
} from "../../src/lib/Queries";

export function portfolioQuery() {
  return graphql(GET_PORTFOLIO, {
    name: "portfolioData",
    options: ({ id }) => ({ variables: { id } })
  });
}

export function securitiesQuery() {
  return graphql(GET_SECURITIES, {
    name: "securitiesData"
  });
}

function createPortfolioSecurity(client, portfolio, security) {
  if (portfolio.editable) {
    console.log("editable!");
  } else {
    client.mutate({
      variables: { portfolio: portfolio, security: security },
      mutation: CREATE_PORTFOLIO_SECURITY_LOCALLY
    });
  }
}

function destroyPortfolioSecurity(client, portfolio, security) {
  if (portfolio.editable) {
    console.log("editable!");
  } else {
    client.mutate({
      variables: { portfolio: portfolio, security: security },
      mutation: DESTROY_PORTFOLIO_SECURITY_LOCALLY
    });
  }
}

export function portfolioDataSource() {
  return BaseComponent => {
    return class extends React.Component {
      render() {
        const loading = _.get(this.props, "portfolioData.loading", false);
        const name = _.get(this.props, "portfolioData.portfolio.name", "-");
        const persisted = _.get(
          this.props,
          "portfolioData.portfolio.persisted",
          true
        );
        const portfolioSecurities = _.get(
          this.props,
          "portfolioData.portfolio.securities",
          []
        );
        const securities = _.get(this.props, "securitiesData.securities", []);
        const addHandler = security => {
          return createPortfolioSecurity(
            this.props.client,
            this.props.portfolioData.portfolio,
            security
          );
        };
        const removeHandler = security => {
          return destroyPortfolioSecurity(
            this.props.client,
            this.props.portfolioData.portfolio,
            security
          );
        };

        return (
          <BaseComponent
            loading={loading}
            name={name}
            portfolioSecurities={portfolioSecurities}
            securities={securities}
            persisted={persisted}
            addHandler={addHandler}
            removeHandler={removeHandler}
          />
        );
      }
    };
  };
}
