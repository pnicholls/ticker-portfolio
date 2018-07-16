import React from "react";
import PropTypes from "prop-types";
import { compose } from "react-apollo";
import { appComponent } from "../App/index";
import {
  portfolioQuery,
  portfolioDataSource
} from "../PortfolioDataSource/index";
import PortfolioHeader from "../PortfolioHeader/index";
import Fundamentals from "../Fundamentals/index";

const Portfolio = props => {
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
        />
        <Fundamentals
          data={props.securities}
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
  securities: PropTypes.array.isRequired,
  persisted: PropTypes.bool.isRequired,
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};

const enhancedPortfolio = compose(
  appComponent(),
  portfolioQuery(),
  portfolioDataSource()
)(Portfolio);

export default enhancedPortfolio;
