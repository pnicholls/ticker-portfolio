import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { appComponent } from "../app/index";
import FundamentalsTable from "../fundamentals_table/index";

const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      name
      securities {
        name
        symbol
        quote {
          latestPrice
          changePercent
          marketCap
          latestVolume
          open
          high
          low
        }
      }
    }
  }
`;

const defaultData = [...Array(4)].map((_, i) => ({
  name: "...",
  symbol: "...",
  quote: {
    latestPrice: "...",
    changePercent: "...",
    marketCap: "...",
    latestVolume: "...",
    open: "...",
    high: "...",
    low: "...",
    daysGain: "..."
  }
}));

const Fundamentals = props => (
  <Query
    query={GET_PORTFOLIO}
    variables={{ id: props.portfolioId }}
    pollInterval={30 * 1000}
  >
    {({ loading, error, data }) => {
      if (error) return `Error! ${error.message}`;
      data =
        Object.keys(data).length !== 0
          ? data.portfolio.securities
          : defaultData;

      return <FundamentalsTable {...props} data={data} />;
    }}
  </Query>
);

const AppFundamentals = appComponent(Fundamentals);

Fundamentals.defaultProps = {};

Fundamentals.propTypes = {
  portfolioId: PropTypes.number.isRequired
};

export default AppFundamentals;
