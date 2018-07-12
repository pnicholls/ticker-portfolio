import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import createFilterOptions from "react-select-fast-filter-options";
import Select from "react-virtualized-select";
import _ from "lodash";

const GET_SECURITIES = gql`
  query Securities {
    securities {
      id
      symbol
      name
    }
  }
`;

export default class AddSecurityForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._handleChange = this._handleChange.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Query query={GET_SECURITIES}>
        {({ loading, error, data }) => {
          if (error) return `Error! ${error.message}`;

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
                  onChange={this._handleChange}
                />
              </label>
            </div>
          );
        }}
      </Query>
    );
  }

  _handleChange(selectedOption) {
    this.props.addHandler({ id: selectedOption["value"] });
  }
}

AddSecurityForm.defaultProps = {};

AddSecurityForm.propTypes = {
  addHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired
};
