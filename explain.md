# What is the UniversalChart?


The **Universal Chart** is a reusable component designed to make our use of **Plotly.js** significantly easier. The overall idea is that the **Universal Chart** Component can be inserted into any page, passed a few simple props, and bam, it works! However, while offering a simple reusable solution to our charting needs it also allows for a ton of custom input, enabling the user to create any chart their heart desires.
<br/>
<hr/>
<br/>


## Example Chart

To give some context to the further explainations, here is an example chart which we will be going over how to create in this documentation.

![alt text](https://i.imgur.com/7xyYwcZ.png)

<br/>
<hr/>
<br/>

## Creating a chart

Using the **UniversalChart** is as simple as placing or calling apon this component from your desired page and giving it some data. In the code snippit below, you will likely notice the **keys** and **dataset** props. These props are the data that the chart will use to render.

```
 <UniversalChart
          className="stock-price-chart"
          keys={keys}
          dataset={dataset}
          backgroundColor="rgba(30, 34, 45, 1)"
          plotBackgroundColor="rgba(30, 34, 45, 1)"
        />
```

Both the **keys** and **dataset** props take in an array of items, in the case for keys, it is an array of strings, integers, or whatever you 'keys' you desire for the data to display. In our example case, it is dates relating to the price of a stock. The **dataset**, however, is a little more complicated than the keys. The dataset itself while still being an array, does not contain simple strings or integers, but rather *'traces'/'individual sets'* of data.

<br/>

For instance, in our example, we are providing the chart with a dataset which includes only one trace. That trace reflects the stock price and with that, we have chosen the *type* **'line'** to display for our chart. We have also given this **'line'** a *color* & *outline* color of blue, as well as a 30% transparent version of the same color for the inner *fill*. Finally, we have provided our line with a object property noted as **'values'** which in our example case resembles an array of prices to correspond with the array of keys provided earlier.
```
const dataset = []

dataset.push({
      name: 'Stock Price',
      type: 'line',
      color: 'rgba(39, 91, 232, 1)',
      outline: 'rgba(39, 91, 232, 1)',
      fillcolor: 'rgba(39, 91, 232, .3)',
      fill: 'tonexty',
      values: values
    })
```

And it is with that, the the chart is complete! Simple right? Yet seemingly so complex.

<hr/>

Keep in mind that there are also a ton of other props you can pass the chart, as well as properties that you can apply to the dataset in order to further modifty the chart. However, they all follow this general concept! With that, below are a list of props and object properties that can be applied to the **UniversalChart** component and *datasets* objects.

**I would also strongly recommend checking out the Plotly.js reference page!**
https://plotly.com/javascript/reference/
## Props that can be attached to the UniversalChart Component

|  Property 	| Example	|  Description	|
|---	|---	|---	|
|title|'Stock Price'|Set the title of a chart|
|className|'stock-price-chart'|Set the className on the chart wrapper div|
|dataset|[{...(above)}]|The dataset array containing the chart data|
|keys|[1, 2, 3]|The keys used for the xAxis|
|backgroundColor|'rgb(30, 34, 45)'|The background color of the plot including margin|
|plotBackgroundColor|'rgb(30, 34, 45)'|The background color of the plot not including margin|
|autosize|true/false|Should the chart automatically resize|
|margin|{ l: 50, r: 50, b: 25, t: 35 }|How much margin should the chart have inside its container|
|legend|{ x: 1, y: 1, font: { size: 10 }|The actual chart legend. https://plotly.com/javascript/reference/layout/#layout-legend|
|showlegend|true/false|Should the legend display|
|barmode|'group'|Types of barmode include 'group' 'stack' 'relative'|
|bargap|0.1|Custom distance between bars on bar chart (default is 0.1)|
|xaxis|{gridcolor: gridcolor}|You can read about the axes here: https://plotly.com/javascript/axes/|
|yaxis|{gridcolor: gridcolor}|You can read about the axes here: https://plotly.com/javascript/axes/|
|annotations|example|description|
|grid|{rows: 2, columns: 2}|Customize the grid|
|gridcolor| 'rgba(67, 70, 81, 0.3)'|The color of the background grid|
|hoverdistance|20|How far from the datapoint should the hover show|
|hovermode|'closest'|Determines the mode of hover interactions. If "closest", a single hoverlabel will appear for the "closest" point within the `hoverdistance`.|
|fullLayout|{title: "title"}|Pass in your own object which will be used as the layout for Plotly.js|


## Properties that can be used on the datasets!

|  Property 	| Example	|  Description	|
|---	|---	|---	|
|name|'price'|The name of the set (shows on hover and on legend)|
|type|'line'|The type of set this will be, 'bar', 'line', 'pie', 'scatter', 'candlestick', 'etc'|
|cKeys|[1, 2, 3]|Set a seperate set of keys for this trace|
|values|[1, 2, 3]|The values this trace will display|
|text|'example'|The text that will display inside the trace|
|color|'red'|Color of inner/overall trace|
|outline|'red'|Color of outline|
|stroke|5|Thickness of outline stroke|
|customSet|{marker: {...}}|Add properties (not included here) to the set/trace|
|fullSet|{type: 'line'}|Replace the whole current set/trace with your own|