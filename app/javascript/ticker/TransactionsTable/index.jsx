import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  AutoSizer,
  WindowScroller,
  Table,
  Column,
  SortDirection,
  SortIndicator
} from "react-virtualized";
import {
  boldCellRenderer,
  changePercentRenderer,
  numberRenderer,
  currencyRenderer
} from "../../src/lib/TableRenderers";

class TransactionsTable extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    const sortBy = "name";
    const sortDirection = SortDirection.ASC;

    this.state = {
      autoHeight: true,
      headerHeight: 30,
      rowHeight: 40,
      sortBy,
      sortDirection
    };

    this._sortList = this._sortList.bind(this);
    this._sort = this._sort.bind(this);
  }

  render() {
    const { headerHeight, rowHeight, sortBy, sortDirection } = this.state;

    const rowGetter = ({ index }) => this._getDatum(sortedList, index);
    const rowCount = this.props.transactions.length;
    const sortedList = this._sortList({ sortBy, sortDirection });

    const deleteRenderer = data => (
      <button
        onClick={() => this.props.removeHandler(data.rowData)}
        className="border-none bg-none muted"
      >
        <b>&times;</b>
      </button>
    );

    return (
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                autoHeight
                height={height}
                width={width}
                rowHeight={40}
                headerHeight={30}
                rowCount={rowCount}
                rowGetter={rowGetter}
                sort={this._sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                className="table-light"
              >
                <Column
                  label="Name"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "security.name", "...")
                  }
                  cellRenderer={boldCellRenderer}
                  dataKey="security.name"
                  width={250}
                  flexShrink={0}
                />
                <Column
                  label="Symbol"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "security.symbol", "...")
                  }
                  dataKey="security.symbol"
                  flexShrink={0}
                  width={150}
                />
                <Column
                  label="Type"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "type", "...")
                  }
                  dataKey="type"
                  width={150}
                />
                <Column
                  label="Date"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "date", "...")
                  }
                  dataKey="date"
                  width={150}
                  flexShrink={0}
                />
                <Column
                  label="Shares"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "shares", "...")
                  }
                  dataKey="shares"
                  width={150}
                />
                <Column
                  label="Price"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "price", "...")
                  }
                  cellRenderer={currencyRenderer}
                  dataKey="price"
                  width={150}
                />
                <Column
                  label=""
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => rowData.id}
                  cellRenderer={deleteRenderer}
                  dataKey="delete"
                  width={20}
                  flexGrow={0}
                  flexShrink={0}
                />
              </Table>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    );
  }

  _getDatum(array, index) {
    return array[index];
  }

  _sort({ sortBy, sortDirection }) {
    this.setState({ sortBy, sortDirection });
  }

  _sortList({ sortBy, sortDirection }) {
    const sortedData = _.sortBy(this.props.transactions.slice(), [sortBy]);
    const sortedDataWithDirection =
      sortDirection === SortDirection.DESC ? sortedData.reverse() : sortedData;

    return sortedDataWithDirection;
  }
}

TransactionsTable.defaultProps = {};

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default TransactionsTable;
