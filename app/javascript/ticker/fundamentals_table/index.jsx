import React from "react";
import PropTypes from "prop-types";
import { AutoSizer, WindowScroller, Table, Column } from "react-virtualized";
import {
  boldCellRenderer,
  changePercentRenderer,
  numberRenderer
} from "../../src/lib/table_renderers";

const FundamentalsTable = props => {
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
              rowCount={props.data.portfolio.securities.length}
              rowGetter={({ index }) => props.data.portfolio.securities[index]}
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
                cellDataGetter={({ rowData }) => rowData.quote.latestPrice}
                dataKey="lastPrice"
                width={100}
              />
              <Column
                label="Change %"
                headerClassName="h6 bold muted"
                className="h6"
                cellDataGetter={({ rowData }) => rowData.quote.changePercent}
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
                cellDataGetter={({ rowData }) => rowData.quote.latestVolume}
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
  );
};

FundamentalsTable.defaultProps = {};

FundamentalsTable.propTypes = {
  data: PropTypes.object.isRequired,
  portfolioId: PropTypes.number.isRequired
};

export default FundamentalsTable;
