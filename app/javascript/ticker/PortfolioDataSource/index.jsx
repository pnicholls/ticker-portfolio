import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, graphql, compose } from "react-apollo";
import { appComponent } from "../App/index";
import {
  GET_PORTFOLIO,
  PORTFOLIO_SUBSCRIPTION,
  SECURITY_SUBSCRIPTION,
  GET_SECURITIES,
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

export function securitiesQuery() {
  return graphql(GET_SECURITIES, {
    name: "securitiesQuery"
  });
}

function createPortfolioSecurity(client, portfolio, security) {
  if (portfolio.editable) {
    client.mutate({
      variables: { portfolioID: portfolio.id, securityID: security.id },
      mutation: CREATE_PORTFOLIO_SECURITY_REMOTELY,
      update: (cache, data) => {
        const cachedData = cache.readQuery({
          query: GET_PORTFOLIO,
          variables: { id: data.data.createPortfolioSecurity.portfolio.id }
        });

        const security = {
          ...data.data.createPortfolioSecurity.security,
          quote: null,
          stats: null,
          charts: null
        };

        const updatedSecurities = _(cachedData.portfolio.securities)
          .concat([security])
          .uniqBy("id")
          .value();

        const updatedPortfolio = {
          id: cachedData.portfolio.id,
          name: cachedData.portfolio.name,
          editable: cachedData.portfolio.editable,
          persisted: cachedData.portfolio.editable,
          marketing: cachedData.portfolio.marketing,
          __typename: cachedData.portfolio.__typename,
          securities: updatedSecurities
        };

        cache.writeQuery({
          query: GET_PORTFOLIO,
          data: { portfolio: updatedPortfolio }
        });

        return null;
      }
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
  let subscriptions = [];

  return BaseComponent => {
    return class extends React.Component {
      render() {
        const portfolio = _.get(this, "props.portfolioQuery.portfolio", {
          name: "-",
          persisted: true,
          securities: []
        });

        const securities = _.get(this, "props.securitiesQuery.securities", []);

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

        return (
          <Query
            query={GET_PORTFOLIO}
            variables={{ id: this.props.portfolioId }}
          >
            {({ subscribeToMore, ...result }) => {
              const portfolioSecurities = _.get(
                result,
                "data.portfolio.securities",
                []
              );
              portfolioSecurities.forEach(security => {
                const subscription = () => {
                  subscribeToMore({
                    document: SECURITY_SUBSCRIPTION,
                    variables: { id: security.id }
                  });
                };

                if (!_.some(subscriptions, ["security.id", security.id])) {
                  subscription();
                  subscriptions.push({ security, subscription });
                }
              });

              subscriptions = _.filter(subscriptions, subscription => {
                return _.some(portfolioSecurities, [
                  "id",
                  subscription.security.id
                ]);
              });

              return (
                <BaseComponent
                  client={this.props.client}
                  portfolio={portfolio}
                  securities={securities}
                  addHandler={addHandler}
                  removeHandler={removeHandler}
                />
              );
            }}
          </Query>
        );
      }
    };
  };
}
