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
    <div className="text-white">
      <h2>Latest News</h2>
      <div className="table-responsive ">
        <table className="table table-sm  table-borderless border-0 table-hover">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {stockNewsList.map(company => {
              return (
                <tr
                  key={company.publishedDate}
                  className="btn-group me-2 btn btn-sm btn-outline-secondary list-group list-group-flush border-0 rounded-pill shadow-none "
                  type="button">
                  <td>
                    <img src={company.image} width="50" alt={company.symbol}></img>
                  </td>
                  <td className="text-white list-group-item">
                    {company.title}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
