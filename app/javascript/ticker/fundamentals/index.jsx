import { appComponent } from "../app/index";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { AutoSizer, WindowScroller, Table, Column } from "react-virtualized";
import numeral from "numeral";

const boldCellRenderer = ({
  cellData,
  columnData,
  columnIndex,
  dataKey,
  isScrolling,
  rowData,
  rowIndex
}) => {
  return <b>{cellData}</b>;
};

function changeRenderer(value, displayValue) {
  if (value === null || value === 0) {
    return numeral(value).format("0.00%");
  }

  const color = value > 0 ? "rgb(25, 190, 135)" : "rgb(247, 33, 33)";
  return <b style={{ color: color }}>{displayValue}</b>;
}

const changePercentRenderer = ({
  cellData,
  columnData,
  columnIndex,
  dataKey,
  isScrolling,
  rowData,
  rowIndex
}) => {
  if (isNaN(parseFloat(cellData))) {
    return cellData;
  }

  const displayValue = numeral(cellData)
    .format("0.00%")
    .toUpperCase();
  return changeRenderer(cellData, displayValue);
};

const numberRenderer = ({
  cellData,
  columnData,
  columnIndex,
  dataKey,
  isScrolling,
  rowData,
  rowIndex
}) => {
  if (!Number.isInteger(cellData)) {
    return cellData;
  }

  return numeral(cellData)
    .format("0.000a")
    .toUpperCase();
};

const GET_PORTFOLIO = gql`
  query Portfolio($id: ID!) {
    portfolio(id: $id) {
      name
      securities {
        name
        symbol
        quote {
          latestPrice
          changePercent
          marketCap
          latestVolume
          open
          high
          low
        }
      }
    }
  }
`;

const defaultSecurities = [...Array(4)].map((_, i) => ({
  name: "...",
  symbol: "...",
  quote: {
    latestPrice: "...",
    changePercent: "...",
    marketCap: "...",
    latestVolume: "...",
    open: "...",
    high: "...",
    low: "...",
    daysGain: "..."
  }
}));

const defaultData = {
  portfolio: {
    name: "Loading",
    securities: defaultSecurities
  }
};

const Fundamentals = props => (
  <Query
    query={GET_PORTFOLIO}
    variables={{ id: props.portfolioId }}
    pollInterval={30 * 1000}
  >
    {({ loading, error, data }) => {
      if (error) return `Error! ${error.message}`;
      data = Object.keys(data).length !== 0 ? data : defaultData;

      return (
        <div>
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Table
                    autoHeight
                    height={height}
                    width={width}
                    rowHeight={40}
                    rowCount={data.portfolio.securities.length}
                    rowGetter={({ index }) => data.portfolio.securities[index]}
                    columnWidth={20}
                    disableHeader={false}
                    headerHeight={20}
                    className="table-light"
                  >
                    <Column
                      label="Name"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) => rowData.name}
                      cellRenderer={boldCellRenderer}
                      dataKey="name"
                      width={300}
                      flexGrow={1}
                    />
                    <Column
                      label="Symbol"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) => rowData.symbol}
                      dataKey="symbol"
                      width={100}
                    />
                    <Column
                      label="Last Price"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) =>
                        rowData.quote.latestPrice
                      }
                      dataKey="lastPrice"
                      width={100}
                    />
                    <Column
                      label="Change %"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) =>
                        rowData.quote.changePercent
                      }
                      cellRenderer={changePercentRenderer}
                      dataKey="change"
                      width={100}
                    />
                    <Column
                      label="Market cap"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) => rowData.quote.marketCap}
                      cellRenderer={numberRenderer}
                      dataKey="marketCap"
                      width={100}
                    />
                    <Column
                      label="Volume"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) =>
                        rowData.quote.latestVolume
                      }
                      cellRenderer={numberRenderer}
                      dataKey="volume"
                      width={100}
                    />
                    <Column
                      label="Open"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) => rowData.quote.open}
                      dataKey="open"
                      width={100}
                    />
                    <Column
                      label="High"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) => rowData.quote.high}
                      dataKey="high"
                      width={100}
                    />
                    <Column
                      label="Low"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) => rowData.quote.low}
                      dataKey="low"
                      width={100}
                    />
                    <Column
                      label="Day's gain"
                      headerClassName="h6 bold muted"
                      className="h6"
                      cellDataGetter={({ rowData }) => rowData.quote.daysGain}
                      dataKey="daysGain"
                      width={100}
                    />
                  </Table>
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        </div>
      );
    }}
  </Query>
);

const AppFundamentals = appComponent(Fundamentals);

Fundamentals.defaultProps = {};

Fundamentals.propTypes = {
  portfolioId: PropTypes.number.isRequired
};

export default AppFundamentals;
