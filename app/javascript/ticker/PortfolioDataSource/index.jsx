import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { appComponent } from "../App/index";
import {
  GET_PORTFOLIO,
  GET_PORTFOLIO_OVERVIEW,
  GET_PORTFOLIO_PERFORMANCE,
  GET_PORTFOLIO_FUNDAMENTALS,
  GET_PORTFOLIO_TRANSACTIONS,
  GET_SECURITIES_WITHOUT_QUOTES,
  CREATE_PORTFOLIO_SECURITY_LOCALLY,
  CREATE_PORTFOLIO_SECURITY_REMOTELY,
  DESTROY_PORTFOLIO_SECURITY_LOCALLY,
  DESTROY_PORTFOLIO_SECURITY_REMOTELY
} from "../../src/lib/Queries";

export function portfolioRootQuery() {
  return graphql(GET_PORTFOLIO, {
    name: "portfolioQuery",
    options: ({ portfolioId }) => ({ variables: { id: portfolioId } })
  });
}

export function portfolioOverviewQuery() {
  return graphql(GET_PORTFOLIO_OVERVIEW, {
    name: "portfolioOverviewQuery",
    options: ({ portfolioId }) => ({ variables: { id: portfolioId } })
  });
}

export function portfolioPerformanceQuery() {
  return graphql(GET_PORTFOLIO_PERFORMANCE, {
    name: "portfolioPerformanceQuery",
    options: ({ portfolioId }) => ({ variables: { id: portfolioId } })
  });
}

export function portfolioFundamentalsQuery() {
  return graphql(GET_PORTFOLIO_FUNDAMENTALS, {
    name: "portfolioFundamentalsQuery",
    options: ({ portfolioId }) => ({ variables: { id: portfolioId } })
  });
}

export function portfolioTransactionsQuery() {
  return graphql(GET_PORTFOLIO_TRANSACTIONS, {
    name: "portfolioTransactionsQuery",
    options: ({ portfolioId }) => ({ variables: { id: portfolioId } })
  });
}

export function securitiesQuery() {
  return graphql(GET_SECURITIES_WITHOUT_QUOTES, {
    name: "securitiesQuery"
  });
}

function createPortfolioSecurity(client, portfolio, security) {
  if (portfolio.editable) {
    client.mutate({
      variables: { portfolioID: portfolio.id, securityID: security.id },
      mutation: CREATE_PORTFOLIO_SECURITY_REMOTELY
    });
  } else {
    client.mutate({
      variables: { portfolio: portfolio, security: security },
      mutation: CREATE_PORTFOLIO_SECURITY_LOCALLY
    });
  }
}

function destroyPortfolioSecurity(client, portfolio, security) {
  if (portfolio.editable) {
    client.mutate({
      variables: { portfolioID: portfolio.id, securityID: security.id },
      mutation: DESTROY_PORTFOLIO_SECURITY_REMOTELY
    });
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
        const portfolio = _.get(this.props, "portfolioQuery.portfolio", {
          name: "-",
          persisted: true,
          securities: []
        });

        const overviewSecurities = _.get(
          this.props,
          "portfolioOverviewQuery.portfolio.securities",
          []
        );

        let mergedPortfolio = { ...portfolio, securities: overviewSecurities };

        const fundamentalsSecurities = _.get(
          this.props,
          "portfolioFundamentalsQuery.portfolio.securities",
          []
        );

        mergedPortfolio.securities = mergedPortfolio.securities.map(
          security => {
            const fundamentalsSecurity = fundamentalsSecurities.find(
              fundamentalsSecurity => {
                return security.id === fundamentalsSecurity.id;
              }
            );

            if (!fundamentalsSecurity) {
              return security;
            }

            let updatedSecurity = { ...security };

            if (fundamentalsSecurity.stats) {
              updatedSecurity.stats = fundamentalsSecurity.stats;
            }

            if (fundamentalsSecurity.charts) {
              updatedSecurity.charts = fundamentalsSecurity.charts;
            }

            return updatedSecurity;
          }
        );

        const securities = _.get(this.props, "securitiesQuery.securities", []);

        const addHandler = security => {
          return createPortfolioSecurity(
            this.props.client,
            portfolio,
            security
          );
        };

        const removeHandler = security => {
          return destroyPortfolioSecurity(
            this.props.client,
            portfolio,
            security
          );
        };

        this.props.portfolioOverviewQuery.startPolling(1000 * 30);
        this.props.portfolioPerformanceQuery.startPolling(1000 * 30);
        this.props.portfolioFundamentalsQuery.startPolling(1000 * 30);
        this.props.portfolioTransactionsQuery.startPolling(1000 * 30);

        return (
          <BaseComponent
            client={this.props.client}
            portfolio={mergedPortfolio}
            securities={securities}
            addHandler={addHandler}
            removeHandler={removeHandler}
          />
        );
      }
    };
  };
}
