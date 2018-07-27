import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import createFilterOptions from "react-select-fast-filter-options";
import Select from "react-virtualized-select";
import _ from "lodash";
import { GET_SECURITIES_WITHOUT_QUOTES } from "../../src/lib/Queries";

export default class AddSecurityForm extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const securities = _.get(data, "securities", []);
    const options = securities.map(security => ({
      value: security.id,
      label: `${security.symbol} - ${security.name}`
    }));
    const filterOptions = createFilterOptions({
      options
    });
    const isLoaded = options.length > 0;
    const placeholder = isLoaded
      ? "Add a security (search by name or symbol)"
      : "Loading...";

    const addHandler = data => {
      const security = _.find(securities, existingSecurity => {
        return existingSecurity.id == data.value;
      });

      this.props.addHandler(security);
    };

    return (
      <div>
        <label
          className="mb1 md-col-12 col-8"
          style={{ margin: "0px auto", maxWidth: "600px" }}
        >
          <Select
            disabled={!isLoaded}
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

AddSecurityForm.defaultProps = {};

AddSecurityForm.propTypes = {
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};
