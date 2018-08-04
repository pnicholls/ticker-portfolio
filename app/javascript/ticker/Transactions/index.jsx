import React from "react";
import PropTypes from "prop-types";
import TransactionsTable from "../TransactionsTable/index";
import TransactionForm from "../TransactionForm/index";

const Transactions = props => (
  <div>
    <section>
      <div className="large-container px3 border-box">
        <TransactionsTable transactions={props.transactions} />
      </div>
    </section>

    <TransactionForm />
  </div>
);

Transactions.defaultProps = {};
Transactions.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default Transactions;
