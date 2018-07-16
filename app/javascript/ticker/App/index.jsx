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

const stateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {
    Mutation: {
      createPortfolioSecurity: (unknown, variables, { cache, getCacheKey }) => {
        const cachedData = cache.readQuery({
          query: GET_PORTFOLIO,
          variables: { id: variables.portfolio.id }
        });

        const updatedPortfolio = {
          id: cachedData.portfolio.id,
          name: cachedData.portfolio.name,
          default: cachedData.portfolio.default,
          editable: cachedData.portfolio.editable,
          __typename: cachedData.portfolio.__typename,
          securities: _.concat(cachedData.portfolio.securities, [
            variables.security
          ])
        };

        cache.writeQuery({
          query: GET_PORTFOLIO,
          data: { portfolio: updatedPortfolio }
        });

        return null;
      },
      destroyPortfolioSecurity: (
        unknown,
        variables,
        { cache, getCacheKey }
      ) => {
        const cachedData = cache.readQuery({
          query: GET_PORTFOLIO,
          variables: { id: variables.portfolio.id }
        });

        const updatedPortfolio = {
          id: cachedData.portfolio.id,
          name: cachedData.portfolio.name,
          default: cachedData.portfolio.default,
          editable: cachedData.portfolio.editable,
          __typename: cachedData.portfolio.__typename,
          securities: _.reject(
            cachedData.portfolio.securities,
            existingSecurity => {
              return variables.security.id === existingSecurity.id;
            }
          )
        };

        cache.writeQuery({
          query: GET_PORTFOLIO,
          data: { portfolio: updatedPortfolio }
        });

        return null;
      }
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: "http://localhost:3000/graphql",
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
