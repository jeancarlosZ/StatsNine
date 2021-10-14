//* Get and export our express router
const router = require('express').Router()
module.exports = router

//* Import redis
const Redis = require('redis')

//* Create redis client
const redisCli = Redis.createClient()

//* Tetst ob
const testobj = [
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    marketCap: 2445808500736,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    beta: 1.222221999999999919594984021387062966823577880859375,
    price: 143.530000000000001136868377216160297393798828125,
    lastAnnualDividend: 0.84999999999999997779553950749686919152736663818359375,
    volume: 79135801,
    exchange: 'Nasdaq Global Select',
    exchangeShortName: 'NASDAQ',
    country: 'US',
    isEtf: false,
    isActivelyTrading: true
  },
  {
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    marketCap: 2271375523840,
    sector: 'Technology',
    industry: 'Software—Infrastructure',
    beta: 0.8026450000000000528643795405514538288116455078125,
    price: 301.41000000000002501110429875552654266357421875,
    lastAnnualDividend: 2.2400000000000002131628207280300557613372802734375,
    volume: 22899216,
    exchange: 'Nasdaq Global Select',
    exchangeShortName: 'NASDAQ',
    country: 'US',
    isEtf: false,
    isActivelyTrading: true
  }
]

router.get('/', async (request, response, next) => {
  try {
    redisCli.set('test', JSON.stringify(testobj))

    //
    response.send('this worked!')
  } catch (error) {
    next(error)
  }
})
