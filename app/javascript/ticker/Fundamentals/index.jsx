import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import FundamentalsTable from "../FundamentalsTable/index";
import AddSecurityForm from "../AddSecurityForm/index";
import SecuritiesSelect from "../SecuritiesSelect/index";

const GET_SECURITIES = gql`
  query Securities($id: [ID!]!) {
    securities(id: $id) {
      id
      symbol
      name
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
`;

const Fundamentals = props => {
  const ids = props.portfolioSecurities.map(security => security.id);
  return (
    <Query
      query={GET_SECURITIES}
      variables={{ id: ids }}
      pollInterval={1000 * 30}
    >
      {({ loading, error, data }) => {
        const securities = data.securities || props.portfolioSecurities;
        return (
          <section>
            <div className="container px3 border-box">
              <FundamentalsTable
                data={securities}
                removeHandler={props.removeHandler}
              />
            </div>
            <div className="px2 pt2">
              <SecuritiesSelect
                securities={props.securities}
                addHandler={props.addHandler}
              />
            </div>
          </section>
        );
      }}
    </Query>
  );
};

Fundamentals.defaultProps = {};

Fundamentals.propTypes = {
  portfolioSecurities: PropTypes.array.isRequired,
  securities: PropTypes.array.isRequired,
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default Fundamentals;
