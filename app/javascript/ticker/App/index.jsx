import React from "react";
import { render } from "react-dom";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { GET_PORTFOLIO } from "../../src/lib/Queries";
import _ from "lodash";

const csrfToken = document
  .querySelector("meta[name=csrf-token]")
  .getAttribute("content");

const cache = new InMemoryCache();

const createPortfolioSecurity = (obj, variables, { cache, getCacheKey }) => {
  const cachedData = cache.readQuery({
    query: GET_PORTFOLIO,
    variables: { id: variables.portfolio.id }
  });

  const security = {
    ...variables.security,
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
};

const destroyPortfolioSecurity = (obj, variables, { cache, getCacheKey }) => {
  const cachedData = cache.readQuery({
    query: GET_PORTFOLIO,
    variables: { id: variables.portfolio.id }
  });

  const updatedPortfolio = {
    id: cachedData.portfolio.id,
    name: cachedData.portfolio.name,
    editable: cachedData.portfolio.editable,
    persisted: cachedData.portfolio.editable,
    marketing: cachedData.portfolio.marketing,
    __typename: cachedData.portfolio.__typename,
    securities: _.reject(cachedData.portfolio.securities, existingSecurity => {
      return variables.security.id === existingSecurity.id;
    })
  };

  cache.writeQuery({
    query: GET_PORTFOLIO,
    data: { portfolio: updatedPortfolio }
  });

  return null;
};

const portfolioQuery = () => {
  console.log("wtf");
};

const stateLink = withClientState({
  cache,
  defaults: { persisted: true },
  resolvers: {
    Mutation: {
      createPortfolioSecurity,
      destroyPortfolioSecurity
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: "/graphql",
      credentials: "same-origin",
      headers: {
        "X-CSRF-Token": csrfToken
      }
    })
  ]),
  cache: cache
});

export function appComponent() {
  return BaseComponent => {
    return class extends React.Component {
      render() {
        return (
          <ApolloProvider client={client}>
            <BaseComponent client={client} {...this.props} />
          </ApolloProvider>
        );
      }
    };
  };
}
