import React from "react";
import PropTypes from "prop-types";
import TransactionsTable from "../TransactionsTable/index";

const Transactions = props => (
  <section>
    <div className="large-container px3 border-box">
      <TransactionsTable transactions={[]} />
    </div>
  </section>
);

Transactions.defaultProps = {};
Transactions.propTypes = {
  securities: PropTypes.array.isRequired
};

export default Transactions;
