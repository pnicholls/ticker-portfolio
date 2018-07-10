import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { AutoSizer, WindowScroller, Table, Column } from "react-virtualized";

const rowCount = 1000;

const securities = [
  {
    name: "Fiat Chrysler Automobiles N.V.",
    symbol: "FCAU",
    lastPrice: 18.9,
    change: "5.98",
    marketCap: "39.231B",
    volume: "4,602,146",
    open: "20.16",
    high: "20.22",
    low: "19.86",
    daysGain: "..."
  },
  {
    name: "Bank of America Corporation",
    symbol: "BAC",
    lastPrice: 27.78,
    change: "0.50",
    marketCap: "283.091B",
    volume: "44,172,831",
    open: "27.95",
    high: "28.08",
    low: "27.81",
    daysGain: "..."
  },
  {
    name: "Fiat Chrysler Automobiles N.V.",
    symbol: "FCAU",
    lastPrice: 18.9,
    change: "5.98",
    marketCap: "39.231B",
    volume: "4,602,146",
    open: "20.16",
    high: "20.22",
    low: "19.86",
    daysGain: "..."
  },
  {
    name: "Bank of America Corporation",
    symbol: "BAC",
    lastPrice: 27.78,
    change: "0.50",
    marketCap: "283.091B",
    volume: "44,172,831",
    open: "27.95",
    high: "28.08",
    low: "27.81",
    daysGain: "..."
  }
];

const rowGetter = ({ index }) => securities[index];

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

const greenRedCellRenderer = ({
  cellData,
  columnData,
  columnIndex,
  dataKey,
  isScrolling,
  rowData,
  rowIndex
}) => {
  return <b style={{ color: "rgb(25, 190, 135)" }}>{cellData}</b>;
};

const Portfolio = props => (
  <div>
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          height={270}
          width={width}
          rowGetter={rowGetter}
          rowHeight={40}
          rowCount={4}
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
            cellDataGetter={({ rowData }) => rowData.lastPrice}
            dataKey="lastPrice"
            width={100}
          />
          <Column
            label="Change %"
            headerClassName="h6 bold muted"
            className="h6"
            cellDataGetter={({ rowData }) => rowData.change}
            cellRenderer={greenRedCellRenderer}
            dataKey="change"
            width={100}
          />
          <Column
            label="Market cap"
            headerClassName="h6 bold muted"
            className="h6"
            cellDataGetter={({ rowData }) => rowData.marketCap}
            dataKey="marketCap"
            width={100}
          />
          <Column
            label="Volume"
            headerClassName="h6 bold muted"
            className="h6"
            cellDataGetter={({ rowData }) => rowData.volume}
            dataKey="volume"
            width={100}
          />
          <Column
            label="Open"
            headerClassName="h6 bold muted"
            className="h6"
            cellDataGetter={({ rowData }) => rowData.open}
            dataKey="open"
            width={100}
          />
          <Column
            label="High"
            headerClassName="h6 bold muted"
            className="h6"
            cellDataGetter={({ rowData }) => rowData.high}
            dataKey="high"
            width={100}
          />
          <Column
            label="Low"
            headerClassName="h6 bold muted"
            className="h6"
            cellDataGetter={({ rowData }) => rowData.low}
            dataKey="low"
            width={100}
          />
          <Column
            label="Day's gain"
            headerClassName="h6 bold muted"
            className="h6"
            cellDataGetter={({ rowData }) => rowData.daysGain}
            dataKey="daysGain"
            width={100}
          />
          <Column label="" dataKey="remove" width={10} />
        </Table>
      )}
    </AutoSizer>
  </div>
);

Portfolio.defaultProps = {
  name: "World"
};

Portfolio.propTypes = {
  name: PropTypes.string
};

export default Portfolio;
