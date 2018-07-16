import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { appComponent } from "../App/index";
import {
  GET_PORTFOLIO,
  CREATE_PORTFOLIO_SECURITY_LOCALLY,
  DESTROY_PORTFOLIO_SECURITY_LOCALLY
} from "../../src/lib/Queries";

export function portfolioQuery() {
  return graphql(GET_PORTFOLIO, {
    options: ({ id }) => ({ variables: { id } })
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
        const loading = _.get(this.props, "data.loading", false);
        const name = _.get(this.props, "data.portfolio.name", "-");
        const securities = _.get(this.props, "data.portfolio.securities", []);
        const addHandler = security => {
          return createPortfolioSecurity(
            this.props.client,
            this.props.data.portfolio,
            security
          );
        };
        const removeHandler = security => {
          return destroyPortfolioSecurity(
            this.props.client,
            this.props.data.portfolio,
            security
          );
        };

        return (
          <BaseComponent
            loading={loading}
            name={name}
            securities={securities}
            persisted={true}
            addHandler={addHandler}
            removeHandler={removeHandler}
          />
        );
      }
    };
  };
}
