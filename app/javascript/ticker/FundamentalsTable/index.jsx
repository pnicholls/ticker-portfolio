import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import numeral from "numeral";
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
import { Sparklines, SparklinesLine } from "react-sparklines";

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
                  label="Market cap"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.marketCap", "...")
                  }
                  cellRenderer={numberRenderer}
                  dataKey="quote.marketCap"
                  width={100}
                />
                <Column
                  label="Avg volume"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.avgTotalVolume", "...")
                  }
                  cellRenderer={numberRenderer}
                  dataKey="quote.avgTotalVolume"
                  width={100}
                />
                <Column
                  label="52wk high"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "stats.week52High", "...")
                  }
                  cellRenderer={currencyRenderer}
                  dataKey="stats.week52High"
                  width={100}
                />
                <Column
                  label="52wk low"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "stats.week52Low", "...")
                  }
                  cellRenderer={currencyRenderer}
                  dataKey="stats.week52Low"
                  width={100}
                />
                <Column
                  label="EPS"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "stats.ttmEPS", "...")
                  }
                  cellRenderer={currencyRenderer}
                  dataKey="stats.ttmEPS"
                  width={55}
                />
                <Column
                  label="P/E"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) =>
                    _.get(rowData, "quote.peRatio", "...")
                  }
                  cellRenderer={currencyRenderer}
                  dataKey="quote.peRatio"
                  width={50}
                />
                <Column
                  label="Beta"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => {
                    const beta = _.get(rowData, "stats.beta", "...");
                    if (isNaN(parseFloat(beta))) {
                      return beta;
                    }

                    return numeral(beta)
                      .format("0.00")
                      .toUpperCase();
                  }}
                  cellRenderer={numberRenderer}
                  dataKey="stats.beta"
                  width={60}
                />
                <Column
                  label="6m Trend"
                  headerClassName="h6 bold muted"
                  className="h6"
                  cellDataGetter={({ rowData }) => {
                    if (!_.get(rowData, "charts.sixMonth.data", null)) {
                      return "...";
                    }

                    const data = _.get(rowData, "charts.sixMonth.data", []);
                    const chartData = data.map(datum => datum.close);
                    const changePercent = _.get(
                      rowData,
                      "charts.sixMonth.changePercent"
                    );
                    const color =
                      changePercent > 0
                        ? "rgb(25, 190, 135)"
                        : "rgb(247, 33, 33)";
                    return (
                      <Sparklines data={chartData}>
                        <SparklinesLine
                          style={{ fill: "none" }}
                          color={color}
                        />
                      </Sparklines>
                    );
                  }}
                  cellRenderer={numberRenderer}
                  dataKey="charts.sixMonth.changePercent"
                  width={80}
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
    const sortedData = _.sortBy(this.props.securities.slice(), [sortBy]);
    const sortedDataWithDirection =
      sortDirection === SortDirection.DESC ? sortedData.reverse() : sortedData;

    return sortedDataWithDirection;
  }
}

FundamentalsTable.defaultProps = {};

FundamentalsTable.propTypes = {
  securities: PropTypes.array.isRequired
};

export default FundamentalsTable;
