# Explanation file


I will place information pertaining **API** and **UniversalChart**.
I will provide select examples and information to *hopefully* make your live's 
Easier.

<hr/>


### API

Below I will list values, as well as which function/API call they come from.
This should hopefully help you find the data you need.

(Please note, there are many data points that repeat accross each statement.)


<hr />

#### INCOME STATEMENT 
##### (fetchIncomeStatement('ticker' 'annual/quarter'))

```
"date" : "2020-09-26"
"symbol" : "AAPL"
"reportedCurrency" : "USD"
"fillingDate" : "2020-10-30"
"acceptedDate" : "2020-10-29 18:06:25"
"period" : "FY"
"revenue" : 274515000000
"costOfRevenue" : 169559000000
"grossProfit" : 104956000000
"grossProfitRatio" : 0.38233247727810865
"researchAndDevelopmentExpenses" : 18752000000
"generalAndAdministrativeExpenses" : 19916000000
"sellingAndMarketingExpenses" : 0.0
"sellingGeneralAndAdministrativeExpenses" : 19916000000
"otherExpenses" : 0.0
"operatingExpenses" : 38668000000
"costAndExpenses" : 208227000000
"interestExpense" : 2873000000
"depreciationAndAmortization" : 11056000000
"ebitda" : 81020000000
"ebitdaratio" : 0.2951386991603373
"operatingIncome" : 66288000000
"operatingIncomeRatio" : 0.24147314354406862
"totalOtherIncomeExpensesNet" : -803000000
"incomeBeforeTax" : 67091000000
"incomeBeforeTaxRatio" : 0.24439830246070343
"incomeTaxExpense" : 9680000000
"netIncome" : 57411000000
"netIncomeRatio" : 0.20913611278072236
"eps" : 3.31
"epsdiluted" : 3.28
"weightedAverageShsOut" : 17352119000
"weightedAverageShsOutDil" : 17528214000
"link" : "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/0000320193-20-000096-index.htm"
"finalLink" : "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/aapl-20200926.htm"
```
<hr />

#### BALANCE SHEET STATEMENT
##### (fetchBalanceStatement('ticker' 'annual/quarter'))

```
"date" : "2020-09-26"
"symbol" : "AAPL"
"reportedCurrency" : "USD"
"fillingDate" : "2020-10-30"
"acceptedDate" : "2020-10-29 18:06:25"
"period" : "FY"
"cashAndCashEquivalents" : 38016000000
"shortTermInvestments" : 52927000000
"cashAndShortTermInvestments" : 90943000000
"netReceivables" : 37445000000
"inventory" : 4061000000
"otherCurrentAssets" : 11264000000
"totalCurrentAssets" : 143713000000
"propertyPlantEquipmentNet" : 36766000000
"goodwill" : 0.0
"intangibleAssets" : 0.0
"goodwillAndIntangibleAssets" : 0.0
"longTermInvestments" : 100887000000
"taxAssets" : 0.0
"otherNonCurrentAssets" : 42522000000
"totalNonCurrentAssets" : 180175000000
"otherAssets" : 90482000000
"totalAssets" : 323888000000
"accountPayables" : 42296000000
"shortTermDebt" : 13769000000
"taxPayables" : 0.0
"deferredRevenue" : 6643000000
"otherCurrentLiabilities" : 42684000000
"totalCurrentLiabilities" : 105392000000
"longTermDebt" : 98667000000
"deferredRevenueNonCurrent" : 0.0
"deferredTaxLiabilitiesNonCurrent" : 0.0
"otherNonCurrentLiabilities" : 54490000000
"totalNonCurrentLiabilities" : 153157000000
"otherLiabilities" : 0.0
"totalLiabilities" : 258549000000
"commonStock" : 50779000000
"retainedEarnings" : 14966000000
"accumulatedOtherComprehensiveIncomeLoss" : -406000000
"othertotalStockholdersEquity" : 0.0
"totalStockholdersEquity" : 65339000000
"totalLiabilitiesAndStockholdersEquity" : 323888000000
"totalInvestments" : 153814000000
"totalDebt" : 112436000000
"netDebt" : 74420000000
"link" : "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/0000320193-20-000096-index.htm"
"finalLink" : "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/aapl-20200926.htm"
```
<hr />

#### CASHFLOW STATEMENT
##### (fetchCashflowStatement('ticker' 'annual/quarter'))
```
"date" : "2020-09-26"
"symbol" : "AAPL"
"reportedCurrency" : "USD"
"fillingDate" : "2020-10-30"
"acceptedDate" : "2020-10-29 18:06:25"
"period" : "FY"
"netIncome" : 57411000000
"depreciationAndAmortization" : 11056000000
"deferredIncomeTax" : -215000000
"stockBasedCompensation" : 6829000000
"changeInWorkingCapital" : 5690000000
"accountsReceivables" : 6917000000
"inventory" : -127000000
"accountsPayables" : -4062000000
"otherWorkingCapital" : 2081000000
"otherNonCashItems" : -97000000
"netCashProvidedByOperatingActivities" : 80674000000
"investmentsInPropertyPlantAndEquipment" : -7309000000
"acquisitionsNet" : -1524000000
"purchasesOfInvestments" : -115148000000
"salesMaturitiesOfInvestments" : 120483000000
"otherInvestingActivites" : -791000000
"netCashUsedForInvestingActivites" : -4289000000
"debtRepayment" : -12629000000
"commonStockIssued" : 880000000
"commonStockRepurchased" : -72358000000
"dividendsPaid" : -14081000000
"otherFinancingActivites" : 11368000000
"netCashUsedProvidedByFinancingActivities" : -86820000000
"effectOfForexChangesOnCash" : 0.0
"netChangeInCash" : -10435000000
"cashAtEndOfPeriod" : 39789000000
"cashAtBeginningOfPeriod" : 50224000000
"operatingCashFlow" : 80674000000
"capitalExpenditure" : -7309000000
"freeCashFlow" : 73365000000
"link" : "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/0000320193-20-000096-index.htm"
"finalLink" : "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/aapl-20200926.htm"
```

<hr/>

### Universal Chart

Please note, I have already created an **ExamplePage** which shows a working example
of how to connect both the **UniversalChart** and the **API**

