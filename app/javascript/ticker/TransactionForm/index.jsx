import React from "react";
import PropTypes from "prop-types";
import SecuritiesSelect from "../SecuritiesSelect/index";
import Select from "react-virtualized-select";

const Form = props => (
  <div className="flex flex-column">
    <SecuritiesSelect
      className="mb2"
      value={props.security}
      securities={props.securities}
      placeholder="Add a transaction"
      addHandler={props.addHandler}
    />

    <div className={props.security ? "" : "display-none"}>
      <Select
        className="mb2"
        placeholder="Transaction Type"
        options={[
          { value: "buy", label: "Buy" },
          { value: "sell", label: "Sell" }
        ]}
      />

      <input type="text" placeholder="Date" className="Select-control mb2" />
      <input type="text" placeholder="Shares" className="Select-control mb2" />
      <input type="text" placeholder="Price" className="Select-control mb2" />
      <input
        type="submit"
        value="Save Transaction"
        className="p1 small-text rounded border-blue bg-blue white"
      />
    </div>
  </div>
);

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      security: null
    };
  }

  render() {
    const addHandler = security => {
      this.setState({ security });
    };

    return (
      <Form
        {...this.props}
        addHandler={addHandler}
        security={this.state.security}
      />
    );
  }
}

TransactionForm.defaultProps = {};
TransactionForm.propTypes = {
  securities: PropTypes.array.isRequired
};

export default TransactionForm;
