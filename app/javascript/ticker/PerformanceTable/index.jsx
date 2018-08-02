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

class PerformanceTable extends React.PureComponent {
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
    const rowCount = this.props.securities.length;
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
                    _.get(rowData, "name", "...")
                  }
                  cellRenderer={boldCellRenderer}
                  dataKey="name"
                  width={250}
                  flexShrink={0}
                />
                <Column
                  label="Symbol"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "symbol", "...")
                  }
                  dataKey="symbol"
                  flexShrink={0}
                  width={60}
                />
                <Column
                  label="Last Price"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.latestPrice", "...")
                  }
                  cellRenderer={currencyRenderer}
                  dataKey="quote.latestPrice"
                  flexShrink={0}
                  width={75}
                />
                <Column
                  label="Change %"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.changePercent", "...")
                  }
                  cellRenderer={changePercentRenderer}
                  dataKey="quote.changePercent"
                  width={90}
                />
                <Column
                  label="Shares"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => ""}
                  cellRenderer={numberRenderer}
                  dataKey="quote.latestVolume"
                  width={75}
                />
                <Column
                  label="Cost Basis"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => ""}
                  cellRenderer={currencyRenderer}
                  dataKey="quote.open"
                  width={90}
                />
                <Column
                  label="Market value"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => ""}
                  cellRenderer={currencyRenderer}
                  dataKey="quote.high"
                  width={100}
                />
                <Column
                  label="Gain"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => ""}
                  cellRenderer={currencyRenderer}
                  dataKey="quote.low"
                  width={60}
                />
                <Column
                  label="Gain %"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => ""}
                  cellRenderer={currencyRenderer}
                  dataKey="daysGain"
                  width={60}
                />
                <Column
                  label="Day's gain"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => ""}
                  cellRenderer={numberRenderer}
                  dataKey="delete"
                  width={75}
                />
                <Column
                  label="Return %"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => "..."}
                  cellRenderer={numberRenderer}
                  dataKey="delete"
                  width={75}
                />
                <Column
                  label="Return $"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => "..."}
                  cellRenderer={numberRenderer}
                  dataKey="delete"
                  width={75}
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
    const sortedData = _.sortBy(this.props.securities.slice(), [sortBy]);
    const sortedDataWithDirection =
      sortDirection === SortDirection.DESC ? sortedData.reverse() : sortedData;

    return sortedDataWithDirection;
  }
}

PerformanceTable.defaultProps = {};

PerformanceTable.propTypes = {
  securities: PropTypes.array.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default PerformanceTable;
