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
                  cellDataGetter={({ rowData }) => "..."}
                  cellRenderer={boldCellRenderer}
                  dataKey="name"
                  width={80}
                  flexShrink={0}
                />
                <Column
                  label="Symbol"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => "..."}
                  cellRenderer={boldCellRenderer}
                  dataKey="name"
                  width={60}
                  flexShrink={0}
                />
                <Column
                  label="Type"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => "..."}
                  dataKey="symbol"
                  width={80}
                />
                <Column
                  label="Date"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => "..."}
                  cellRenderer={boldCellRenderer}
                  dataKey="name"
                  width={80}
                  flexShrink={0}
                />
                <Column
                  label="Shares"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => "..."}
                  cellRenderer={changePercentRenderer}
                  dataKey="quote.changePercent"
                  width={60}
                />
                <Column
                  label="Price"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => ""}
                  cellRenderer={numberRenderer}
                  dataKey="quote.latestVolume"
                  width={110}
                />
                <Column
                  label="Fees"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => ""}
                  cellRenderer={currencyRenderer}
                  dataKey="quote.open"
                  width={60}
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

    mixpanel.track("Sorted Table", {
      "Sort By": sortBy,
      "Sort Direction": sortDirection,
      Table: "Overview"
    });
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
  transactions: PropTypes.array.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default TransactionsTable;
