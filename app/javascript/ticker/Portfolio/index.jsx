import React from "react";
import PropTypes from "prop-types";
import { compose } from "react-apollo";
import { appComponent } from "../App/index";
import {
  portfolioQuery,
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
          client={props.client}
          portfolioSecurities={props.portfolioSecurities}
          securitiesLoading={props.securitiesLoading}
          addHandler={props.addHandler}
          removeHandler={props.removeHandler}
        />
      );
    }
    case "performance": {
      return <Performance />;
    }
    case "fundamentals": {
      return <Fundamentals />;
    }
    case "transactions": {
      return <Transactions />;
    }
  }
};

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNavItem: "overview",
      mixpanelEventTracked: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.mixpanelEventTracked && this.props.marketing !== null) {
      const event = this.props.marketing
        ? "Viewed Marketing Portfolio"
        : "Viewed Portfolio";
      mixpanel.track(event);
      this.setState({ mixpanelEventTracked: true });
    }
  }

  render() {
    const saveHandler = () => {
      const securityIds = this.props.portfolioSecurities.map(
        security => `securities[]=${security.id}`
      );
      const securityNames = this.props.portfolioSecurities.map(
        security => security.name
      );

      mixpanel.track("Clicked Save Portfolio", {
        Securities: securityNames.join(", "),
        "Securities Count": securityNames.length
      });

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
    const addTransaction = ["transaction"].includes(this.state.selectedNavItem);

    return (
      <div className="container">
        <div
          className="rounded bg-white shadow-small"
          style={{ minHeight: "1000px" }}
        >
          <PortfolioHeader
            loading={this.props.loading}
            name={this.props.name}
            persisted={this.props.persisted}
            saveHandler={saveHandler}
            selectedNavItem={this.state.selectedNavItem}
            navMenuHandler={navMenuHandler}
          />
          <Section
            {...this.props}
            selectedNavItem={this.state.selectedNavItem}
          />
          <div className="px2 pt2">
            <div className={addSecurity ? "" : "display-none"}>
              <SecuritiesSelect
                securitiesLoading={this.props.securitiesLoading}
                securities={this.props.securities}
                addHandler={this.props.addHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Portfolio.defaultProps = {};

Portfolio.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  portfolioSecurities: PropTypes.array.isRequired,
  securitiesLoading: PropTypes.bool.isRequired,
  securities: PropTypes.array.isRequired,
  persisted: PropTypes.bool.isRequired,
  marketing: PropTypes.bool,
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};

const enhancedPortfolio = compose(
  appComponent(),
  portfolioQuery(),
  securitiesQuery(),
  portfolioDataSource()
)(Portfolio);

export default enhancedPortfolio;
