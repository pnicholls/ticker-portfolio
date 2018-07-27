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
import Fundamentals from "../Fundamentals/index";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
          />
          <Fundamentals
            client={this.props.client}
            portfolioSecurities={this.props.portfolioSecurities}
            securities={this.props.securities}
            addHandler={this.props.addHandler}
            removeHandler={this.props.removeHandler}
          />
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
