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
  priceRenderer
} from "../../src/lib/TableRenderers";

class FundamentalsTable extends React.PureComponent {
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
    const rowCount = this.props.data.length;
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
                  width={300}
                  flexGrow={1}
                />
                <Column
                  label="Symbol"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "symbol", "...")
                  }
                  dataKey="symbol"
                  width={110}
                />
                <Column
                  label="Last Price"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.latestPrice", "...")
                  }
                  cellRenderer={priceRenderer}
                  dataKey="quote.latestPrice"
                  width={110}
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
                  width={110}
                />
                <Column
                  label="Market cap"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.marketCap", "...")
                  }
                  cellRenderer={numberRenderer}
                  dataKey="quote.marketCap"
                  width={120}
                />
                <Column
                  label="Volume"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.latestVolume", "...")
                  }
                  cellRenderer={numberRenderer}
                  dataKey="quote.latestVolume"
                  width={90}
                />
                <Column
                  label="Open"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.open", "...")
                  }
                  cellRenderer={priceRenderer}
                  dataKey="quote.open"
                  width={80}
                />
                <Column
                  label="High"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.high", "...")
                  }
                  cellRenderer={priceRenderer}
                  dataKey="quote.high"
                  width={80}
                />
                <Column
                  label="Low"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.low", "...")
                  }
                  cellRenderer={priceRenderer}
                  dataKey="quote.low"
                  width={80}
                />
                <Column
                  label=""
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => rowData.id}
                  cellRenderer={deleteRenderer}
                  dataKey="delete"
                  width={20}
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
      Table: "Fundamentals"
    });
  }

  _sortList({ sortBy, sortDirection }) {
    const sortedData = _.sortBy(this.props.data.slice(), [sortBy]);
    const sortedDataWithDirection =
      sortDirection === SortDirection.DESC ? sortedData.reverse() : sortedData;

    return sortedDataWithDirection;
  }
}

FundamentalsTable.defaultProps = {};

FundamentalsTable.propTypes = {
  data: PropTypes.array.isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default FundamentalsTable;
