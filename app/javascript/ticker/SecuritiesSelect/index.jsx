import React from "react";
import PropTypes from "prop-types";
import Select from "react-virtualized-select";
import createFilterOptions from "react-select-fast-filter-options";
import _ from "lodash";

class SecuritiesSelect extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.securities.length != nextProps.securities.length ||
      this.props.value != nextProps.value
    );
  }

  render() {
    const options = this.props.securities.map(security => ({
      security: security,
      value: security.id,
      label: `${security.symbol} - ${security.name}`
    }));

    const value = _.find(options, ["value", _.get(this.props, "value.id")]);

    const filterOptions = createFilterOptions({
      options
    });

    const placeholder =
      this.props.securities.length === 0
        ? "Loading..."
        : this.props.placeholder;

    const addHandler = data => {
      return this.props.addHandler(data.security);
    };

    return (
      <Select
        {...this.props}
        filterOptions={filterOptions}
        options={options}
        placeholder={placeholder}
        onChange={addHandler}
        value={value}
      />
    );
  }
}

SecuritiesSelect.defaultProps = {};

SecuritiesSelect.propTypes = {
  securities: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default SecuritiesSelect;
