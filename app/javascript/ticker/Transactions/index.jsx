import React from "react";
import PropTypes from "prop-types";

const Transactions = props => (
  <section className="pt4">
    <div className="container px3">
      <div className="border-box center">
        <div className="muted" style={{ minHeight: "200px" }}>
          Transactions is coming soon...
        </div>
      </div>
    </div>
  </section>
);

Transactions.defaultProps = {};
Transactions.propTypes = {};

export default Transactions;
