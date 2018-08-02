import React from "react";
import ReactDOM from "react-dom";
import numeral from "numeral";

export const boldCellRenderer = ({
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

export const numberRenderer = ({
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

export const currencyRenderer = ({
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

  return numeral(cellData).format("'0,0.0'");
};

export const changePercentRenderer = ({
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

function changeRenderer(value, displayValue) {
  if (value === null || value === 0) {
    return numeral(value).format("0.00%");
  }

  const color = value > 0 ? "rgb(25, 190, 135)" : "rgb(247, 33, 33)";
  return <b style={{ color: color }}>{displayValue}</b>;
}
