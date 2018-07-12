import React from "react";
import PropTypes from "prop-types";
import { appComponent } from "../App/index";
import gql from "graphql-tag";
import { Mutation, Query, graphql, compose } from "react-apollo";
import _ from "lodash";
import PortfolioHeader from "../PortfolioHeader/index";
import { defaultFundamentalsData } from "../../src/lib/Fundamentals";
import Fundamentals from "../Fundamentals/index";

const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      id
      name
      securities {
        id
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

const CREATE_PORTFOLIO_SECURITY = gql`
  mutation createPortfolioSecurity($portfolioID: ID!, $securityID: ID!) {
    createPortfolioSecurity(
      portfolioID: $portfolioID
      securityID: $securityID
    ) {
      security {
        id
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

const DESTROY_PORTFOLIO_SECURITY = gql`
  mutation destroyPortfolioSecurity($portfolioID: ID!, $securityID: ID!) {
    destroyPortfolioSecurity(
      portfolioID: $portfolioID
      securityID: $securityID
    ) {
      security {
        id
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
const Portfolio = props => {
  const loading = _.get(props, "data.loading", false);
  const name = _.get(props, "data.portfolio.name", "-");
  const securities = _.get(props, "data.portfolio.securities", []);
  const addHandler = ({ id }) =>
    props.createPortfolioSecurity({
      variables: {
        portfolioID: Number(props.id),
        securityID: Number(id)
      },
      update: (
        cache,
        {
          data: {
            createPortfolioSecurity: { security }
          }
        }
      ) => {
        const cachedData = cache.readQuery({
          query: GET_PORTFOLIO,
          variables: { id: props.id }
        });

        const updatedPortfolio = {
          id: cachedData.portfolio.id,
          name: cachedData.portfolio.name,
          __typename: cachedData.portfolio.__typename,
          securities: _.concat(cachedData.portfolio.securities, [security])
        };

        cache.writeQuery({
          query: GET_PORTFOLIO,
          data: { portfolio: updatedPortfolio }
        });
      }
    });

  const removeHandler = ({ id }) =>
    props.destroyPortfolioSecurity({
      variables: {
        portfolioID: Number(props.id),
        securityID: Number(id)
      },
      update: (
        cache,
        {
          data: {
            destroyPortfolioSecurity: { security }
          }
        }
      ) => {
        const cachedData = cache.readQuery({
          query: GET_PORTFOLIO,
          variables: { id: props.id }
        });

        const updatedPortfolio = {
          id: cachedData.portfolio.id,
          name: cachedData.portfolio.name,
          __typename: cachedData.portfolio.__typename,
          securities: _.reject(
            cachedData.portfolio.securities,
            existingSecurity => {
              return existingSecurity.id === security.id;
            }
          )
        };

        cache.writeQuery({
          query: GET_PORTFOLIO,
          data: { portfolio: updatedPortfolio }
        });
      }
    });

  return (
    <div className="container">
      <div
        className="rounded bg-white shadow-small"
        style={{ minHeight: "1000px" }}
      >
        <PortfolioHeader isLoading={loading} name={name} />
        <Fundamentals
          data={securities}
          addHandler={addHandler}
          removeHandler={removeHandler}
        />
      </div>
    </div>
  );
};

Portfolio.defaultProps = {};

Portfolio.propTypes = {
  id: PropTypes.number.isRequired
};

const enhancedPortfolio = compose(
  appComponent(),
  graphql(GET_PORTFOLIO, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 1000 * 30 })
  }),
  graphql(CREATE_PORTFOLIO_SECURITY, { name: "createPortfolioSecurity" }),
  graphql(DESTROY_PORTFOLIO_SECURITY, { name: "destroyPortfolioSecurity" })
)(Portfolio);

export default enhancedPortfolio;
