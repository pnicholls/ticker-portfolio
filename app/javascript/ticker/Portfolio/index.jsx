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

const Portfolio = props => {
  const saveHandler = () => {
    const securities = props.portfolioSecurities.map(
      security => `securities[]=${security.id}`
    );
    const parameters = securities.join("&");
    window.location = `/registration/new?${parameters}`;
  };

  return (
    <div className="container">
      <div
        className="rounded bg-white shadow-small"
        style={{ minHeight: "1000px" }}
      >
        <PortfolioHeader
          loading={props.loading}
          name={props.name}
          persisted={props.persisted}
          saveHandler={saveHandler}
        />
        <Fundamentals
          portfolioSecurities={props.portfolioSecurities}
          securities={props.securities}
          addHandler={props.addHandler}
          removeHandler={props.removeHandler}
        />
      </div>
    </div>
  );
};

Portfolio.defaultProps = {};

Portfolio.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  portfolioSecurities: PropTypes.array.isRequired,
  securities: PropTypes.array.isRequired,
  persisted: PropTypes.bool.isRequired,
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
