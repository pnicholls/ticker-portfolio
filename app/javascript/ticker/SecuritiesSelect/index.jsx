import React from "react";
import PropTypes from "prop-types";
import Select from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import _ from "lodash";

class SecuritiesSelect extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.securities.length != nextProps.securities.length;
  }

  render() {
    const options = this.props.securities.map(security => ({
      security: security,
      value: security.id,
      label: `${security.symbol} - ${security.name}`
    }));

    const filterOptions = createFilterOptions({
      options
    });

    const placeholder = this.props.securitiesLoading
      ? "Loading search..."
      : "Add a security (search by name or symbol)";

    const addHandler = data => {
      return this.props.addHandler(data.security);
    };

    return (
      <div>
        <label
          className="mb1 md-col-12 col-8"
          style={{ margin: "0px auto", maxWidth: "600px" }}
        >
          <Select
            disabled={this.props.disabled}
            filterOptions={filterOptions}
            options={options}
            placeholder={placeholder}
            onChange={addHandler}
          />
        </label>
      </div>
    );
  }
}

SecuritiesSelect.defaultProps = {};

SecuritiesSelect.propTypes = {
  securitiesLoading: PropTypes.bool.isRequired,
  securities: PropTypes.array.isRequired
};

export default SecuritiesSelect;
