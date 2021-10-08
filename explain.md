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
##### (fetchIncomeStatement('ticker', false, 'annual/quarter'))

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
##### (fetchBalanceStatement('ticker', false, 'annual/quarter'))

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
##### (fetchCashflowStatement('ticker', false, 'annual/quarter'))
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


<hr />

#### INCOME STATEMENT GROWTH
##### (fetchIncomeStatement('ticker', true))

```
"date" : "2020-09-26",
"symbol" : "AAPL",
"period" : "FY",
"growthRevenue" : 0.055120803769784836,
"growthCostOfRevenue" : 0.04807086078797394,
"growthGrossProfit" : 0.06671274087324172,
"growthGrossProfitRatio" : 0.010986360104020534,
"growthResearchAndDevelopmentExpenses" : 0.15631744465684158,
"growthGeneralAndAdministrativeExpenses" : 0.09158673609208003,
"growthSellingAndMarketingExpenses" : 0.0,
"growthOtherExpenses" : 0.0,
"growthOperatingExpenses" : 0.12204747257849226,
"growthCostAndExpenses" : 0.0610617394671939,
"growthInterestExpense" : -0.1965883668903803,
"growthDepreciationAndAmortization" : -0.11883318721606759,
"growthEBITDA" : -0.010261421939897385,
"growthEBITDARatio" : -0.0619665781170108,
"growthOperatingIncome" : 0.03688409197559831,
"growthOperatingIncomeRatio" : -0.017284003622169794,
"growthTotalOtherIncomeExpensesNet" : -0.5556170448256779,
"growthIncomeBeforeTax" : 0.020597228349331427,
"growthIncomeBeforeTaxRatio" : -0.032720021534130624,
"growthIncomeTaxExpense" : -0.07642400534300162,
"growthNetIncome" : 0.039000289561314606,
"growthNetIncomeRatio" : -0.015278358791598145,
"growthEPS" : 0.10609857978279026,
"growthEPSDiluted" : 0.10344827586206885,
"growthWeightedAverageShsOut" : -0.06059209794028975,
"growthWeightedAverageShsOutDil" : -0.057402558404513054
```

<hr />

#### BALANCE STATEMENT GROWTH
##### (fetchBalanceStatement('ticker', true))

```
"date" : "2020-09-26",
"symbol" : "AAPL",
"period" : "FY",
"growthCashAndCashEquivalents" : -0.2216853656539186,
"growthShortTermInvestments" : 0.023475721772088256,
"growthCashAndShortTermInvestments" : -0.09560746641208469,
"growthNetReceivables" : -0.18249497860448868,
"growthInventory" : -0.010959571358986848,
"growthOtherCurrentAssets" : -0.08808290155440414,
"growthTotalCurrentAssets" : -0.11734502730025366,
"growthPropertyPlantEquipmentNet" : -0.016373267697576115,
"growthGoodwill" : 0.0,
"growthIntangibleAssets" : 0.0,
"growthGoodwillAndIntangibleAssets" : 0.0,
"growthLongTermInvestments" : -0.04228173265869889,
"growthTaxAssets" : 0.0,
"growthOtherNonCurrentAssets" : 0.28940505791739946,
"growthTotalNonCurrentAssets" : 0.02548706010916521,
"growthOtherAssets" : 0.0,
"growthTotalAssets" : -0.04321213768330005,
"growthAccountPayables" : -0.08521498399515529,
"growthShortTermDebt" : -0.15215517241379312,
"growthTaxPayables" : 0.0,
"growthDeferredRevenue" : 0.2030061571894241,
"growthOtherCurrentLiabilities" : 0.13160127253446446,
"growthTotalCurrentLiabilities" : -0.0030836754384305416,
"growthLongTermDebt" : 0.07472197109152896,
"growthDeferredRevenueNonCurrent" : 0.0,
"growthDeferrredTaxLiabilitiesNonCurrent" : 0.0,
"growthOtherNonCurrentLiabilities" : 0.0789458051996911,
"growthTotalNonCurrentLiabilities" : 0.07622092614714356,
"growthOtherLiabilities" : 0.0,
"growthTotalLiabilities" : 0.04241859790023707,
"growthCommonStock" : 0.12407579581175013,
"growthRetainedEarnings" : -0.6739291472395311,
"growthAccumulatedOtherComprehensiveIncomeLoss" : -0.3047945205479452,
"growthOthertotalStockholdersEquity" : 0.0,
"growthTotalStockholdersEquity" : -0.27792635487578465,
"growthTotalLiabilitiesAndStockholdersEquity" : -0.04321213768330005,
"growthTotalInvestments" : -0.020629847058973347,
"growthTotalDebt" : 0.04062121113959666,
"growthNetDebt" : 0.2570308937047109
```

<hr />

#### CASHFLOW STATEMENT GROWTH
##### (fetchCashflowStatement('ticker', true))

```
"date" : "2020-09-26",
"symbol" : "AAPL",
"period" : "FY",
"growthNetIncome" : 0.039000289561314606,
"growthDepreciationAndAmortization" : -0.11883318721606759,
"growthDeferredIncomeTax" : -0.36764705882352944,
"growthStockBasedCompensation" : 0.12541199736321687,
"growthChangeInWorkingCapital" : -2.6313073394495414,
"growthAccountsReceivables" : 27.23265306122449,
"growthInventory" : -0.5605536332179931,
"growthAccountsPayables" : 1.1123244929797191,
"growthOtherWorkingCapital" : -4.3296,
"growthOtherNonCashItems" : -0.8512269938650306,
"growthNetCashProvidedByOperatingActivites" : 0.16260033721952413,
"growthInvestmentsInPropertyPlantAndEquipment" : -0.30357313006193426,
"growthAcquisitionsNet" : 1.4423076923076923,
"growthPurchasesOfInvestments" : 1.833993748615589,
"growthSalesMaturitiesOfInvestments" : 0.2204023337790203,
"growthOtherInvestingActivites" : -0.2662337662337662,
"growthNetCashUsedForInvestingActivites" : -1.0934504096217534,
"growthDebtRepayment" : 0.43429869392390685,
"growthCommonStockIssued" : 0.1267605633802817,
"growthCommonStockRepurchased" : 0.08163295812966202,
"growthDividendsPaid" : -0.0026914087399957506,
"growthOtherFinancingActivites" : -6.871900826446281,
"growthNetCashUsedProvidedByFinancingActivities" : -0.045682377769961306,
"growthEffectOfForexChangesOnCash" : 0.0,
"growthNetChangeInCash" : -1.429229566862737,
"growthCashAtEndOfPeriod" : -0.20776919401083146,
"growthCashAtBeginningOfPeriod" : 0.9381777486203836,
"growthOperatingCashFlow" : 0.16260033721952413,
"growthCapitalExpenditure" : -0.30357313006193426,
"growthFreeCashFlow" : 0.24567033414832926
```

### Universal Chart

Please note, I have already created an **ExamplePage** which shows a working example
of how to connect both the **UniversalChart** and the **API**

