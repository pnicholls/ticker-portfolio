import React from "react";
import PropTypes from "prop-types";
import { compose } from "react-apollo";
import { appComponent } from "../App/index";
import {
  portfolioRootQuery,
  portfolioOverviewQuery,
  portfolioPerformanceQuery,
  portfolioFundamentalsQuery,
  portfolioTransactionsQuery,
  securitiesQuery,
  portfolioDataSource
} from "../PortfolioDataSource/index";
import PortfolioHeader from "../PortfolioHeader/index";
import SecuritiesSelect from "../SecuritiesSelect/index";
import Overview from "../Overview/index";
import Performance from "../Performance/index";
import Fundamentals from "../Fundamentals/index";
import Transactions from "../Transactions/index";

const Section = props => {
  switch (props.selectedNavItem) {
    case "overview": {
      return (
        <Overview
          securities={props.securities}
          removeHandler={props.removeHandler}
        />
      );
    }
    case "performance": {
      return <Performance securities={props.securities} />;
    }
    case "fundamentals": {
      return <Fundamentals securities={props.securities} />;
    }
    case "transactions": {
      return <Transactions securities={props.securities} />;
    }
  }
};

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNavItem: "overview"
    };
  }

  render() {
    const portfolio = this.props.portfolio;
    const securities = this.props.portfolio.securities;
    const removeHandler = this.props.removeHandler;
    const saveHandler = () => {
      const securityIds = this.props.portfolioSecurities.map(
        security => `securities[]=${security.id}`
      );
      const securityNames = this.props.portfolioSecurities.map(
        security => security.name
      );

      const parameters = securityIds.join("&");
      window.location = `/registration/new?${parameters}`;
    };
    const selectedNavItem = this.state.selectedNavItem;
    const navMenuHandler = (item, event) => {
      this.setState({ selectedNavItem: item });
      event.preventDefault();
      return false;
    };

    const addSecurity = ["overview", "performance", "fundamentals"].includes(
    return (
      <div className="large-container">
        <div
          className="rounded bg-white shadow-small"
          style={{ minHeight: "1000px" }}
        >
          <PortfolioHeader
            portfolio={portfolio}
            saveHandler={saveHandler}
            selectedNavItem={selectedNavItem}
            navMenuHandler={navMenuHandler}
          />

          <Section
            selectedNavItem={selectedNavItem}
            securities={securities}
            removeHandler={removeHandler}
          />
        </div>
      </div>
    );
  }
}

Portfolio.defaultProps = {};

Portfolio.propTypes = {
  portfolio: PropTypes.object.isRequired,
  securities: PropTypes.array.isRequired,
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};

const enhancedPortfolio = compose(
  appComponent(),
  portfolioRootQuery(),
  portfolioOverviewQuery(),
  securitiesQuery(),
  portfolioPerformanceQuery(),
  portfolioFundamentalsQuery(),
  portfolioTransactionsQuery(),
  portfolioDataSource()
)(Portfolio);

export default enhancedPortfolio;
