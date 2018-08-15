import React from "react";
import PropTypes from "prop-types";
import { configSentry } from "../../src/lib/Sentry";
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
import TransactionForm from "../TransactionForm/index";
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
      return (
        <Transactions
          transactions={props.transactions}
          securities={props.securities}
        />
      );
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
    const saveHandler = () => {
      const securityIds = this.props.portfolio.securities.map(
        security => `securities[]=${security.id}`
      );
      const securityNames = this.props.portfolio.securities.map(
        security => security.name
      );

      const parameters = securityIds.join("&");
      window.location = `/registration/new?${parameters}`;
    };

    const navMenuHandler = (item, event) => {
      this.setState({ selectedNavItem: item });
      event.preventDefault();
      return false;
    };

    const addSecurity = ["overview", "performance", "fundamentals"].includes(
      this.state.selectedNavItem
    );

    const addTransaction = ["transactions"].includes(
      this.state.selectedNavItem
    );

    return (
      <div className="large-container">
        <div
          className="rounded bg-white shadow-small"
          style={{ minHeight: "1000px" }}
        >
          <PortfolioHeader
            portfolio={this.props.portfolio}
            saveHandler={saveHandler}
            selectedNavItem={this.state.selectedNavItem}
            navMenuHandler={navMenuHandler}
          />

          <Section
            selectedNavItem={this.state.selectedNavItem}
            securities={this.props.portfolio.securities}
            transactions={this.props.portfolio.transactions}
            removeHandler={this.props.removeHandler}
          />

          <div className="px2 pt2">
            <div className={addSecurity ? "" : "display-none"}>
              <SecuritiesSelect
                securities={this.props.securities}
                addHandler={this.props.addHandler}
                placeholder="Add a security (search by name or symbol)"
              />
            </div>

            <div className={addTransaction ? "" : "display-none"}>
              <TransactionForm securities={this.props.securities} />
            </div>
          </div>
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
  securitiesQuery(),
  portfolioDataSource()
)(Portfolio);

export default enhancedPortfolio;
