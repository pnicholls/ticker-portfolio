import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import FundamentalsTable from "../FundamentalsTable/index";
import AddSecurityForm from "../AddSecurityForm/index";
import SecuritiesSelect from "../SecuritiesSelect/index";
import { GET_SECURITIES_WITH_QUOTES } from "../../src/lib/Queries";

class Fundamentals extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      securities: null
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevPortfolioSecurities = _
      .map(prevProps.portfolioSecurities, "id")
      .sort();
    const portfolioSecurities = _
      .map(this.props.portfolioSecurities, "id")
      .sort();

    const portfolioSecuritiesChanged = !_.isEqual(
      prevPortfolioSecurities,
      portfolioSecurities
    );

    if (portfolioSecuritiesChanged) {
      this._fetchSecurityQuotes();
    }
  }

  render() {
    const ids = this.props.portfolioSecurities.map(security => security.id);
    const securities = this.state.securities || this.props.portfolioSecurities;

    return (
      <section>
        <div className="container px3 border-box">
          <FundamentalsTable
            data={securities}
            removeHandler={this.props.removeHandler}
          />
        </div>
        <div className="px2 pt2">
          <SecuritiesSelect
            securities={this.props.securities}
            addHandler={this.props.addHandler}
          />
        </div>
      </section>
    );
  }

  _fetchSecurityQuotes() {
    const ids = this.props.portfolioSecurities.map(security => security.id);

    this.props.client
      .query({
        query: GET_SECURITIES_WITH_QUOTES,
        variables: { id: ids }
      })
      .then(data => this.setState({ securities: data.data.securities }))
      .catch(error => console.error(error));
  }
}

Fundamentals.defaultProps = {};

Fundamentals.propTypes = {
  portfolioSecurities: PropTypes.array.isRequired,
  securities: PropTypes.array.isRequired,
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default Fundamentals;
