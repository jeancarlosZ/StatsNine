import React, { useEffect, useState } from 'react';
import { fetchStockNews } from '../../../api/api';

export default function Newsfeed() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      setData(await fetchStockNews(['AAPL', 'MSFT', 'GOOG'], 3));
    }
    getData();
  }, []);

  console.log('Data:', data);

  const { keys, values } = data;

  console.log('Keys:', keys);
  console.log('Values:', values);

  const dataset = [];
  console.log(dataset);
  return (
    <div>
      <h2>News feed</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Real-time news</th>
            </tr>
          </thead>
          <tbody>
            {dataset.map(company => {
              return (
                <tr key={company.symbol}>
                  <td>{company.symbol}</td>
                  <td>{company.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* <UniversalChart
              className="my-4 w-100 chartjs-render-monitor"
              title="SnP500"
              id="myChart"
              width="1304"
              height="550"
              style="display: block; height: 275px; width: 652px;"
            /> */}
    </div>
  );
}
