import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import OverviewTable from "../OverviewTable/index";
import SecuritiesSelect from "../SecuritiesSelect/index";
import { GET_SECURITIES_WITH_QUOTES } from "../../src/lib/Queries";

class Overview extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      securities: []
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
    const securities = this.props.portfolioSecurities.map(security => {
      const securityWithQuote = _.find(this.state.securities, {
        id: security.id
      });

      return {
        ...security,
        quote: securityWithQuote ? securityWithQuote.quote : null
      };
    });

    return (
      <section>
        <div className="container px3 border-box">
          <OverviewTable
            data={securities}
            removeHandler={this.props.removeHandler}
          />
        </div>
        <div className="px2 pt2">
          <SecuritiesSelect
            securitiesLoading={this.props.securitiesLoading}
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
        variables: { id: ids },
        fetchPolicy: "no-cache"
      })
      .then(data => {
        this.setState({ securities: data.data.securities });
        const securitiesWithoutQuotes = _.filter(
          data.data.securities,
          security => security.quote === null
        );
        const quotesRequired = securitiesWithoutQuotes.length > 0;
        const refreshInterval = quotesRequired ? 500 : 1000 * 30;
        setTimeout(() => {
          this._fetchSecurityQuotes();
        }, refreshInterval);
      })
      .catch(error => console.error(error));
  }
}

Overview.defaultProps = {};

Overview.propTypes = {
  portfolioSecurities: PropTypes.array.isRequired,
  securitiesLoading: PropTypes.bool.isRequired,
  securities: PropTypes.array.isRequired,
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default Overview;
