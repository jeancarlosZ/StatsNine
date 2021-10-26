## StatsNine

### Team Members:

Brynner Doyle, Rohan Mangroo, Jean Carlos Zhong Chen, Hector Quijada

### URL:

https://statsnine.herokuapp.com/

### Description:

A Stock Analyzer tool. Designed to keep things simple

We have created a Stock Analyzer tool that empowers people, to select any stock of their choosing, where we will then provide an "overall determination" or rating for them based on our nine key metrics. Users can then decide whether or not to view more information by navigating to several pages displaying both our key metrics in-depth and a more complete view of the financial statements such as the Balance Sheet, Income statement, Cashflow Statement, and so on.

Our Analyzer tool has several features designed to make researching information about particular stocks as easy as possible. For instance, on our dashboard, we allow each viewer the ability to select news for any specific date in history. Giving them a tactical advantage as well as the capacity to understand what prior events may have affected a stock's price. Users are also given the option to then view either our Stock Screener or, alternatively use the search bar to navigate directly to a stock of their choosing. Upon navigating to our screener page, users will be prompted with a list of the top 500 stocks on the S&P 500, as stated previously the user can then select any stock of their choosing from this list to view in-depth. Once a stock has been selected either via the search bar or screener the viewer will be stimulated with an overview of that selected stock. This overview includes our "overall determination" as well as a price chart and description of the company they have chosen. From the overview page, the user can then navigate both a key metrics and financials section of the site giving them the ultimate power to discover and research further into the fundamentals of any company.

Several technologies went into the creation of our capstone project. First and foremost, all of the data we used to display everything from the charts to the screener and financials of every company came to form the FMP (Financial Modeling Prep) API. We also used several other libraries such as React, Redux, Redis, Plotly.js (to display the charts), React-Bootstrap, etc in this process as well. Redis was used to store/cache any and all relevant data relating to what would be displayed for the user. The use of Redis allowed us to cut back on API calls significantly whilst also improving load times across the site. Plotly and React-Bootstrap allowed us to create the visuals including the charts, dropdown menus, and collapsible div's on the newsfeed.
