import React from 'react';

export default function FinTable() {
  return <Table />;
}

const rows = [1, 2, 3, 4];
const cols = [1, 2, 3, 4, 5, 6, 7];

function Table() {
  return (
    <>
      <div className="fin-date-container flex-row justify-evenly">
        {cols.map((col) => (
          <FinDate />
        ))}
      </div>
      <div className="fin-table">
        {rows.map((row) => (
          <FinRow num={row} />
        ))}
      </div>
    </>
  );
}

function FinRow(props) {
  return (
    <div className="fin-row flex-row">
      {cols.map((info) => (
        <Info />
      ))}
    </div>
  );
}

function FinDate(props) {
  return <div className="fin-date">{props.year}</div>;
}
function Info(props) {
  return <div className="fin-info">Info</div>;
}
