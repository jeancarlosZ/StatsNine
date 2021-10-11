import React, { useEffect, useState } from 'react'
import { fetchStockNews } from '../../api/api'

export default function Newsfeed() {
  const [stockNewsList, setStockNewsList] = useState([])

  useEffect(() => {
    async function getStockNewsList() {
      setStockNewsList(await fetchStockNews(['AAPL', 'MSFT', 'GOOG', 'FB', 'NVDA'], 10))
    }
    getStockNewsList()
  }, [])

  // console.log('Data:', stockNewsList);

  const { keys, values } = stockNewsList

  // console.log('Keys:', keys);
  // console.log('Values:', values);

  return (
    <div>
      <h2>Latest News</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Headline</th>
            </tr>
          </thead>
          <tbody>
            {stockNewsList.map(company => {
              return (
                <tr key={company.publishedDate}>
                  <td>
                    <img src={company.image} width="50" alt={company.symbol}></img>
                  </td>
                  <td>{company.title}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
