import React from "react";
import PropTypes from "prop-types";
import SecuritiesSelect from "../SecuritiesSelect/index";
import Select from "react-virtualized-select";

const Form = props => {
  const securityDidChangeHandler = security => {
    props.updateHandler("security", security);
  };

  const transactionTypeDidChangeHandler = option => {
    props.updateHandler("transactionType", option);
  };

  return (
    <div className="flex flex-column">
      <SecuritiesSelect
        className="mb2"
        value={props.transaction.security}
        securities={props.securities}
        placeholder="Add a transaction"
        addHandler={securityDidChangeHandler}
      />

      <div className={props.transaction.security ? "" : "display-none"}>
        <Select
          className="mb2"
          placeholder="Transaction Type"
          value={props.transaction.transactionType}
          onChange={transactionTypeDidChangeHandler}
          options={[
            { value: "buy", label: "Buy" },
            { value: "sell", label: "Sell" }
          ]}
        />

        <input
          type="text"
          placeholder="Date (MM/DD/YYYY)"
          className="Select-control mb2"
        />
        <input
          type="text"
          placeholder="Shares"
          className="Select-control mb2"
        />
        <input type="text" placeholder="Price" className="Select-control mb2" />
        <input
          type="submit"
          value="Save Transaction"
          className="p1 small-text rounded border-blue bg-blue white"
        />
      </div>
    </div>
  );
};

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: {
        security: null,
        transactionType: null,
        date: null,
        shares: null,
        price: null
      }
    };
  }

  render() {
    const updateHandler = (attribute, data) => {
      const transaction = {
        ...this.state.transaction
      };
      transaction[attribute] = data;

      this.setState({ transaction });
    };

    return (
      <Form
        {...this.props}
        updateHandler={updateHandler}
        transaction={this.state.transaction}
      />
    );
  }
}

TransactionForm.defaultProps = {};
TransactionForm.propTypes = {
  securities: PropTypes.array.isRequired
};

export default TransactionForm;
