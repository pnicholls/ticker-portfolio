import React from "react";
import { render } from "react-dom";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const csrfToken = document
  .querySelector("meta[name=csrf-token]")
  .getAttribute("content");

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/graphql",
    credentials: "same-origin",
    headers: {
      "X-CSRF-Token": csrfToken
    }
  }),
  cache: new InMemoryCache()
});

const App = () => <div />;

export function appComponent(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <WrappedComponent client={client} {...this.props} />
        </ApolloProvider>
      );
    }
  };
}

export default App;
