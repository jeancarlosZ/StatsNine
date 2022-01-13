//**--Table Labels--**//
export const incomeTableLabels = [
  "Revenue",
  "Gross Profit",
  "Operating Expenses",
  "Operating Income",
  "Income Before Tax",
  "Income Tax Expense",
  "Interest Expense",
  "Cost Of Revenue",
  "Cost And Expenses",
  "Net Income",
  "EBITDA",
];
export const balanceTableLabels = [
  "Total Assets",
  "Total Liabilities",
  "Long Term Investments",
  "Total Investments",
  "Total Debt",
  "Net Debt",
  "Common Stock",
  "Cash Equivalents",
  "Net Receivables",
  "Inventory",
  "Retained Earnings",
];

export const cashflowTableLabels = [
  "Free Cash Flow",
  "Capital Expenditure",
  "Operating Cash Flow",
  "Other Investing Activites",
  "Other Financing Activites",
  "Dividends Paid",
  "Debt Repayment",
  "Accounts Payables",
  "Deferred Income Tax",
];

export const enterpriseTableLabels = [
  "Enterprise Value",
  "Market Capitalization",
  "Number Of Shares",
  "Add Total Debt",
];

//------------------------------------------//
//------------------------------------------//
//------------------------------------------//

//**--Object Indentifiers--**//
export const incomeIndentifiers = [
  "dates",
  "revenue",
  "grossProfit",
  "operatingExpenses",
  "operatingIncome",
  "incomeBeforeTax",
  "incomeTaxExpense",
  "interestExpense",
  "costOfRevenue",
  "costAndExpenses",
  "netIncome",
  "ebitda",
];

export const balanceIndentifiers = [
  "dates",
  "totalAssets",
  "totalLiabilities",
  "longTermInvestments",
  "totalInvestments",
  "totalDebt",
  "netDebt",
  "commonStock",
  "cashAndCashEquivalents",
  "netReceivables",
  "inventory",
  "retainedEarnings",
];

export const cashflowIndentifiers = [
  "dates",
  "freeCashFlow",
  "capitalExpenditure",
  "operatingCashFlow",
  "otherInvestingActivites",
  "otherFinancingActivites",
  "dividendsPaid",
  "debtRepayment",
  "accountsPayables",
  "deferredIncomeTax",
];

export const enterpriseIndentifiers = [
  "dates",
  "enterpriseValue",
  "marketCapitalization",
  "numberOfShares",
  "addTotalDebt",
];

export function getQtrIndentifers(indentifiers) {
  const qtrIdentifiers = indentifiers.slice(1);
  const saveAs = indentifiers.map(ident => ident + "Qtr");
  saveAs.shift();
  return {
    saveAs,
    qtrIdentifiers,
  };
}
