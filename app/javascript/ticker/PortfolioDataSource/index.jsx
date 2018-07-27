import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { appComponent } from "../App/index";
import {
  GET_PORTFOLIO,
  GET_SECURITIES_WITHOUT_QUOTES,
  CREATE_PORTFOLIO_SECURITY_LOCALLY,
  CREATE_PORTFOLIO_SECURITY_REMOTELY,
  DESTROY_PORTFOLIO_SECURITY_LOCALLY,
  DESTROY_PORTFOLIO_SECURITY_REMOTELY
} from "../../src/lib/Queries";

export function portfolioQuery() {
  return graphql(GET_PORTFOLIO, {
    name: "portfolioData",
    options: ({ portfolioId }) => ({ variables: { id: portfolioId } })
  });
}

export function securitiesQuery() {
  return graphql(GET_SECURITIES_WITHOUT_QUOTES, {
    name: "securitiesData"
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
        const loading = _.get(this.props, "portfolioData.loading", false);
        const name = _.get(this.props, "portfolioData.portfolio.name", "-");
        const persisted = _.get(
          this.props,
          "portfolioData.portfolio.persisted",
          true
        );
        const marketing = _.get(
          this.props,
          "portfolioData.portfolio.marketing",
          null
        );
        const portfolioSecurities = _.get(
          this.props,
          "portfolioData.portfolio.securities",
          []
        );
        const securitiesLoading = _.get(
          this.props,
          "securitiesData.loading",
          false
        );
        const securities = _.get(this.props, "securitiesData.securities", []);
        const addHandler = security => {
          mixpanel.track("Added a Security", {
            "Portfolio ID": this.props.portfolioData.portfolio.id,
            Portfolio: this.props.portfolioData.portfolio.name,
            "Security ID": security.id,
            Security: security.name
          });

          return createPortfolioSecurity(
            this.props.client,
            this.props.portfolioData.portfolio,
            security
          );
        };
        const removeHandler = security => {
          mixpanel.track("Removed a Security", {
            "Portfolio ID": this.props.portfolioData.portfolio.id,
            Portfolio: this.props.portfolioData.portfolio.name,
            "Security ID": security.id,
            Security: security.name
          });

          return destroyPortfolioSecurity(
            this.props.client,
            this.props.portfolioData.portfolio,
            security
          );
        };

        return (
          <BaseComponent
            client={this.props.client}
            loading={loading}
            name={name}
            portfolioSecurities={portfolioSecurities}
            securitiesLoading={securitiesLoading}
            securities={securities}
            persisted={persisted}
            marketing={marketing}
            addHandler={addHandler}
            removeHandler={removeHandler}
          />
        );
      }
    };
  };
}
